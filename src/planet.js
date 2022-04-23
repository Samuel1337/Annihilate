import { MovingObject } from "./moving_object";

export class Planet {
    constructor(pos, color) {
        // console.log(`[${pos}] pos inside of Planet class`);
        // console.log(`[${color}] color inside of Planet class`);
        
        this.color = color;
        this.pos = pos;
        // this.owner = owner;
        // this.cap = owner.cap;
        // this.rate = owner.rate;
        
        const imageIdx = Math.floor(Math.random() * (12));
        
        this.image = new Image();
        this.image.src = `./src/assets/planets/planet_${imageIdx}.png`;
        this.frameIdx = 0;
        
        this.handleEvent();
    }
    
    frame() {
        let frame = 300*this.frameIdx;
        this.frameIdx++;
        if (this.frameIdx === 50) {
            this.frameIdx = 0;
        }
        return frame;
    }
    
    draw(ctx) {
        let arcPos = [this.pos[0]+50, this.pos[1]+50];
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(...arcPos,55,0,2*Math.PI);
        ctx.closePath();
        // ctx.fill();
        
        ctx.drawImage(this.image, this.frame(), 0, 300, 300, ...this.pos, 70, 70);
        //                             src_dim,    src_size,   ctx_pos,    ctx_dim
    }

    animate(ctx) {
        this.draw(ctx);
    }

    handleEvent() {

    }
}