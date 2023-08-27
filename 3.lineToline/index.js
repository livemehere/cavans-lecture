const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let lastTime = Date.now();
let deltaTime = 0;
const fps = 60;
const fpsTime = 1000 / fps;

const dots = [];
const mouse = {
    x: null,
    y: null,
}
let lineDash = [20,20]
let lineDashOffset = 0;
let done = false;
let speed = 4;

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
    if(done){
        lineDashOffset = lineDashOffset - speed < 0 ? 0 : lineDashOffset - speed;
    }

    dots.forEach((dot,i)=>{
        drawCircle(dot.x,dot.y,5,'red');
        if(i === 0 || !done) return;
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash(lineDash);
        ctx.lineDashOffset = lineDashOffset;
        ctx.moveTo(dots[i-1].x,dots[i-1].y);
        ctx.lineTo(dot.x,dot.y);
        ctx.strokeStyle = 'red';
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    })
}


function drawCircle(x,y,r,color){
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

window.addEventListener('mousedown', (e)=>{
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;

    dots.push({
        x: mouse.x,
        y: mouse.y,
    })
})

window.addEventListener('keydown', (e)=> {
    const key = e.key;
    if(key === 'Enter'){
        done = true;
    }

    let calcedTotalLength = 0;
    dots.forEach((dot,i)=>{
        if(i === 0) return;
        calcedTotalLength = Math.ceil(Math.sqrt(Math.pow(dot.x - dots[i-1].x,2) + Math.pow(dot.y - dots[i-1].y,2)));
    })
    lineDash = [calcedTotalLength, calcedTotalLength];
    lineDashOffset = calcedTotalLength;
    console.log(calcedTotalLength)
})
