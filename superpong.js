var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var game;
var gamePaused = false;


var humanScore = 0;
var compScore = 0;

var ballX = canvas.width/2;
var ballY = canvas.height/2;
var ballDX = 0;
var ballDY = 3;
var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 75;

var paddleX = (canvas.width-paddleWidth)/2;
var compPaddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

var aiHeightMultiplier = 0.75;
var aiLag = 15;
var aiSpeed = 3;

function easy(){
  aiHeightMultiplier = 0.65;
  aiLag = 20;
  aiSpeed = 2;
}

function normal(){
  aiHeightMultiplier = 0.8;
  aiLag = 20;
  aiSpeed = 4;
}

function hard(){
  aiHeightMultiplier = 1;
  aiLag = 0;
  aiSpeed = 6;
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawCompPaddle() {
    ctx.beginPath();
    ctx.rect(compPaddleX, 0, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, 10, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawCompPaddle();

    if(ballX + ballDX > canvas.width-ballRadius
      || ballX + ballDX < ballRadius) {
    ballDX = -ballDX;
    }

    if (ballY + ballDY > canvas.height-ballRadius) {
      if(ballX > paddleX && ballX < paddleX + paddleWidth) {
        let paddleMovement = 0;
        if(rightPressed){
          paddleMovement = 2;
        } else if(leftPressed){
          paddleMovement = -2;
        }
        ballDY = -ballDY;
        ballDX = ballDX + paddleMovement;
        }
        else {
        compScore++;
        let cs = document.getElementById("comp-score");
        cs.value = compScore;
        ballX = canvas.width/2;
        ballY = canvas.height/2;
        ballDX = 2;
        ballDY = 3;
      }
    }

    if(ballY + ballDY < ballRadius + paddleHeight) {
      if(ballX > compPaddleX && ballX < compPaddleX + paddleWidth) {
        ballDY = -ballDY;
        }
        else {
        humanScore++;
        let hs = document.getElementById("human-score");
        hs.value = humanScore;
        ballX = canvas.width/2;
        ballY = canvas.height/2;
        ballDX = -2;
        ballDY = 3;
      }
    }

    ballX += ballDX;
    ballY += ballDY;

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
      paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

    if(ballY < canvas.height*aiHeightMultiplier && ballDY < 0 ){
      if(ballX > paddleX + paddleWidth/2 - 1 && ballX < paddleX + paddleWidth/2 + 1){

      }
      else if(ballX + aiLag > compPaddleX + paddleWidth/2 && compPaddleX < canvas.width-paddleWidth){
        compPaddleX += aiSpeed;
      } else if (ballX-paddleWidth - aiLag < compPaddleX && compPaddleX > 0){
        compPaddleX -= aiSpeed;
      }
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    } else if (e.keyCode == 80) {
      pauseGame();
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function pauseGame() {
  if (!gamePaused) {
    game = clearTimeout(game);
    canvas.style.background = "grey";
    document.getElementById("pause-label").style.visibility = "visible";

    gamePaused = true;
  } else if (gamePaused) {
    game = setInterval(draw, 10);
    canvas.style.background = "black";
    document.getElementById("pause-label").style.visibility = "hidden";
    gamePaused = false;
  }
}

function startNewGame(){
  let ng = document.getElementById("new-game");
  ng.style.pointerEvents = "none";
  ng.style.visibility = "hidden";
  ballX = canvas.width/2;
  ballY = canvas.height/2;
  ballDX = 2;
  ballDY = -3;
  humanScore = 0;
  compScore = 0;
  game = setInterval(draw, 10);
}
