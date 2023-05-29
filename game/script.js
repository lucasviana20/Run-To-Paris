//board
let board;
let boardWidth = window.innerWidth;
let boardHeight = window.innerHeight;
let context;

//floor
let floor = 250;

//Runner
let runnerWidth = 88;
let runnerHeight= 94;
let runnerX = 50;
let runnerY = (boardHeight - runnerHeight) - floor +10;
let runnerImg;

let runner = {
    x : runnerX,
    y : runnerY,
    width : runnerWidth,
    height : runnerHeight
}

//obstacles
let obstaclesArray = [];

let obstacles1Width = 28;
let obstacles1Height = 34;

let obstacles3Width = 90;

let obstacles4Width = 69;

let obstacles5Width= 69;

let obstacles6Width = 69;

let obstacles7Width = 50;
let obstacles7Height = 34;

let obstacles8Width = 69;

let obstacles9Width = 90;

let obstacles10Width = 34;

let obstaclesHeight = 70;
let obstaclesX = 1500;
let obstaclesY = (boardHeight - runnerHeight) - floor +25;

let obstacles1Img;
let obstacles3Img;
let obstacles4Img;
let obstacles5Img;
let obstacles6Img;
let obstacles7Img;
let obstacles8Img;
let obstacles9Img;
let obstacles10Img;


//physics
let velocityX= -8;
let velocityY= 0;
let gravity = .4;
let gameOver = false;
let score = 0;
let scoreArray = [];

//music


let music = document.querySelector("audio#music");

let pulo = document.querySelector("audio#pulo");


window.onload = function(){
    if (gameOver){return end();}
        
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");
    // context.fillStyle= "green";
    // context.fillRect(runner.x,runner.y,runner.width,runner.height)

    // runnerImg = new Image();
    // runnerImg.src = "/img/atleta-imagem-animada-0013.gif";
    // runnerImg.onload = function(){
    //     context.drawImage(runnerImg, runner.x, runner.y, runner.width, runner.height);
    // };


    obstacles1Img = new Image();
    obstacles1Img.src = "/img/bola.png";

    obstacles3Img = new Image();
    obstacles3Img.src = "/img/torre_eiffel.png";

    obstacles4Img = new Image();
    obstacles4Img.src = "/img/medalhaDeOuro.png";

    obstacles5Img = new Image();
    obstacles5Img.src = "/img/medalhaDePrata.png";

    obstacles6Img = new Image();
    obstacles6Img.src = "/img/medalhaDeBronze.png";

    obstacles7Img = new Image();
    obstacles7Img.src = "/img/bolaDeTenis.png";

    obstacles8Img = new Image();
    obstacles8Img.src = "/img/bike.png";

    obstacles9Img = new Image();
    obstacles9Img.src = "/img/barra.png";

    obstacles10Img = new Image();
    obstacles10Img.src = "/img/prancha.png";

    requestAnimationFrame(update);
    requestAnimationFrame(animation);

    setInterval(placeObstacles, 1000) //after 1s is generate a new obstacle

    document.addEventListener("keydown", moveRunner);
    musica(); 
}

function animation(){
    if (gameOver){
        historic();
        return end();
    }
    else{
    let cropHeight = 200;
    let cropWidth = 70;
    let sprite = 50;
    runnerImg = new Image();
    runnerImg.src = "/img/sprite.png";
    runnerImg.onload = function(){
    context.drawImage(runnerImg, 20,sprite, 70,cropWidth, cropHeight,runner.x, runner.y, runner.width, 0);
    };

    let anima = setInterval(()=>{
        if(sprite>570)
            sprite=50
        context.clearRect(0,0,boardWidth,boardHeight);
        context.drawImage(runnerImg,sprite,70,120,200,runner.x, runner.y-10, runner.width, runner.height);
        sprite=sprite + 130;
    },100)

}}

function musica(){
    this.music.play();
}

function jumpSound(){
    this.pulo.play();
}
function update(){

    requestAnimationFrame(update);
    
    
    if(gameOver){
        historic();
        console.log(scoreArray[0]);
        return end();
    }
    else{
    context.clearRect(200,0,boardWidth,boardHeight);
    
    //runner

    velocityY += gravity;
    runner.y = Math.min(runner.y + velocityY, runnerY);

    //osbtacles
    for (let i = 0; i < obstaclesArray.length; i++){
        let obstacles = obstaclesArray[i];
        obstacles.x += velocityX;
        context.drawImage(obstacles.img, obstacles.x, obstacles.y, obstacles.width, obstacles.height);
        
        if (detectCollision(runner, obstacles)){
            gameOver = true;
            //document.querySelector("#primeiro").innerHTML = score;
        }
    }
    }

    //score
    context.clearRect(0,-500,boardWidth,boardHeight);
    context.fillStyle="yellow";
    context.font="30px courier";
    score++;
    context.fillText(score, 10, 20);
}




function moveRunner(e){
    if(gameOver){
        return;
    }

    if ((e.code == "Space" || e.code == "ArrowUp") && runner.y == runnerY){
        jumpSound();
        velocityY = -10;
    }
}

function placeObstacles(){
    if(gameOver){
        return;
    }
    let obstacles = {
        img : null,
        x : obstaclesX ,
        y : obstaclesY ,
        width : null,
        height : obstaclesHeight
    }

    let placeObstaclesChance = Math.random();

    if (placeObstaclesChance > .90){
        obstacles.img = obstacles1Img;
        obstacles.width = obstacles1Width;
        obstacles.height = obstacles1Height;
        obstaclesArray.push(obstacles);
    }

    else if (placeObstaclesChance > .80){
        obstacles.img = obstacles3Img;
        obstacles.width = obstacles3Width;
        obstaclesArray.push(obstacles);
    }


    else if (placeObstaclesChance > .40){
        obstacles.img = obstacles7Img;
        obstacles.width = obstacles7Width;
        obstacles.height = obstacles7Height;
        obstaclesArray.push(obstacles);
    }

    else if (placeObstaclesChance > .30){
        obstacles.img = obstacles8Img;
        obstacles.width = obstacles8Width;
        obstaclesArray.push(obstacles);
    }
    else if (placeObstaclesChance > .20){
        obstacles.img = obstacles9Img;
        obstacles.width = obstacles9Width;
        obstaclesArray.push(obstacles);
    }

    else if (placeObstaclesChance > .10){
        obstacles.img = obstacles10Img;
        obstacles.width = obstacles10Width;
        obstaclesArray.push(obstacles);
    }
    
    //clear Array after the obstacles pass the runner
    if (obstaclesArray.length > 10){
        obstaclesArray.shift();
    }

        
}

function detectCollision(a, b){
    return a.x < b.x +b.width && a.x +a.width > b.x && a.y < b.y + b.height && a.y + a.height >b.y;
}

function end(){
    window.location.href="/end/index.html"
}

function historic(){
    scoreArray.unshift(score);
    if(scoreArray[4]>0)[
        scoreArray(4,1)
    ]
}



