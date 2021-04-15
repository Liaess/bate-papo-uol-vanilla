const eachMessage = document.querySelector(".chat")
getMessage()

function getMessage(){
    const promess = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages");
    promess.then(showMessage)
}
function showMessage(response){
    console.log(response.data)
    for(let i = 0; i<response.data.length; i++){
        if(response.data[i].text === "entra na sala..."){
            eachMessage.innerHTML += `
            <div class="message enter-leave">
                <p>(${response.data[i].time}) <span>${response.data[i].from}</span> para <span>${response.data[i].to}</span>: ${response.data[i].text}</p>
            </div>`;
        } else if(response.data[i].text === "sai da sala..."){
            eachMessage.innerHTML += `
            <div class="message enter-leave">
                <p>(${response.data[i].time}) <span>${response.data[i].from}</span> para <span>${response.data[i].to}</span>: ${response.data[i].text}</p>
            </div>`;
        } else {
            eachMessage.innerHTML += `
            <div class="message">
                <p>(${response.data[i].time}) <span>${response.data[i].from}</span> para <span>${response.data[i].to}</span>: ${response.data[i].text}</p>
            </div>`;
        }
    }
}

