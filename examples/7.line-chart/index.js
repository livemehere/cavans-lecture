class LineChart {
  constructor(props) {
    this.width = props.width;
    this.height = props.height;
    this.dpr = window.devicePixelRatio > 1 ? 2 : 1;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.xValues = props.xValues;
    this.yValues = props.yValues;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
    this.canvas.style.width = this.width + "px";
    this.canvas.style.height = this.height + "px";
    this.padding = 20;

    this.data = [];
    this.animate();
  }

  get domElement() {
    return this.canvas;
  }

  setData(data) {
    this.data = data;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawAxesY();
    this.drawAxesX();
    this.drawLine();
  }

  drawAxesY() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "black";
    this.ctx.moveTo(this.padding, this.padding);
    this.ctx.lineTo(this.padding, this.height - this.padding);
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  drawAxesX() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = "black";
    this.ctx.moveTo(this.padding, this.height - this.padding);
    this.ctx.lineTo(this.width - this.padding, this.height - this.padding);
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  drawLine() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.strokeStyle = "red";
    let arr = [];
    for (let i = 0; i < this.data.length; i++) {
      const value = this.data[i];
      const x = (this.width / this.xValues.length) * i + this.padding;
      const y =
        this.height -
        (this.height / this.yValues[this.yValues.length - 1]) * value; //
      arr.push({ x, y });
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        const { x: prevX, y: prevY } = arr[i - 1];
        const diffX = x - prevX;
        const diffY = y - prevY;
        const cp1 = { x: prevX + diffX * 0.4, y: prevY };
        const cp2 = { x: x - diffX * 0.4, y: y };

        // this.ctx.save();
        // this.ctx.beginPath();
        // this.ctx.fillStyle = "blue";
        // this.ctx.arc(cp1.x, cp1.y, 2, 0, Math.PI * 2);
        // this.ctx.fill();
        // this.ctx.restore();
        //
        // this.ctx.save();
        // this.ctx.beginPath();
        // this.ctx.fillStyle = "purple";
        // this.ctx.arc(cp2.x, cp2.y, 2, 0, Math.PI * 2);
        // this.ctx.fill();
        // this.ctx.restore();
        //
        // this.ctx.save();
        // this.ctx.beginPath();
        // this.ctx.fillStyle = "pink";
        // this.ctx.arc(x, y, 4, 0, Math.PI * 2);
        // this.ctx.fill();
        // this.ctx.restore();

        this.ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, x, y);
      }
    }
    this.ctx.stroke();
    this.ctx.restore();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.draw();
  }
}

const chart = new LineChart({
  width: 500,
  height: 300,
  xValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  yValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
});

document.body.appendChild(chart.domElement);

chart.setData([8, 4, 7, 2, 3, 2, 5, 10]);
