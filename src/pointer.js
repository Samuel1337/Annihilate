export class Pointer {
  constructor(canvas) {
    this.pos = [0,0];
    this.canvas = canvas;
    this.radius = 15;
  }
  
  draw(ctx) {
    let rect = this.canvas.getBoundingClientRect();
    window.addEventListener("pointermove",(evt) => {
      this.pos = [
        evt.clientX - rect.left,
        evt.clientY - rect.top
      ];
      let arcPos = [this.pos[0], this.pos[1]];
      ctx.fillStyle = "white";
      
      ctx.beginPath();
      ctx.arc(...arcPos,this.radius,0,2*Math.PI);
      ctx.closePath();
      ctx.fill();    
    })
  }
}