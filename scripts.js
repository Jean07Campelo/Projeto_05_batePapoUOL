let messages = [];
let nome = {};
let usuarios;

const promisseMessages = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
promisseMessages.then(carregarMensagens)


//NOME USUARIO
function cadastrarUsuario () {
    nome.name = prompt("Olá jovem Padawan, qual seu nome?");
    verificaNome
    usuarios = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nome);
}

function verificaNome (error) {
let codigoErro = error.response.status

while (codigoErro === 400) {
    alert("Já existe um usuário com esse nome!")
    cadastrarUsuario()
} 
    if (codigoErro === 200) {
    carregarMensagens()
}

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

cadastrarUsuario()
usuarios.catch(verificaNome);
//setInterval(carregarMensagens, 3000);
