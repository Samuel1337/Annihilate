export class Selector {
  constructor(canvas) {
    this.canvas = canvas;
    this.radius = 25;

    this.defaultPos = [-100,-100];
    this.firstPos = this.defaultPos;
    this.secondPos = this.defaultPos;
  }
  
  setFirstTarget(pos) {
    this.firstPos = [pos[0]+20, pos[1]+20];
  }
  
  setSecondTarget(pos) {
    this.secondPos = [pos[0]+20, pos[1]+20];
  }

  defaultTargets() {
    this.firstPos = this.defaultPos;
    this.secondPos = this.defaultPos;
  }

  draw(ctx) {
    if (this.secondPos != this.defaultPos) {
      ctx.strokeStyle = rgba(255,255,255,0.1);
      ctx.beginPath();
      ctx.moveTo(...this.firstPos);
      ctx.lineTo(...this.secondPos);
      ctx.lineWidth = 15;
      ctx.closePath();
      ctx.stroke();
    }
  }
}