import { Rain } from "./Rain.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d");
    this.dpr = window.devicePixelRatio > 1 ? 2 : 1;

    this.resize();
    window.addEventListener("resize", this.resize.bind(this));

    this.mouse = { x: 0, y: 0 };
    this.centerX = this.width / 2;
    this.mouseRatio = 0;
    window.addEventListener("mousemove", this.onMouseMove.bind(this));

    this.rains = [];
    this.setRains();

    this.animate();
  }

  onMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
    this.mouseRatio = (this.mouse.x - this.centerX) / this.centerX;
    this.rains.forEach((rain) => {
      rain.dx = this.mouseRatio * 4;
      rain.deg = -this.mouseRatio * 20;
    });
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
    this.canvas.style.width = this.width + "px";
    this.canvas.style.height = this.height + "px";
    this.setRains();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.rains.forEach((rain) => {
      rain.update();
      rain.draw(this.ctx);
      if (rain.y > this.height) {
        rain.y = 0;
        rain.vy = Math.random() * 14 + 10;
      }
      if (rain.x > this.width) rain.x = 0;
      if (rain.x < 0) rain.x = this.width;
    });
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.draw();
  }

  setRains() {
    this.rains = [];
    for (let i = 0; i < 1; i++) {
      const width = 1;
      const height = 30;
      const x = Math.random() * this.width - width + width;
      const y = Math.random() > 0.5 ? -350 : 0;
      const vy = Math.random() * 14 + 10;
      this.rains.push(
        new Rain({
          x,
          y: y - height * 3,
          dx: 0,
          vy,
          color: "rgba(255,255,255,0.4)",
          width,
          height,
        })
      );
    }
  }
}

new App();
