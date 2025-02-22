import axios from "axios";
import "./styles.scss";

const URL_BASE =
  "https://gist.githubusercontent.com/matheuscardoso14/b753cf5d6ad874ef713847aebd165e03/raw/7254f22653214aa09ed32184289d080785b7038e/fatos.json";

const validacaoNumeroFato = /^[0-9]{1,2}$/;

const formularioDeBusca = document.querySelector("form");
const inputFato = document.querySelector(".buscar_fato__input");
const botaoBuscar = document.getElementById("botao-buscar");
const botaoFatoAleatorio = document.getElementById("botao-aleatorio");
const texto = document.querySelector(".sobre_frida");

async function carregarFatos(url) {
  try {
    const fatosJSON = await axios.get(url);
    return await fatosJSON.data;
  } catch (erro) {
    alert("Erro ao carregar fatos. Tente novamente mais tarde.");
  }
}

async function buscarFato(fatoBuscado) {
  if (validarFato(fatoBuscado) === false) {
    inputFato.value = "";
    return;
  }
  inputFato.value = "";
  const fatos = await carregarFatos(URL_BASE);
  const fato = fatos.find((fato) => fatoBuscado == fato.indice);
  return fato;
}

function mostrarFato(fato) {
  texto.style.flexDirection = "column";
  texto.style.gap = "2rem";
  texto.innerHTML = `<h3 class="fato-${fato.indice}_titulo fato_titulo">Fato ${fato.indice}</h3><p class="fato-${fato.indice}_texto fato_texto">${fato.texto}</p>`;
}

function validarFato(fato) {
  if (!validacaoNumeroFato.test(fato) || fato < 1 || fato > 30) {
    alert("Digite um número válido de 1 a 30.");
    return false;
  }
}

formularioDeBusca.addEventListener("submit", (evento) =>
  evento.preventDefault()
);

inputFato.addEventListener("keypress", async (evento) => {
  if (evento.key == "Enter") {
    evento.preventDefault();
    try {
      const fatoBuscado = inputFato.value.trim();
      const fato = await buscarFato(fatoBuscado);
      mostrarFato(fato);
    } catch {
      return;
    }
  }
});

botaoBuscar.addEventListener("click", async () => {
  try {
    const fatoBuscado = inputFato.value.trim();
    const fato = await buscarFato(fatoBuscado);
    mostrarFato(fato);
  } catch {
    return;
  }
});

botaoFatoAleatorio.addEventListener("click", async () => {
  try {
    const fatoBuscado = parseInt(Math.random() * 30 + 1);
    const fato = await buscarFato(fatoBuscado);
    mostrarFato(fato);
  } catch {
    return;
  }
});
