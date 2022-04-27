import { Game } from "./game";

export class GameView {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.frameX = 0;
        this.frameY = 0;

        this.image = new Image();
        this.image.src = "./src/assets/black_hole/galaxy.png";
        this.slowdown = 0;
        this.animate();
    }
    
    start() {
        this.game = new Game(this.canvas, this.ctx, 9);
        cancelAnimationFrame(this.animation);
    }
    
    animate() {
        // console.log(this.canvas);
        this.drawLogo();
        this.animation = requestAnimationFrame(this.animate.bind(this));    
    }

    frame() {
        
        this.slowdown += 1;
        
        if (this.slowdown === 7) {
            this.frameX += 1;
            
            if (this.frameX > 24) {
                this.frameX = 0;
                this.frameY += 1;
                
                if (this.frameY > 1) {
                    this.frameY = 0;
                }
            }
            this.slowdown = 0;
        }
        let x = 300 * this.frameX;
        let y = 300 * this.frameY;
        
        console.log(x,y);
        return [x,y];
    }

    drawLogo() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // console.log(this.image);
        // console.log(this.canvas.width/2 - 150);

        this.ctx.drawImage(
            // source image
            this.image,
            // source position
            ...this.frame(),
            // source dimension
            300, 300,
            // ctx position
            this.canvas.width/2 - 300, this.canvas.height/2 - 300,
            // ctx dimension
            600, 600);
    } 
}