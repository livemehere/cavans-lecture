export class Rain {
  constructor({ x, y, vy, dx, color, width, height, deg }) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.vy = vy;
    this.color = color;
    this.deg = deg ?? 0;
    this.dx = dx;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(degToRad(this.deg));
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }

  update() {
    this.y += this.vy;
    this.x += this.dx;
  }
}

function degToRad(deg) {
  return (Math.PI / 180) * deg;
}
