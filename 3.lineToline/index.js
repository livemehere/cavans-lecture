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
function draw(){
}


