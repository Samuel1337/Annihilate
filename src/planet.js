import { MovingObject } from "./moving_object";

export class Planet {
    constructor() {
        // this.owner = owner;
        // this.cap = owner.cap;
        // this.rate = owner.rate;
        
        const imageIdx = Math.floor(Math.random() * (4));

        console.log(this);
        console.log("planet gets created");

        this.image = new Image();
        this.image.src = `./src/planets/planet_${imageIdx}.png`;
        this.frameIdx = 0;
        // this.frame = this.frame();

        console.log("image gets loaded");
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
        console.log("planet gets drawn");
        console.log(ctx);
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(150,150,55,0,2*Math.PI);
        ctx.closePath();
        // ctx.fill();

        ctx.drawImage(this.image, this.frame(), 0, 300, 300, 100, 100, 100, 100);
        //                   // src_dim, src_size, ctx_pos, ctx_dim
    }

    animate(ctx) {
        this.draw(ctx);
    }
}