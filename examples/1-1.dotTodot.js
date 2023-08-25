const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const dpr = window.devicePixelRatio > 1 ? 2 : 1;

function setSize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
}

function degToRadian(deg) {
  return (Math.PI / 180) * deg;
}

function lerp(a, b, r) {
  return a + (b - a) * r;
}

let mouse = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
};
let targetMouse = {
  x: 0,
  y: 0,
};
let dashOffset = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circle(mouse.x1, mouse.y1, 10, "red");
  circle(mouse.x2, mouse.y2, 10, "red");
  if (targetMouse.x) {
    mouse.x2 = lerp(mouse.x2, targetMouse.x, 0.1);
    mouse.y2 = lerp(mouse.y2, targetMouse.y, 0.1);
  }

  if (mouse.x1 && mouse.x2) {
    dashOffset--;
    line(mouse.x1, mouse.y1, mouse.x2, mouse.y2);
  }
}

function circle(x, y, r, color) {
  ctx.save();
  ctx.shadowBlur = 24;
  ctx.shadowColor = color;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, degToRadian(360));
  ctx.fill();
  ctx.closePath();
  ctx.restore();
}

function line(x1, y1, x2, y2) {
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "red";
  ctx.lineDashOffset = dashOffset;
  ctx.setLineDash([20, 20]);
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
}

function animate() {
  requestAnimationFrame(animate);
  draw();
}

window.addEventListener("mousedown", (e) => {
  const x = e.clientX * dpr;
  const y = e.clientY * dpr;
  if (!mouse.x1) {
    mouse.x1 = x;
    mouse.y1 = y;
  } else if (mouse.x1 && !mouse.x2) {
    mouse.x2 = mouse.x1;
    mouse.y2 = mouse.y1;
    targetMouse.x = x;
    targetMouse.y = y;
  } else {
    mouse = {
      x1: x,
      y1: y,
      x2: 0,
      y2: 0,
    };
    targetMouse = { x: 0, y: 0 };
  }
});

setSize();
animate();
