export class Mirror {
  constructor({ canvas, app }) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.app = app;

    this.resize();
    this.animate();
  }

  resize() {
    this.width = this.app.width;
    this.height = this.app.height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  draw() {
    this.snapshot = this.app.ctx.getImageData(
      0,
      0,
      this.app.width,
      this.app.height,
    );
    this.ctx.putImageData(this.snapshot, 0, 0);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.draw();
  }
}
