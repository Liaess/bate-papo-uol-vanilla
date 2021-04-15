
let pergunta;
const eachMessage = document.querySelector(".chat")

function askName(){

}

enterRoom()
function enterRoom(){
    pergunta = prompt("Qual seu nome?");
    const name = {name: pergunta};
    console.log(name);
    const promess = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", name);
    promess.then(sucess)
    promess.catch(fail)

    function sucess(){
        getMessage()
    }
    function fail(erro){
        if(erro.response.status === 400){
            enterRoom()
        }
    }
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
                <p><span class='time'>(${response.data[i].time})</span> <span class='users'>${response.data[i].from}</span> para <span class='users'>${response.data[i].to}</span>: ${response.data[i].text}</p>
            </div>`;
        } else if (response.data[i].type === 'private_message'){
            eachMessage.innerHTML += `
            <div class="message private-message">
                <p><span class='time'>(${response.data[i].time})</span> <span class='users'>${response.data[i].from}</span> para <span class='users'>${response.data[i].to}</span>: ${response.data[i].text}</p>
            </div>`;
        } else {
            eachMessage.innerHTML += `
            <div class="message">
                <p><span class='time'>(${response.data[i].time})</span> <span class='users'>${response.data[i].from}</span> para <span class='users'>${response.data[i].to}</span>: ${response.data[i].text}</p>
            </div>`;
        }
    }
    console.log(eachMessage);
}
setInterval(getMessage, 3000);
