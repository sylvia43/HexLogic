canvas = document.getElementById('canvas')
canvas.addEventListener('click', onClick, false);
var g = canvas.getContext('2d');
g.fillStyle='#FF00A5';

function onClick(e) {
  var pp = getPosition(e.currentTarget);
  var xp = e.clientX - pp.x;
  var yp = e.clientY - pp.y;

  console.log(xp + " " + yp);

  g.fillRect(xp,yp,10,10);
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