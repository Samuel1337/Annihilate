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
    console.log(this.firstPos);
  }
  
  setSecondTarget(pos) {
    this.secondPos = [pos[0]+20, pos[1]+20];
  }

  defaultTargets() {
    this.firstPos = this.defaultPos;
    this.secondPos = this.defaultPos;
  }

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(...this.firstPos,this.radius,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(...this.secondPos,this.radius,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
  }
}