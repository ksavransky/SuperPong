var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ballX = canvas.width/2;
var ballY = canvas.height/2;
var ballDX = 2;
var ballDY = 0;
var ballRadius = 10;

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

    if(ballX + ballDX > canvas.width-ballRadius
      || ballX + ballDX < ballRadius) {
    ballDX = -ballDX;
    }


    ballX += ballDX;
    ballY += ballDY;
}

setInterval(draw, 10);
