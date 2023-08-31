import { Particle } from "./Particle.js";

export class App {
  constructor({ canvas, width, height }) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = width;
    this.height = height;

    this.resize();

    this.mouse = {
      x: null,
      y: null,
    };
    window.addEventListener("mousemove", this.onMouseMove.bind(this));

    this.particleCount = 11;
    this.particles = [];

    this.animate();
  }

  onMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
  }

  resize() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.draw();
  }

  draw() {
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.drawCursor();
    this.ctx.globalCompositeOperation = "lighter";
    this.drawParticles();
  }

  drawCursor() {
    this.ctx.beginPath();
    this.ctx.arc(this.mouse.x, this.mouse.y, 5, 0, Math.PI * 2);
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawParticles() {
    if (this.mouse.x && this.mouse.y) {
      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push(
          new Particle({
            x: this.mouse.x,
            y: this.mouse.y,
            app: this,
          }),
        );
      }
    }

    this.particles.forEach((particle) => {
      particle.draw(this.ctx);
      particle.update();
    });
  }
}
