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
      10,
      0,
      360
    ); /* 360 == Math.PI, Documentation says last two params should be in radians, but degrees work the same ...  */
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

}
function draw() {

    /*clearing the canvas, to prevent every single frame from staying on it*/
    ctx.clearRect(0,0,canvas.width,canvas.height);

  /* Drawing a ball */
  drawCircle();
  
  x += dx;
  y += dy;
}

setInterval(draw, 10); /*execute ctx function every 10 miliseconds*/
