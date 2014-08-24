var map = [
  [{state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}],
  [{state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}],
  [{state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}],
  [{state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}],
  [{state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}],
  [{state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}],
];

canvas = document.getElementById('canvas')
canvas.addEventListener('click', onClick, false);
var g = canvas.getContext('2d');
g.fillStyle='#FF00A5';

function onClick(e) {
  var pp = getPosition(e.currentTarget);
  var xp = e.clientX - pp.x;
  var yp = e.clientY - pp.y;

  console.log(xp + " " + yp);

  drawHex(xp, yp, 10);
}

function drawHex(xp, yp, size) {
  var i;
  for (i=0; i<6; i++) {
    var angle = 2 * Math.PI / 6 * i;
    x_i = xp + size * Math.cos(angle);
    y_i = yp + size * Math.sin(angle); 
    if (i == 0)
      g.moveTo(x_i, y_i);
    else
      g.lineTo(x_i, y_i);
  }
  g.stroke();
}

function getPosition(e) {
    var xp = 0;
    var yp = 0;
    
    while (e) {
        xp += (e.offsetLeft - e.scrollLeft + e.clientLeft);
        yp += (e.offsetTop - e.scrollTop + e.clientTop);
        e = e.offsetParent;
    }
    return { x: xp, y: yp };
}