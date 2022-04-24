export class Selector {
  constructor(canvas) {
    this.canvas = canvas;
    this.radius = 30;

    this.defaultPos = [-100,-100];
    this.firstPos = this.defaultPos;
    this.secondPos = this.defaultPos;
  }
  
  setFirstTarget(pos) {
    this.firstPos = [pos[0]+this.radius, pos[1]+this.radius];
  }
  
  setSecondTarget(pos) {
    this.secondPos = [pos[0]+this.radius, pos[1]+this.radius];
  }

  defaultTargets() {
    this.firstPos = this.defaultPos;
    this.secondPos = this.defaultPos;
  }

  draw(ctx) {
    if (this.secondPos != this.defaultPos) {
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.moveTo(...this.firstPos);
      ctx.lineTo(...this.secondPos);
      ctx.lineWidth = 15;
      ctx.closePath();
      ctx.stroke();
    }
  }
}