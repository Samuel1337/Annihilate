import { Game } from "./game";
import { Selector } from "./selector";

export class Planet {
    constructor(pos, color, id, game) {
        
        this.pos = pos;
        this.defaultColor = color;
        this.color = color;
        this.id = id;
        this.game = game;

        this.radius = 20;
        this.center = [this.pos[0]+this.radius, this.pos[1]+this.radius]; 
        
        const frameIdx = Math.floor(Math.random() * (12));
        
        this.picture = document.createElement("img");
        this.picture.src = `./src/assets/planets/planet_${frameIdx}.png`;

        this.image = new Image();
        this.image.src = `./src/assets/planets/planet_${frameIdx}.png`;
        this.frameIdx = 0;
        
        this.canvas = document.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");
        
        this.mouseOn = false;
        this.mousePos = [0,0];
        this.dx = 0;
        this.dy = 0;
        this.distance = 1000;
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
        const rect = this.canvas.getBoundingClientRect();
        window.addEventListener("pointermove",(evt) => {
            this.mousePos = [
                evt.clientX - rect.left,
                evt.clientY - rect.top
            ];
            this.dx = (this.pos[0] + this.radius) - (this.mousePos[0]);
            this.dy = (this.pos[1] + this.radius) - (this.mousePos[1]);
            this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        
            if (this.distance < this.radius) {
                // mouse on!
                this.mouseOn = true;
                this.color = "yellow";
                console.log("Mouse On!");
            } else {
                // no mouse
                this.mouseOn = false;
                this.color = this.defaultColor;
            }           
            
        });
        window.addEventListener("pointerdown",(evt) => {
            console.log(this.mouseOn);
            
            this.mousePos = [
                evt.clientX - rect.left,
                evt.clientY - rect.top
            ];
            this.dx = (this.pos[0] + this.radius) - (this.mousePos[0]);
            this.dy = (this.pos[1] + this.radius) - (this.mousePos[1]);
            this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        
            if (this.distance < this.radius) {
                // mouse on!
                console.log("Mouse Down!");
                this.game.selector.setFirstTarget(this.pos);
            } else {
                this.game.selector.defaultTargets();
            }
        });
    }
}