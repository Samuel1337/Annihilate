import { Game } from "./game";

export class GameView {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.frameX = 0;
        this.frameY = 0;

        this.image = new Image();
        this.image.src = "./src/assets/black_hole/black_hole.png";
        requestAnimationFrame(this.animate.bind(this));    
    }
    
    start() {
        this.game = new Game(this.canvas, this.ctx, 9);
    }

    animate() {
        console.log(this.canvas);
        this.drawLogo();
        requestAnimationFrame(this.animate.bind(this));    
    }

    frame() {
        const x = 300 * this.frameX;
        const y = 300 * this.frameY;

        this.slowdown += 1;

        if (this.slowdown === 10) {
            this.frameX += 1;
            
            if (this.frameX > 24) {
                this.frameX = 0;
                this.frameY += 1;
                
                if (this.frameY > 1) {
                    this.frameX = 0;
                    this.frameY = 0;
                }
            }
            this.slowdown = 0;
        }
        
        return [x,y];
    }

    drawLogo() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        console.log(this.image);
        console.log(...this.frame());
        console.log(this.canvas.width/2 - 150);

        this.ctx.drawImage(this.image, ...this.frame(), this.canvas.width/2 - 150, this.canvas.height/2 - 150, 300, 300);
    } 
}