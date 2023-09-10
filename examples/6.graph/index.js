class Graph {
  constructor(props) {
    this.width = props.width;
    this.height = props.height;
    this.backgroundColor = props.backgroundColor;
    this.max = props.max;
    this.min = props.min;

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.dpr = window.devicePixelRatio > 1 ? 2 : 1;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = this.width + "px";
    this.canvas.style.height = this.height + "px";
    this.ctx.scale(this.dpr, this.dpr);

    this.isAnimate = false;
    this.data = [];
    this.nextData = [];
    this.animate();
  }

  get domElement() {
    return this.canvas;
  }

  setData(data) {
    this.data = data;
    this.nextData = data;
    this.isAnimate = true;
    this.animate();
  }

  updateData(data) {
    this.nextData = data;
    this.isAnimate = true;
    this.animate();
  }

  _lerp(a, b, r) {
    return (b - a) * r;
  }

  updateDataPosition() {
    let addValues = [];
    for (let i = 0; i < this.data.length; i++) {
      const addValue = this._lerp(this.data[i], this.nextData[i], 0.05);
      addValues.push(addValue);
      this.data[i] += addValue;
    }
    if (Math.max(...addValues) <= 0) {
      this.isAnimate = false;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawPolygon(this.width / 2);
    this.drawPolygon(this.width / 3);
    this.drawPolygon(this.width / 5);
    this.drawPolygon(this.width / 12);
    this.drawDataPolygon(this.data);
  }

  animate() {
    if (!this.isAnimate) return;
    requestAnimationFrame(this.animate.bind(this));
    this.updateDataPosition();
    this.draw();
  }

  drawPolygon(r) {
    const dim = this.data.length;
    const perRadian = (Math.PI * 2) / dim;
    this.ctx.save();
    this.ctx.translate(this.width / 2, this.height / 2 + 10);
    this.ctx.rotate((Math.PI / 180) * -18);
    for (let i = 0; i < dim; i++) {
      const radian = perRadian * i;
      const x = Math.cos(radian) * r;
      const y = Math.sin(radian) * r;
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawDataPolygon(data) {
    const dim = this.data.length;
    const perRadian = (Math.PI * 2) / dim;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.strokeStyle = "rgba(255,0,0,0.7)";
    this.ctx.fillStyle = "rgba(255,0,0,0.3)";
    this.ctx.translate(this.width / 2, this.height / 2 + 10);
    this.ctx.rotate((Math.PI / 180) * -18);
    for (let i = 0; i < dim; i++) {
      const radian = perRadian * i;
      const x = Math.cos(radian) * data[i] * 25;
      const y = Math.sin(radian) * data[i] * 25;
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.restore();
  }
}

const graph = new Graph({
  width: 300,
  height: 300,
  backgroundColor: "black",
  max: 6,
  min: 0,
});

document.body.appendChild(graph.domElement);

graph.setData([1, 3, 4, 5, 6]);

setTimeout(() => {
  graph.updateData([4, 5, 2, 3, 1]);
}, 1000);

function rand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
