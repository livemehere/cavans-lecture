import { Particle } from "./Particle.js";
import { Pillar } from "./Pillar.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d");
    this.dpr = window.devicePixelRatio > 1 ? 2 : 1;

    this.resize();
    window.addEventListener("resize", this.resize.bind(this));

    this.particles = [];
    this.particleCount = 2000;
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(this));
    }

    this.pillars = [];
    this.pillarCount = 40;
    for (let i = 0; i < this.pillarCount; i++) {
      this.pillars.push(new Pillar(this));
    }

    this.animate();
  }

  resize() {
    this.width = 400;
    this.height = 400;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
    this.canvas.style.width = this.width + "px";
    this.canvas.style.height = this.height + "px";
  }

  draw() {
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.globalCompositeOperation = "lighter";
    this.particles.forEach((p) => {
      p.update();
      p.draw(this.ctx);
    });

    this.ctx.globalCompositeOperation = "source-over";
    this.pillars.forEach((p) => {
      p.update();
      p.draw(this.ctx);
    });
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.draw();
  }
}

new App();
