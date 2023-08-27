const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let lastTime = Date.now();
let deltaTime = 0;
const fps = 60;
const fpsTime = 1000 / fps;

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function animate(){
    requestAnimationFrame(animate);

    const now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now - (deltaTime % fpsTime);
    if(deltaTime < fpsTime) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    draw();

}
animate();

function update(){
}

let x = 0;
let y =0;
let x2 = 500;
let y2 = 500;
let deg = 0;
const mouse = {
    x: 0,
    y: 0
}
function draw(){

    ctx.save();

    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(mouse.x,mouse.y,100,0,Math.PI*2);
    ctx.clip();
    ctx.stroke();

    x = lerp(x,x2,0.08);
    y = lerp(y,y2,0.08);
    deg += 5;
    ctx.fillStyle = 'red';
    ctx.save();
    ctx.beginPath()
    ctx.translate(x, y);
    ctx.rotate(degToRad(deg));
    ctx.fillRect(-50,-50, 100, 100);
    ctx.restore();

    ctx.restore();
}


function degToRad(deg){
    return deg * Math.PI / 180;
}

function lerp(a,b,r){
    return a + (b-a) * r;
}

window.addEventListener('mousemove', function(e){
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX
    mouse.y = e.clientY
}
)
