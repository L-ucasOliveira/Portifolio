function voltar(){
    window.location.href = "../projetos.html"
}
const cor = document.querySelector("input"); 
let tela = document.querySelector("canvas"); 

let corPadrao = "black"; 
let podeDesenhar = false;
let mouseX = 0;
let mouseY = 0;

let ctx = tela.getContext('2d'); 

cor.onchange = () => corPadrao = cor.value;

tela.addEventListener('mousedown', mouseDownEvent); 
tela.addEventListener('mousemove', mouseMoveEvent); 
tela.addEventListener('mouseup', mouseUpEvent); 

function mouseDownEvent(e){
    podeDesenhar = true;
    mouseX = e.pageX - tela.offsetLeft;
    mouseY = e.pageY - tela.offsetTop;
} 

function mouseMoveEvent(e){
    if(podeDesenhar){
        desenho(e.pageX, e.pageY);
    }
}

function mouseUpEvent(){
    podeDesenhar = false;
}

function desenho(x, y){
    let pontoX = x - tela.offsetLeft;
    let pontoY = y - tela.offsetTop;

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pontoX, pontoY);
    ctx.closePath();
    ctx.strokeStyle = corPadrao;
    ctx.stroke();

    mouseX = pontoX;
    mouseY = pontoY;
}

function clearBoard(){
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
