import { rand } from "./util.js";

export class Pillar {
  constructor(app) {
    this.app = app;
    this.reset();
  }

  reset() {
    this.radius = rand(50, 100);
    this.renderRadius = 0;
    this.x = rand(0, this.app.width);
    this.y = rand(this.app.height * 0.4, this.app.height);
    this.active = false;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.renderRadius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(20, 20, 20, 0.3)";
    ctx.fill();
  }

  update() {
    if (this.active) {
      if (this.radius <= 1) {
        this.reset();
      } else {
        this.renderRadius = this.radius;
      }
    } else {
      if (this.renderRadius < this.radius) {
        this.renderRadius += 1;
      } else {
        this.active = true;
      }
    }
  }
}
