const formularioDeBusca = document.querySelector("form");
const inputFato = document.querySelector(".buscar_fato__input");
const botaoBuscar = document.getElementById("botao-buscar");
const botaoFatoAleatorio = document.getElementById("botao-aleatorio");
const texto = document.querySelector(".sobre_frida");

async function carregarFatos(url) {
    const fatosJSON = await fetch(url);
    return await fatosJSON.json();
}

async function buscarFato(parametro) {
    inputFato.value = "";
    const fatos = await carregarFatos("./fatos.json");
    const fatoBuscado = parametro;
    fatos.forEach((fato) => {
        if (fatoBuscado == fato.indice) {
            texto.style.flexDirection = "column";
            texto.style.gap = "2rem";
            texto.innerHTML = `<h3 class="fato-${fato.indice}_titulo fato_titulo">Fato ${fato.indice}</h3><p class="fato-${fato.indice}_texto fato_texto">${fato.texto}</p>`
        }
    })
}

formularioDeBusca.addEventListener("submit", (evento) => evento.preventDefault())

inputFato.addEventListener("keypress", (evento) => {
    if (evento.key == "Enter") {
        buscarFato(inputFato.value);
    }
});

botaoBuscar.addEventListener("click", () => buscarFato(inputFato.value));

botaoFatoAleatorio.addEventListener("click", () => {
    const indice = parseInt(Math.random() * 30 + 1);
    buscarFato(indice);
})