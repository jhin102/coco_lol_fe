function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkLogin() {
    ldap = getCookie('coco_ldap');
    if (ldap === '') {
        //document.location.href = "./login.html"
    }
}

async function login() {
    ldap = document.getElementById('ldap').value;
    if (ldap !== '') {
        response = await fetch("http://34.22.68.104/api/login?ldap=" + ldap);
        if (response.status === 200) {
            data = await response.json();
            console.log(data);
            if (data.login === 'true') {
                setCookie('coco_ldap', data.ldap, 10);
                setCookie('coco_nickname', data.nickname, 10);
                alert('로그인 성공');
                document.location.href = "./index.html"
            }
            else {
                alert("가입이 필요합니다.")
                show_register();
            }
        }
    }
    else {
        alert('LDAP을 입력해주세요.')
    }
}

function show_register() {
    console.log('need register');
    document.getElementById('nickname_area').style.display = 'block';
    document.getElementById('register').style.display = 'block';
}

async function register() {
    ldap = document.getElementById('ldap').value;
    nickname = document.getElementById('nickname').value;

    if (ldap !== '' && nickname !== '') {
        response = await fetch("http://34.22.68.104/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({
                ldap: ldap,
                nickname: nickname
            })
        })

        data = await response.json();
        if (data.result === 'success') {
            setCookie('coco_ldap', ldap, 10);
            setCookie('coco_nickname', nickname, 10);
            alert('가입에 성공했습니다.');
            document.location.href = "./index.html"
        }
    }
    else {
        alert('LDAP과 닉네임을 입력해주세요.')
    }
}

if (!document.location.href.includes('login.html')) {
    checkLogin();

    player = document.getElementById('player');
    ldap = getCookie('coco_ldap');
    nickname = getCookie('coco_nickname')
    player.innerHTML = `${nickname}(${ldap})`
}

function logout() {
    setCookie('coco_ldap', '1', 0);
    document.location.reload();
}

function checkButton(type) {
    if (type === 'ldap') {
        if (document.getElementById('ldap').value !== '') {
            document.getElementById('login_img').src = "./images/login_button_on.PNG";
        }
        else {
            document.getElementById('login_img').src = "./images/login_button_off.PNG";
        }
    }
    else if (type === 'nickname') {
        if (document.getElementById('nickname').value !== '') {
            document.getElementById('register_img').src = "./images/login_button_on.PNG";
        }
        else {
            document.getElementById('register_img').src = "./images/login_button_off.PNG";
        }
    }
}