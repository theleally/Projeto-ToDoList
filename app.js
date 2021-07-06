'use strict';

//Modelo da tarefa
{/* <label class="todo__item">
    <input type="checkbox">
    <div>teste de item 1</div>
    <input type="button" value="X">
</label> */}

//Criando a função para criar a tarefa
const criarItem = (tarefa, status, indice) => {
    const item = document.createElement("label");
    item.classList.add("todo__item");
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById("toDoList").appendChild(item);
}

//Criando o JSON para simular um bd
// let banco = [
//     {"tarefa": "Estudar JS", "status": "checked"},
//     {"tarefa": "Estudar para o exame de Java", "status": ""},
//     {"tarefa": "Fazer compras", "status": ""},
//     {"tarefa": "Encomendar meu bolo de aniversário", "status": ""},
//     {"tarefa": "Arrumar o carro", "status": ""}
// ];

//LocalStorage
const setBanco = (banco) => localStorage.setItem("toDoList", JSON.stringify(banco)); 
const getBanco = () => JSON.parse(localStorage.getItem("toDoList")) ?? [];

//Criando a função para atualizar a tela
const limparTarefas = () => {
    const toDoList = document.getElementById("toDoList");
    while(toDoList.firstChild) {
        toDoList.removeChild(toDoList.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach( (item, indice) => criarItem(item.tarefa, item.status, indice));
}

//Criando a função para inserir uma nova tarefa

const inserirItem = (evento) => {
    
    const tecla = evento.key;
    const texto = evento.target.value;

    if (tecla === "Enter") {
        const banco = getBanco();
        banco.push({"tarefa": texto, "status": ""});
        setBanco(banco);
        atualizarTela();
        evento.target.value = "";
    }
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === "" ? "checked" : "";
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;

    if (elemento.type === "button") {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if (elemento.type === "checkbox") {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}

document.getElementById("newItem").addEventListener("keypress", inserirItem);
document.getElementById("toDoList").addEventListener("click", clickItem);

atualizarTela();


