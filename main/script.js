
function jogar(){
    window.location.href="/game/index.html"
}

function menu(){
    window.location.href="/main/index.html"
}

let som = document.querySelector("audio#som");
function musicaHome(){
    this.som.play();
}

window.onload = function(){

    musicaHome();
}