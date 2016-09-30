var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var game;
var gamePaused = false;


var humanScore = 0;
var compScore = 0;

var ballX = canvas.width/2;
var ballY = canvas.height/2;

var ballRadius = 10;

var ballDXArray = [1, 2, -1, -2];
var ballDYArray = [-3, 3];
var ballDX;
var ballDY;

function speed(sp){
  if (sp == 1){
    document.getElementById('slow').style.opacity = 0.5;
    document.getElementById('medium').style.opacity = 0.5;
    document.getElementById('fast').style.opacity = 1;
    if (ballDY > 0){
      ballDY = 6;
    } else {
      ballDY = -6;
    }
    ballDYArray = [-6, 6];
  } else if (sp == 0){
    document.getElementById('slow').style.opacity = 0.5;
    document.getElementById('medium').style.opacity = 1;
    document.getElementById('fast').style.opacity = 0.5;
    if (ballDY > 0){
      ballDY = 3;
    } else {
      ballDY = -3;
    }
    ballDYArray = [-3, 3];
  } else {
    document.getElementById('slow').style.opacity = 1;
    document.getElementById('medium').style.opacity = 0.5;
    document.getElementById('fast').style.opacity = 0.5;
    ballDYArray = [-2, 2];
    if (ballDY > 0){
      ballDY = 2;
    } else {
      ballDY = -2;
    }
  }
}

function randomStart(){
  ballX = canvas.width/2;
  ballY = canvas.height/2;
  var randDX;
  randDX= Math.floor(Math.random() * ballDXArray.length);
  ballDX = ballDXArray[randDX];
  var randDY;
  randDY = Math.floor(Math.random() * ballDYArray.length);
  ballDY = ballDYArray[randDY];
}

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
  document.getElementById('easy').style.opacity = 1;
  document.getElementById('normal').style.opacity = 0.5;
  document.getElementById('hard').style.opacity = 0.5;
}

function normal(){
  aiHeightMultiplier = 0.8;
  aiLag = 20;
  aiSpeed = 4;
  document.getElementById('easy').style.opacity = 0.5;
  document.getElementById('normal').style.opacity = 1;
  document.getElementById('hard').style.opacity = 0.5;
}

function hard(){
  aiHeightMultiplier = 1;
  aiLag = 0;
  aiSpeed = 6;
  document.getElementById('easy').style.opacity = 0.5;
  document.getElementById('normal').style.opacity = 0.5;
  document.getElementById('hard').style.opacity = 1;
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

var wonSound = new Audio("./assets/won.wav");
wonSound.volume = 0.2;
var lostSound = new Audio("./assets/lost.wav");
lostSound.volume = 0.2;

function gameOver(){
  if(compScore > 9 || humanScore > 9){
    game = clearTimeout(game);

    var wl = document.getElementById("win-label");
    wl.style.visibility = "visible";
      if(compScore > 9 ){
        wl.innerHTML = "The Computer Won!";
        lostSound.play();
        retroMusic.pause();
        retroMusic.currentTime = 0;
      } else {
        wl.innerHTML = "You're the Winner!";
        wonSound.play();
        retroMusic.pause();
        retroMusic.currentTime = 0;
      }

    var rb = document.getElementById("restart-button");
    rb.style.visibility = "visible";
    rb.style.pointerEvents = "all";
  }
}

function reloadGame(){
  document.location.reload();
}

var hitSound = new Audio("./assets/ponghit1.wav");
hitSound.volume = 0.1;
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameOver();
    drawBall();
    drawPaddle();
    drawCompPaddle();


    if(ballX + ballDX > canvas.width-ballRadius
      || ballX + ballDX < ballRadius) {
    ballDX = -ballDX;
    }

    if (ballY + ballDY > canvas.height-ballRadius) {
      if(ballX > paddleX && ballX < paddleX + paddleWidth) {
        var paddleMovement = 0;
        if(rightPressed){
          paddleMovement = 2;
        } else if(leftPressed){
          paddleMovement = -2;
        }
          hitSound.play();
          ballDY = -ballDY;
          ballDX = ballDX + paddleMovement;
        }
        else {
        compScore++;
        coinSound.play();
        var cs = document.getElementById("comp-score");
        cs.value = compScore;
        randomStart();
      }
    }

    if(ballY + ballDY < ballRadius + paddleHeight) {
      if(ballX > compPaddleX && ballX < compPaddleX + paddleWidth) {
          hitSound.play();
          ballDY = -ballDY;
        }
        else {
        humanScore++;
        coinSound.play();
        var hs = document.getElementById("human-score");
        hs.value = humanScore;
        randomStart();
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
    } else if (e.keyCode == 77) {
      if (!retroMusic.paused){
      retroMusic.pause();
      hitSound.volume = 0;
      wonSound.volume = 0;
      lostSound.volume = 0;
    } else {
      retroMusic.play();
      hitSound.volume = 0.1;
      wonSound.volume = 0.2;
      lostSound.volume = 0.2;
      }
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

var coinSound = new Audio("./assets/coinstart.wav");
coinSound.volume = 0.2;
var retroMusic = new Audio('./assets/Star Commander1.wav');
retroMusic.volume = 0.2;
retroMusic.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

function pauseGame() {
  if (!gamePaused) {
    retroMusic.pause();
    game = clearTimeout(game);
    canvas.style.background = "grey";
    document.getElementById("pause-label").style.visibility = "visible";
    gamePaused = true;
  } else if (gamePaused) {
    retroMusic.play();
    game = setInterval(draw, 10);
    canvas.style.background = "black";
    document.getElementById("pause-label").style.visibility = "hidden";
    gamePaused = false;
  }
}


function startNewGame(){
  coinSound.play();
  hitSound.volume = 0.1;
  wonSound.volume = 0.2;
  lostSound.volume = 0.2;
  var ng = document.getElementById("new-game");
  ng.style.pointerEvents = "none";
  ng.style.visibility = "hidden";
  randomStart();
  humanScore = 0;
  compScore = 0;
  game = setInterval(draw, 10);
  retroMusic.play();
}
