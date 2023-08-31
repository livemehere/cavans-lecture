export class Rect {
  constructor({ x, y, width, height, color, dx, dy, friction, vy }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.dx = dx;
    this.dy = dy;
    this.friction = friction;
    this.opacity = 1;
    this.vy = vy;
  }
  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }
  update() {
    if (this.vy) {
      this.y += this.vy;
    }
    this.dy *= this.friction;
    this.dx *= this.friction;
    this.x += this.dx;
    this.y += this.dy;
    this.opacity = Math.max(0, this.opacity - 0.005);
  }
}
