var xs = 18;
var ys = 10;

var map = new Array(xs);

for (var i=0; i<map.length; i++) {
  map[i] = new Array(ys);
};

for (var i=0; i<xs; i++) {
  for (var j=0; j<ys; j++) {
    map[i][j] = { state:0, type:0};
  }
};

var size = 30;

var xo = 0;
var yo = 0;

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
      updateHex(map[i+xo][j+yo]);
      drawHex(map[i+xo][j+yo], xpo + i*size*3/2, ypo + j*2*size*Math.sqrt(3)/2 + (i%2==0?Math.sqrt(3)/2*size:0));
    }
  }
}

function updateHex(hex) {
  if (hex.type == 3)
    hex.state = 1;
  if (hex.type == 0)
    hex.state = 0;
}
 
function onClick(e) {
  var pp = getPosition(e.currentTarget);
  var xp = e.clientX - pp.x - xpo;
  var yp = e.clientY - pp.y - ypo;

  var hq = 2/3 * xp / size + xo;
  var hr = (-1/3 * xp + Math.sqrt(3)/3 * -(-xp - (yp - (xp - (xp&1)) / 2))) / size + yo;

  var h = map[Math.round(hq)][Math.round(hr)];
  h.type++;
  if (h.type>3)
    h.type=0;

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
  g.stroke();

  if (hex.type == 0)
    g.fillStyle='#AAAAAA';
  else if (hex.state==0)
    g.fillStyle='#FFFFFF';
  else
    g.fillStyle='#FFFF00';
  g.fill();

  g.beginPath();
  switch(hex.type) {
    case 0: // Blank
      break;
    case 1: // XOR
      g.moveTo(xp - size/4, yp - size/4);
      g.lineTo(xp + size/4, yp + size/4);
      g.moveTo(xp - size/4, yp + size/4);
      g.lineTo(xp + size/4, yp - size/4);
      break;
    case 2: // OR
      g.moveTo(xp - size/4, yp - size/4);
      g.lineTo(xp + size/4, yp - size/4);
      g.lineTo(xp + size/4, yp + size/4);
      g.lineTo(xp - size/4, yp + size/4);
      g.lineTo(xp - size/4, yp - size/4);
      break;
    case 3: // Power
      g.moveTo(xp - size/4, yp);
      g.lineTo(xp + size/4, yp);
      g.moveTo(xp, yp + size/4);
      g.lineTo(xp, yp - size/4);
      break;
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