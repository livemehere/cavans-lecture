export class Particle {
    constructor({x,y,r,speed, friction,dy,dx,color,vy}) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.speed = speed;
        this.friction = friction;
        this.dy = dy;
        this.dx = dx;
        this.color = color;
        this.opacity = 1;
        this.vy = vy;
    }

    draw(ctx){
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r,0,Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    update(){
        if(this.vy){
            this.dy += this.vy;
        }
        this.dy = this.dy * this.friction;
        this.dx = this.dx * this.friction;
        this.x += this.dx;
        this.y += this.dy;
        this.opacity -= 0.01;
    }

}
