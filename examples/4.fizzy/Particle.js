import { random } from "./util.js";

export class Particle {
  constructor({ x, y, app }) {
    this.vxNagative = random(1, 2) === 1 ? true : false;
    this.x = x;
    this.y = y;
    this.r = random(5, 10);
    this.color = `hsla(${random(30, 60)},100%,${random(50, 100)}%,  1)`;
    this.vx = this.vxNagative ? random(0, 50) * -0.1 : random(0, 50) * 0.1;
    this.vy = random(-10, 10);
    this.vxMult = random(10, 20) * 0.05;
    this.vyMult = random(10, 20) * 0.05;

    this.gravity = 0.8;
    this.app = app;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.x += this.vx;
    this.vy++;
    this.y += this.vy;
    this.r -= 0.1;
    if (this.r <= 0) {
      this.app.particles.splice(this.app.particles.indexOf(this), 1);
    }

    if (this.app.height <= this.y + this.r) {
      this.y = this.app.height - this.r;
      this.vy *= this.vyMult;
      this.vy *= -this.gravity;
      this.vx *= this.vxMult;
    }
  }
}
