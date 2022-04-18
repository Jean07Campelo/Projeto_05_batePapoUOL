let nome = {};
let mensagem = {};
let ultima_mensagem;
let mensagens;
let contador_mensagens = 0;

cadastrarUsuario()


function buscarMensagens () {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    
    promise.then(carregarMensagens)   
}

function carregarMensagens (response) {
    mensagens = document.querySelector(".mensagens")
    let messages = response.data
    
    for (let i = 0; i < messages.length; i++) {

        if (messages[i].type === "message") {
            mensagens.innerHTML += `
            <li class="${messages[i].type}">
            <h1>${messages[i].time}</h1>
            <h2>${messages[i].from}</h2>
            para
            <h2>${messages[i].to}:</h2>
            ${messages[i].text}
        </li>`  
        contador_mensagens++
        ultimaMensagem()
        limparMensagens()
    } 
 
        else if (messages[i].type === "status") {
            mensagens.innerHTML += `
            <li class="${messages[i].type}">
            <h1>${messages[i].time} </h1> 
            <h2>${messages[i].from} </h2> 
            ${messages[i].text}
        </li>`
        contador_mensagens++
        ultimaMensagem()
        limparMensagens()
        } 
        if (messages[i].type === "private_message") {
            if (messages[i].to === nome.name) {
                mensagens.innerHTML += `
            <li class="${messages[i].type}">
            <h1>${messages[i].time}</h1>
            <h2>${messages[i].from}</h2>
            reservadamente para 
            <h2>${messages[i].to}:</h2>
            ${messages[i].text}
        </li>`
        contador_mensagens++
        ultimaMensagem()
        limparMensagens()

    } 
            }

    }
}
function ultimaMensagem () {
    ultima_mensagem = mensagens.lastChild;
    ultima_mensagem.scrollIntoView();
}

//tratar muitas mensagens no HTML
function limparMensagens () {
    if (contador_mensagens > 150) {
        mensagens = "";
        console.log("limpando excesso de mensagens")
    }
}

function cadastrarUsuario () {
    nome.name = prompt("Olá jovem Padawan, qual seu nome?");
    //chama funcao para enviar nome usuario para sala
    enviarUsuario()
}

function usuarioErro (error) {
    let codigoErro = error.response.status
    while (codigoErro !== 200) {
        cadastrarUsuario()
    }
}

    //envia nome usuario para sala
function enviarUsuario () {
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nome);
    promise.catch(usuarioErro)
    promise.then(buscarMensagens)

}

//manter conexao
function manterConexao () {
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nome);
    console.log("mantendo conexão")
}


//enviar mensagem com clique
function mensagemPronta () {
    escreverMensagem();
}
//pegar dados da mensagem
function escreverMensagem () {
    mensagem.from = nome.name;
    mensagem.to = "todos"
    mensagem.text = document.querySelector("input").value
    mensagem.type = "message"
    enviarMensagem()
}

function enviarMensagem () {
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagem);
    promise.then(buscarMensagens);
    promise.catch(cadastrarUsuario);
}

setInterval(manterConexao, 5000);
setInterval(buscarMensagens, 3000);
