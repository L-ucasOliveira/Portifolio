function voltar(){
  window.location.href = "../projetos.html"
}
const resultado = document.querySelector(".resultado");
const buttons = document.querySelectorAll(".botoes button");

let numeroCorrente = "";
let firstOperand = null;
let operador = null;
let restarta = false;

function updateResultado(limpaOrigem = false) {
  resultado.innerText = limpaOrigem ? 0 : numeroCorrente.replace(".", ",");
}

function adcionaDigito(digito) {
  if (digito === "," && (numeroCorrente.includes(",") || !numeroCorrente)) return;

  if (restarta) {
    numeroCorrente = digito;
    restarta = false;
  } else {
    numeroCorrente += digito;
  }

  updateResultado();
}

function setOperador(newoperador) {
  if (numeroCorrente) {
    calculate();

    firstOperand = parseFloat(numeroCorrente.replace(",", "."));
    numeroCorrente = "";
  }

  operador = newoperador;
}

function calculate() {
  if (operador === null || firstOperand === null) return;
  let secondOperand = parseFloat(numeroCorrente.replace(",", "."));
  let resultadoValue;

  switch (operador) {
    case "+":
      resultadoValue = firstOperand + secondOperand;
      break;
    case "-":
      resultadoValue = firstOperand - secondOperand;
      break;
    case "×":
      resultadoValue = firstOperand * secondOperand;
      break;
    case "÷":
      resultadoValue = firstOperand / secondOperand;
      break;
    default:
      return;
  }

  if (resultadoValue.toString().split(".")[1]?.length > 5) {
    numeroCorrente = parseFloat(resultadoValue.toFixed(5)).toString();
  } else {
    numeroCorrente = resultadoValue.toString();
  }

  operador = null;
  firstOperand = null;
  restarta = true;
  percentageValue = null;
  updateResultado();
}

function clearCalculator() {
  numeroCorrente = "";
  firstOperand = null;
  operador = null;
  updateResultado(true);
}

function setPercentage() {
  let resultado = parseFloat(numeroCorrente) / 100;

  if (["+", "-"].includes(operador)) {
    resultado = resultado * (firstOperand || 1);
  }

  if (resultado.toString().split(".")[1]?.length > 5) {
    resultado = resultado.toFixed(5).toString();
  }

  numeroCorrente = resultado.toString();
  updateResultado();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const botaoTexto = button.innerText;
    if (/^[0-9,]+$/.test(botaoTexto)) {
      adcionaDigito(botaoTexto);
    } else if (["+", "-", "×", "÷"].includes(botaoTexto)) {
      setOperador(botaoTexto);
    } else if (botaoTexto === "=") {
      calculate();
    } else if (botaoTexto === "C") {
      clearCalculator();
    } else if (botaoTexto === "±") {
      numeroCorrente = (
        parseFloat(numeroCorrente || firstOperand) * -1
      ).toString();
      updateResultado();
    } else if (botaoTexto === "%") {
      setPercentage();
    }
  });
});