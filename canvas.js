var xs = 6;
var ys = 6;

var map = new Array(xs);

for (var i=0; i<map.length; i++) {
  map[i] = new Array(ys);
};

for (var i=0; i<xs; i++) {
  for (var j=0; j<ys; j++) {
    map[i][j] = { state:0, type: 0};
  }
};

var size = 30;

var xo = -1;
var yo = 1;

var xpo = size;
var ypo = size;

canvas = document.getElementById('canvas')
canvas.addEventListener('click', onClick, false);
var g = canvas.getContext('2d');
g.fillStyle='#FF00A5';
repaint();

function repaint() {
  for (var i=-xo; i<map.length-xo; i++) {
    for (var j=-yo; j<map[i+xo].length-yo; j++) {
      drawHex(map[i+xo][j+yo], xpo + i*size*3/2, ypo + (i+j*2)*size*Math.sqrt(3)/2);
    }
  }
}

function onClick(e) {
  var pp = getPosition(e.currentTarget);
  var xp = e.clientX - pp.x - xpo;
  var yp = e.clientY - pp.y - ypo;

  var hq = 2/3 * xp / size + xo;
  var hr = (-1/3 * xp + 1/3*Math.sqrt(3) * yp) / size + yo;

  console.log(hq + " " + hr);

  map[Math.round(hq)][Math.round(hr)].state = 1;
  repaint();
}

function drawHex(hex, xp, yp) {
  g.beginPath();
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
  if (hex.state == 0)
    g.stroke();
  else
    g.fill();
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