var canvas = document.getElementById(
  "Canvas"
); /*reference to <canvas> element stored in canvas variable*/
var ctx = canvas.getContext(
  "2d"
); /*ctx variable stores the 2D rendering context*/
var x = canvas.width / 2; /* bottom center of canvas */
var y = canvas.height - 30;
var dx = 2; /*rate of change of x*/
var dy = -2; /*rate of change of y*/
var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 6;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var playerColor = "#F997AF";
var platformColor = "#97AFF9";
var scoreColor = "#97AFF9";

var score = 0;


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler,false );

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function mouseMoveHandler(e){
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }

}
/* 2-d array filled with bricks for the ball to hit*/
var bricks = [];
for(var c=0; c<brickColumnCount; c++) { //iterate columns, create an empty array for each one
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) { //iterate row
        
        bricks[c][r] = { x: 0, y: 0, status: 1 };

       //if(c == 0 || c == brickColumnCount -1){
           // bricks[c][r] = null;
       // }
    }
}

function endAlert(message){

    alert(message+"\n Score: "+score);
    document.location.reload();
    clearInterval(interval); // Needed for Chrome to end game

}
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                }

                if(score == brickColumnCount * brickRowCount){

                    endAlert("YOU WIN!");
                }
            }
        }
    }
}

/*
  Drawing a Red Square, for reference 
  ctx.beginPath();
  ctx.rect(20,40,50,50); top left coordinates, height, width. Rectangle is painted 20px from left side of screen and 40px from the top side. 50px wide and 50px high
  ctx.fillStyle="#FF0000"; stores a color that will be used by fill()
  ctx.fill();
  ctx.closePath();
  */

function drawCircle() {
  ctx.beginPath();
  ctx.arc(
    x,
    y,
    ballRadius,
    0,
    360
  ); /* 360 == Math.PI, Documentation says last two params should be in radians, but degrees work the same ...  */
  ctx.fillStyle = playerColor;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = platformColor;
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {

    /* 
       Loop through all bricks in the brick array and draw them on screen
       size = brickWidth x brickHeight  
    */
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = platformColor;
            ctx.fill();
            ctx.closePath();
        }
    }
    }
}

function drawScore(){

    ctx.font = "16px Arial";
    ctx.fillStyle = scoreColor;
    ctx.fillText("Score: "+score, 8, 20);
}
function draw() {
  /*clearing the canvas, to prevent every single frame from staying on it*/
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /* Drawing a ball */
  drawCircle();
  drawPaddle();
  drawBricks();
  drawScore();

  collisionDetection();
  

  /* if the ball's x value goes right out of bounds or left out of bounds reverse its direction */
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  /* if the ball's y goes out of bounds (hit's top of canvas) reverse the ball's direction */
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {

  /* if the ball's y goes out of bounds (hit's bottom of canvas): if the ball has hit the paddle, reverse the ball's y, if the ball did not hit a paddle: game over */
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {

        endAlert("GAME OVER");
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
}

var interval = setInterval(draw, 10); /*execute ctx function every 10 miliseconds*/
