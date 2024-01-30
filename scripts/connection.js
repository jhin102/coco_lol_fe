window.onload = () => {
    let ldap = getCookie("coco_ldap");
    const ws = new WebSocket("wss://evolution-irene-cup.mooo.com/ws?ldap=" + ldap);
    window.ws = ws;

    let chatFrame = document.getElementById('chat');

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

    window.sendChatMessage = (message) => {
        const payload = { "name" : ldap, "msg" : message, "cmd" : "msg" };
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
                chatFrame.contentWindow.createNewMessage(cmd.name, cmd.msg);
                break;
            case 'answer':
                console.log("load data : ", cmd.quiznumber, cmd.answer)
                loadQuizData(cmd.quiznumber, cmd.answer)
                break;
            case 'list':
                console.log(cmd);
                cmd.cmdList.forEach(cmd => {
                    chatFrame.contentWindow.createNewMessage(cmd.name, cmd.msg);
                });
                break;
        }
    }
}