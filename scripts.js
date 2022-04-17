//let nome = {};

buscarMensagens()

function buscarMensagens () {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    
    promise.then(carregarMensagens)   
}

function carregarMensagens (response) {
    
    let mensagens = document.querySelector(".mensagens")
    messages = response.data

    for (let i = 0; i < messages.length; i++) {

        if (messages[i].type === "messages") {
            mensagens.innerHTML += `
            <li class="${messages[i].type}">
            <h1>${messages[i].time}</h1>
            <h2>${messages[i].from}</h2>
            para
            <h2>${messages[i].to}</h2>:
            ${messages[i].text}
        </li>`

        } 
        else if (messages[i].type === "status") {
            mensagens.innerHTML += `
            <li class="${messages[i].type}">
            <h1>${messages[i].time} </h1> 
            <h2>${messages[i].from} </h2> 
            ${messages[i].text}
        </li>`

        } else if (messages[i].type === "private_message") {
            mensagens.innerHTML += `
            <li class="${messages[i].type}">
            <h1>${messages[i].time}</h1>
            <h2>${messages[i].from}</h2>
            reservadamente para 
            <h2>${messages[i].to}</h2>:
            ${messages[i].text}
        </li>`

        }

        mensagens.scrollIntoView();
    }
}



//setInterval(carregarMensagens, 3000);
