// 배팅 타입
// 0: 2지선다, 1: 10지선다

// 배팅 값
// 0 : 미선택
// 이지선다, 1: 레드팀, 2: 블루팀
// 십지선다, 레드팀 탑 ~ 서폿 : 1~5, 블루팀 탑 ~ 서폿 6 ~ 10

let bettingFinished = false

let bettingList = [0, 0, 0, 0, 0]
let bettingType = [0, 0, 0, 1, 1]
const bettingTypeItemCount = [2, 10] // 배팅 타입에 따른 아이템 개수

function betting(index, value) {
    bettingList[index] = value
}

function setBettingClass() {
    resetBettingClass()

}

function resetBettingClass(index, type) {
    for (let i=1; i <= bettingTypeItemCount[type]; i++) {
        let itemId = '[data-item-id=' + index + '-' + i + ']'
        $(itemId).removeClass('betting-select')
        $(itemId).removeClass('line-selected-blue')
        $(itemId).removeClass('line-selected-red')
    }
}

$('.bet-item').on({
    click: function(event) {
        if (bettingFinished)
            return

        const item = $(event.target).data('item-id').split('-').map((x) => Number(x))
        const index = item[0]
        const value = item[1]
        const type = bettingType[index]

        resetBettingClass(index, type)
        bettingList[index] = value

        if (type == 0) { // 이지선다
            $(event.target).addClass('betting-select')
        } else if (type == 1) { // 십지선다
            if (value < 6) {
                $(event.target).addClass('line-selected-red')
            } else {
                $(event.target).addClass('line-selected-blue')
            }
        }

        message = {
            "cmd":"quiz",
            "quiznumber": index + '',
            "answer": value + ''
        }

        console.log(message)

        ws.send(JSON.stringify(message));
    }
})

function sendMessage() {
    const username = document.getElementById("name").value;
    const message = document.getElementById("msg").value;
    const payload = { "name" : username, "msg" : message, "cmd" : "msg" };
    ws.send(JSON.stringify(payload));
}


