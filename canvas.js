var map = [
  [{state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}],
  [{state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}],
  [{state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}],
  [{state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}],
  [{state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}],
  [{state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}, {state:0, type:0}],
];

var size = 30;

canvas = document.getElementById('canvas')
canvas.addEventListener('click', onClick, false);
var g = canvas.getContext('2d');
g.fillStyle='#FF00A5';

for (var i=-3; i<map.length-3; i++) {
  for (var j=-3; j<map[i+3].length-3; j++) {
    drawHex(map[i+3][j+3], 400 + i*size*3/2, 400 + (i+j*2)*size*Math.sqrt(3)/2);
  }
}

function onClick(e) {
  var pp = getPosition(e.currentTarget);
  var xp = e.clientX - pp.x;
  var yp = e.clientY - pp.y;
}

function drawHex(hex, xp, yp) {
  var i;
  for (i=0; i<=6; i++) {
    var angle = 2 * Math.PI / 6 * i;
    x = xp + size * Math.cos(angle);
    y = yp + size * Math.sin(angle); 
    if (i == 0)
      g.moveTo(x,y);
    else
      g.lineTo(x,y);
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