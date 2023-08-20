const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let lastTime = Date.now();
let deltaTime = 0;
const fps = 60;
const fpsTime = 1000 / fps;

const state = {
    dashOffset:0,
    img: null,
    imgLoaded: false,
}

init();
function init(){
    state.img = new Image();
    state.img.src = 'https://picsum.photos/200/300';
    state.img.addEventListener('load', () => {
        state.imgLoaded = true;
    })
}

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

    update();
    draw();
}
animate();

function update(){
    state.dashOffset++;
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawRect();
    drawCircle();
    drawLine();
    drawText();
    drawImage();
    drawWithTransform();
    drawTriangle();
    drawPolygon(5);
    drawBezierCurve();
    drawQuadraticCurve();
}

function drawRect(){
    ctx.save(); // 안하면 다음 그리기에 영향을 줍니다(의도적으로 잘 활용)

    // 사각형 fill
    ctx.fillStyle = 'red';
    ctx.fillRect(10,10,50,50); // 좌표기준: 좌상단

    // 사각형 stroke
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 5;
    ctx.setLineDash([10,10])
    ctx.lineDashOffset = state.dashOffset;
    ctx.strokeRect(10,10,50,50);

    ctx.restore();
}
function drawCircle(){
    ctx.save();
    ctx.beginPath()
    // 원
    ctx.fillStyle = 'gray';
    ctx.arc(200,35,30, 0, degToRadian(360)); // 좌표기준: 원의 중점
    ctx.fill();

    // 원 stroke
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.closePath();
    ctx.restore();
}
function drawLine(){
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 5;
    // ctx.setLineDash([10,10])
    // ctx.lineDashOffset = state.dashOffset;
    ctx.moveTo(100,100);
    ctx.lineTo(200,200);
    ctx.stroke();
    ctx.closePath()
    ctx.restore();
}
function drawText(){
    ctx.save();

    /* 가이드 라인 */
    ctx.beginPath()
    ctx.strokeStyle = 'red';
    ctx.moveTo(300, 50);
    ctx.lineTo(500, 50);
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = 'black';
    ctx.font = 'italic bold 30px Arial';
    ctx.textAlign = 'start'; // center, end
    ctx.textBaseline = 'top'; // middle, bottom
    ctx.fillText('Hello World', 300, 50);
    ctx.strokeStyle = 'blue';
    ctx.strokeText('Hello World', 300, 50);
    ctx.restore();
}
function drawImage(){
    if(state.imgLoaded){
        ctx.drawImage(state.img, 300, 300);
    }
}
function drawWithTransform(){

    ctx.save();
    /* 순서 중요 */
    ctx.translate(100,500); // (1)
    ctx.scale(2,2); // (2)
    ctx.rotate(degToRadian(45)); // (2)
    ctx.fillStyle = 'black';
    ctx.fillRect(-25,-25,50,50);
    ctx.restore();

    /* 기준점 표시 */
    ctx.save();
    ctx.fillStyle = 'red'
    ctx.fillRect(100,500,5,5);
    ctx.restore();

}
function drawTriangle(){

    ctx.save();
    ctx.translate(50,600);
    ctx.rotate(degToRadian(0));
    ctx.beginPath();
    ctx.moveTo(-25,0);
    ctx.lineTo(25,0);
    ctx.lineTo(0,-25);
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.restore();

    // 기준점
    ctx.save();
    ctx.fillStyle = 'red';
    ctx.fillRect(50,600,5,5);
    ctx.restore();

}
function drawPolygon(n){
    if(n< 3) return;

    const x = 200;
    const y = 600;
    const radius = 50;
    const angle = (2 * Math.PI) / n;

    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(degToRadian(0));
    ctx.beginPath();
    ctx.moveTo(radius, 0);

    for (let i = 1; i <= n; i++) {
        const xPos =  Math.cos(angle * i) * radius;
        const yPos =  Math.sin(angle * i) * radius;
        ctx.lineTo(xPos, yPos);
    }

    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();

    // 기준점
    ctx.save();
    ctx.fillStyle = 'red';
    ctx.fillRect(x,y,5,5);
    ctx.restore();


}
function drawBezierCurve(){
    /* 총 4개의 점으로 표현 */
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(100,100);
    ctx.bezierCurveTo(200,200,300,200,400,100);
    ctx.stroke();
    ctx.restore();
}
function drawQuadraticCurve(){
    /* 총 3개의 점으로 표현 */
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(100,100);
    ctx.quadraticCurveTo(200,200,400,100);
    ctx.stroke();
    ctx.restore();
}

/* Util */
function degToRadian(deg){
    return Math.PI / 180 * deg;
}

