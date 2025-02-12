import axios from "axios";
import "./styles.scss";

const URL_BASE =
  "https://gist.githubusercontent.com/matheuscardoso14/b753cf5d6ad874ef713847aebd165e03/raw/7254f22653214aa09ed32184289d080785b7038e/fatos.json";

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

async function buscarFato(parametro) {
  inputFato.value = "";
  const fatos = await carregarFatos(URL_BASE);
  const fatoBuscado = parametro;
  fatos.forEach((fato) => {
    if (fatoBuscado == fato.indice) {
      texto.style.flexDirection = "column";
      texto.style.gap = "2rem";
      texto.innerHTML = `<h3 class="fato-${fato.indice}_titulo fato_titulo">Fato ${fato.indice}</h3><p class="fato-${fato.indice}_texto fato_texto">${fato.texto}</p>`;
    }
  });
}

formularioDeBusca.addEventListener("submit", (evento) =>
  evento.preventDefault()
);

inputFato.addEventListener("keypress", (evento) => {
  if (evento.key == "Enter") {
    buscarFato(inputFato.value);
  }
});

botaoBuscar.addEventListener("click", () => buscarFato(inputFato.value));

botaoFatoAleatorio.addEventListener("click", () => {
  const indice = parseInt(Math.random() * 30 + 1);
  buscarFato(indice);
});
