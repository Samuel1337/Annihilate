export class Pointer {
  constructor(canvas) {
    this.pos = this.getMousePos(canvas,evt);
  }

  getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    }
  }
  draw(ctx) {
    let arcPos = [this.pos.x-15, this.pos.y-15];
    ctx.fillStyle = white;
    
    ctx.beginPath();
    ctx.arc(...arcPos,15,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();    
  }
}