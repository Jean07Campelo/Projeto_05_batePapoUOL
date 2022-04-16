let messages = [];

const promisseMessages = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
promisseMessages.then(carregarMensagens)

function carregarMensagens (response) {
    let mensagens = document.querySelector(".mensagens")
    messages = response.data

    for (let i = 0; i < messages.length; i++) {
        if (messages[i].type === "messages") {
            mensagens.innerHTML += `
            <li class="${messages[i].type}">
            ${messages[i].time}
            ${messages[i].from}
            para 
            ${messages[i].to}:
            ${messages[i].text}
        </li>
            `
        } 
        else if (messages[i].type === "status") {
            mensagens.innerHTML += `
            <li class="${messages[i].type}">
            ${messages[i].time}
            ${messages[i].from}
            para 
            ${messages[i].to}:
            ${messages[i].text}
        </li>
            `
        } else if (messages[i].type === "private_message") {
            mensagens.innerHTML += `
            <li class="${messages[i].type}">
            ${messages[i].time}
            ${messages[i].from}
            para 
            ${messages[i].to}:
            ${messages[i].text}
        </li>
            `
        }

    }
    setInterval(carregarMensagens, 1000);
}

