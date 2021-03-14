var canvas = document.getElementById(
    "Canvas"
  ); /*reference to <canvas> element stored in canvas variable*/
  var ctx = canvas.getContext(
    "2d"
  ); /*ctx variable stores the 2D rendering context*/
  var x = canvas.width/2; /* bottom center of canvas */
  var y = canvas.height -30; 
  var dx = 2; /*rate of change of x*/
  var dy = -2; /*rate of change of y*/
  var ballRadius = 10;
  var paddleHeight = 10;
  var paddleWidth = 75;
  var paddleX = (canvas.width-paddleWidth) / 2;
  var rightPressed = false;
  var leftPressed = false;
  

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
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
  
  function drawCircle(){
  
  
  
      ctx.beginPath();
      ctx.arc(
        x,
        y,
        ballRadius,
        0,
        360
      ); /* 360 == Math.PI, Documentation says last two params should be in radians, but degrees work the same ...  */
      ctx.fillStyle = "#F991AA";
      ctx.fill();
      ctx.closePath();
  
  }
  
  function drawPaddle(){
  
      ctx.beginPath();
      ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
      ctx.fillStyle = "#CBFBBB"
      ctx.fill();
      ctx.closePath();
  
  }
  function draw() {
  
      /*clearing the canvas, to prevent every single frame from staying on it*/
      ctx.clearRect(0,0,canvas.width,canvas.height);
  
    /* Drawing a ball */
    drawCircle();
    drawPaddle();
  
    /* if ball at top y of canvas
    or
    if ball at bottom of canvas, reverse its direction */
  if (y + dy < ballRadius || y + dy > canvas.height-ballRadius){ 
      dy = -dy;
  }
  
  /* if ball at left x of canvas
    or
    if ball at right x of canvas, reverse its direction */
  if (x+dx > canvas.width-ballRadius || x+dx < ballRadius){
      dx = -dx;
  }

if(rightPressed){
    paddleX += 7;
    if(paddleX + paddleWidth > canvas.width){

        paddleX = canvas.width - paddleWidth;
    }
}
else if(leftPressed){

    paddleX -= 7;

    if(paddleX < 0){

        paddleX = 0;
    }

}

x += dx;
y += dy;




  }
  
  setInterval(draw, 10); /*execute ctx function every 10 miliseconds*/