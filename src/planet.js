import { Game } from "./game";

export class Planet {
    constructor(pos, color, id) {
        
        this.pos = pos;
        this.defaultColor = color;
        this.color = color;
        this.id = id;
        this.radius = 20;
        this.center = [this.pos[0]+this.radius, this.pos[1]+this.radius]; 
        
        const frameIdx = Math.floor(Math.random() * (12));
        
        this.picture = document.createElement("img");
        this.picture.src = `./src/assets/planets/planet_${frameIdx}.png`;

        this.image = new Image();
        this.image.src = `./src/assets/planets/planet_${frameIdx}.png`;
        this.frameIdx = 0;
        
        this.canvas = document.querySelector("canvas");
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
        
        let arcPos = [this.pos[0]+this.radius, this.pos[1]+this.radius];
        
        this.isMouseOn();
        ctx.fillStyle = this.color;
        
        ctx.beginPath();
        ctx.arc(...arcPos,this.radius+2,0,2*Math.PI);
        ctx.closePath();
        ctx.fill();
        
        ctx.drawImage(this.image, this.frame(), 0, 300, 300, ...this.pos, this.radius*2, this.radius*2);
        //                            src_dim,    src_size,   ctx_pos,    ctx_dim
    }

    highlight(ctx) {
        ctx.fillStyle = "yellow";
    }

    isCollidedWith(otherPlanet) {
        console.log("collision check");
        const dx = (this.pos[0] + this.radius) - (otherPlanet.pos[0] + otherPlanet.radius);
        const dy = (this.pos[1] + this.radius) - (otherPlanet.pos[1] + otherPlanet.radius);
        const distance = Math.sqrt(dx * dx + dy * dy);
    
        if (distance < this.radius + otherPlanet.radius) {
            // collision detected!
            console.log("Collision!");
            return true;
        } else {
            // no collision
            return false;
        }
    }

    isMouseOn() {
        const mouseOn = false;
        const rect = this.canvas.getBoundingClientRect();
        window.addEventListener("pointermove",(evt) => {
            const mousePos = [
                evt.clientX - rect.left,
                evt.clientY - rect.top
            ];
            const dx = (this.pos[0] + this.radius) - (mousePos[0]);
            const dy = (this.pos[1] + this.radius) - (mousePos[1]);
            const distance = Math.sqrt(dx * dx + dy * dy);
        
            if (distance < this.radius) {
                // mouse on!
                const mouseOn = true;
                this.color = "yellow";
                console.log("Mouse On!");
                // return true;
            } else {
                // no mouse
                const mouseOn = false;
                this.color = this.defaultColor;
                // return false;
            }           
        });

        window.addEventListener("pointerdown",(evt) => {
            console.log("pointerdown");
            if (mouseOn === true) {
                console.log("Mouse Down!");
                this.color = "white";
            }
        });
    }
}