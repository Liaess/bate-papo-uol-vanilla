let ask;
const eachMessage = document.querySelector(".chat")

start()

function start(){
    askName();
    enterRoom();
}

function askName(){
    ask = prompt("Qual seu nome?");
}

function enterRoom(){
    const name = {name: ask};
    const promess = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", name);
    promess.then(sucess)
    promess.catch(fail)
}

function sucess(){
    getMessage();
    setInterval(keepOn, 5000);
}

function fail(erro){
    if(erro.response.status === 400){
        alert("Nome indisponivel, por favor digite um novo nome");
        start();
    }
}

function keepOn(){
    const name = {name: ask};
    const promess = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status", name);
    promess.then(getMessage);
    promess.catch(actionFail);
}

function actionFail(){
    window.location.reload();
}

function getMessage(){
    const promess = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages");
    promess.then(showMessage);
}

function showMessage(response){
    // console.log(response.data);
    eachMessage.innerHTML = "";
    for(let i = 0; i<response.data.length; i++){
        if(response.data[i].type === 'status'){
            eachMessage.innerHTML += `
            <div class="message enter-leave">
                <p><span class='time'>(${response.data[i].time})</span> <span class='users'>${response.data[i].from}</span> ${response.data[i].text}</p>
            </div>`;
        } else if (response.data[i].type === 'private_message' && response.data[i].to === ask){
            eachMessage.innerHTML += `
            <div class="message private-message">
                <p><span class='time'>(${response.data[i].time})</span> <span class='users'>${response.data[i].from}</span> reservadamente para <span class='users'>${response.data[i].to}</span>: ${response.data[i].text}</p>
            </div>`;
        } else if(response.data[i].type === 'message'){
            eachMessage.innerHTML += `
            <div class="message">
                <p><span class='time'>(${response.data[i].time})</span> <span class='users'>${response.data[i].from}</span> para <span class='users'>${response.data[i].to}</span>: ${response.data[i].text}</p>
            </div>`;
        }

        const newMessages = document.querySelector('.chat .message:last-child');
        newMessages.scrollIntoView();

        // document.body.scrollTop = document.body.scrollHeight;
        // document.documentElement.scrollTop = document.documentElement.scrollHeight;
    }
    // console.log(eachMessage);
}
setInterval(getMessage, 3000);

function sendMessage(){
    const getInputMessage = document.querySelector(".input");
    const message = {
        from: ask,
        to: "Todos",
        text: getInputMessage.value,
        type: "message" // ou "private_message" para o bônus
    }
    const promess = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages", message);
    getInputMessage.value = "";
    getMessage();
    promess.catch(actionFail);
}