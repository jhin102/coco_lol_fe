const urlParams = new URLSearchParams(window.location.search);
// const ldap = urlParams.get('ldap');
let ldap = "jhin.lee"
const ws = new WebSocket("wss://evolution-irene-cup.mooo.com/ws?ldap=" + ldap);
window.ws = ws;

ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log("Received message:", message);
};

ws.onclose = () => {
    console.log("Connection closed");
};

function sendMessage() {
    const username = document.getElementById("name").value;
    const message = document.getElementById("msg").value;
    const payload = { "name" : username, "msg" : message, "cmd" : "msg" };
    ws.send(JSON.stringify(payload));
}

function displayMessage(message) {
    const messageList = document.getElementById("messageList");
    const listItem = document.createElement("li");
    listItem.textContent = `${message.name}: ${message.msg}`;
    messageList.appendChild(listItem);
}

ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log("Received message:", message);
    commandProcessor(message)
};

function commandProcessor(cmd) {
    switch (cmd.cmd) {
        case 'msg':
            displayMessage(cmd);
            break;
        case 'list':
            cmd.cmdList.forEach(cmd => {
                commandProcessor(JSON.parse(cmd))
            });
            break;
    }
}