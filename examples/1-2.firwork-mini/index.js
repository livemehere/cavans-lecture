import { Rect } from "./Rect.js";

class App {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.objects = [];
    this.firworks = [];
    this.animate();
    this.init();
  }
  init() {
    this.resize();
    window.addEventListener("resize", this.resize.bind(this));

    for (let i = 0; i < 100; i++) {
      const size = 5;
      const r = new Rect({
        x: randomBetween(0, this.canvas.width),
        y: this.canvas.height + randomBetween(0, 50),
        width: size,
        height: size,
        color: `hsl(${randomBetween(0, 360)}, 50%, 50%)`,
        dx: 0,
        dy: randomBetween(-10, -15) * this.canvas.height * 0.0008,
        friction: randomBetween(0.98, 0.99),
      });
      this.objects.push(r);
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.update();
    this.draw();
  }

  update() {
    this.firworks.forEach((obj, i) => {
      if (obj.opacity <= 0) {
        this.firworks.splice(i, 1);
      }
    });

    this.objects.forEach((obj, index) => {
      if (obj.opacity <= 0) {
        const x = obj.x;
        const y = obj.y;
        this.objects.splice(index, 1);

        for (let i = 0; i < 100; i++) {
          const size = 5;
          const color = obj.color;
          const radian = (Math.PI / 180) * randomBetween(0, 360);
          const r = new Rect({
            x,
            y,
            width: size,
            height: size,
            color: color,
            dx: Math.cos(radian) * randomBetween(0, 2),
            dy: Math.sin(radian) * randomBetween(0, 2),
            friction: randomBetween(0.98, 0.99),
            vy: 0.08,
          });
          this.firworks.push(r);
        }
      }
    });
  }

  draw() {
    this.ctx.fillStyle = "rgba(0,0,0,0.1)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.objects.forEach((obj) => {
      obj.update();
      obj.draw(this.ctx);
    });
    this.firworks.forEach((obj) => {
      obj.update();
      obj.draw(this.ctx);
    });
  }
}

new App();

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}
