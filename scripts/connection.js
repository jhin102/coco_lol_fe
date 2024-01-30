const urlParams = new URLSearchParams(window.location.search);
// const ldap = urlParams.get('ldap');
let ldap = "jhin.lee"
const ws = new WebSocket("wss://evolution-irene-cup.mooo.com/ws?ldap=" + ldap);
window.ws = ws;

ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log("Received message:", message);
};

ws.onopen = function(event) {
    console.log("Connection opened");
}

ws.onclose = () => {
    console.log("Connection closed");
};

function sendMessage() {
    const username = document.getElementById("name").value;
    const message = document.getElementById("msg").value;
    const payload = { "name" : username, "msg" : message, "cmd" : "msg" };
    ws.send(JSON.stringify(payload));
}

ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log("Received message:", message);
    commandProcessor(message)
};

function loadQuizData(index, value) {
    let itemId = '[data-item-id=' + index + '-' + value + ']'
    let type = [0, 0, 0, 1, 1][index]

    if (type == 0) { // 이지선다
        $(itemId).addClass('betting-select')
    } else if (type == 1) { // 십지선다
        if (Number(value) < 6) {
            $(itemId).addClass('line-selected-red')
        } else {
            $(itemId).addClass('line-selected-blue')
        }
    }
}

function commandProcessor(cmd) {
    switch (cmd.cmd) {
        case 'msg':
            break;
        case 'answer':
            console.log("load data : ", cmd.quiznumber, cmd.answer)
            loadQuizData(cmd.quiznumber, cmd.answer)
            break;
        case 'list':
            cmd.cmdList.forEach(cmd => {
                commandProcessor(JSON.parse(cmd))
            });
            break;
    }
}