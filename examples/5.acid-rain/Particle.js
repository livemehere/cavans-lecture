import { distance, rand } from "./util.js";

export class Particle {
  constructor(app) {
    this.app = app;
    this.reset();
  }

  reset() {
    this.radius = 1;
    this.hit = false;
    this.particlePath = 4;
    this.gravity = 0.1;
    this.path = [];
    this.x = rand(0, this.app.width);
    this.y = 0;
    this.vx = 0;
    this.vy = rand(1, 2);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    this.path.forEach((p) => {
      ctx.lineTo(p.x, p.y);
    });
    ctx.strokeStyle = `hsla(${rand(this.x, this.x + 60)}, 50%, 30%,0.6)`;
    ctx.stroke();
    if (this.hit) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, rand(1, 25), 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${rand(this.x, this.x + 60)}, 80%, 15%,0.1)`;
      ctx.fill();
    }
  }

  update() {
    this.hit = false;
    this.path.push({ x: this.x, y: this.y });
    if (this.path.length > this.particlePath) {
      this.path.shift();
    }
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;

    if (this.y >= this.app.height + 10) {
      this.reset();
    }

    this.app.pillars.forEach((p) => {
      if (distance(this, p) < this.radius + p.renderRadius) {
        this.vx = (this.x - p.x) * rand(0.01, 0.03);
        this.vy = (this.y - p.y) * rand(0.01, 0.03);
        this.hit = true;
        p.radius -= 0.1;
      }
    });
  }
}
