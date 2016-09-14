var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var humanScore = 0;
var compScore = 0;

var ballX = canvas.width/2;
var ballY = canvas.height/2;
var ballDX = 1;
var ballDY = 2;
var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
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

    if(ballX + ballDX > canvas.width-ballRadius
      || ballX + ballDX < ballRadius) {
    ballDX = -ballDX;
    }

    if (ballY + ballDY > canvas.height-ballRadius) {
      if(ballX > paddleX && ballX < paddleX + paddleWidth) {
        ballDY = -ballDY;
        }
        else {
        compScore++;
        ballX = canvas.width/2;
        ballY = canvas.height/2;
        ballDX = 1;
        ballDY = 2;
      }
    }

    if(ballY + ballDY < ballRadius) {
      humanScore++;
      ballX = canvas.width/2;
      ballY = canvas.height/2;
      ballDX = 1;
      ballDY = 2;
    }

    ballX += ballDX;
    ballY += ballDY;

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
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



setInterval(draw, 10);
