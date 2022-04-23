import { Game } from "./game";

export class Planet {
    constructor(pos, color, id) {
        
        this.pos = pos;
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
        
        this.debut = true;



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
        
        let arcPos = [this.pos[0]+this.radius, this.pos[1]+this.radius];
        ctx.fillStyle = this.color;
        
        ctx.beginPath();
        ctx.arc(...arcPos,this.radius+2,0,2*Math.PI);
        ctx.closePath();
        ctx.fill();
        
        ctx.drawImage(this.image, this.frame(), 0, 300, 300, ...this.pos, this.radius*2, this.radius*2);
        //                            src_dim,    src_size,   ctx_pos,    ctx_dim
        // if (this.debut) {    
        //     let images = document.getElementsByTagName("img");
        //     console.log(images);
        //     this.imgTag = images[images.length-1];
        //     this.imgTag.classList.add(`planet-${this.id}`);
        //     this.debut = false;
        // }
    }

    animate(ctx) {
        
        this.draw(ctx);
    }

    handleEvent() {

    }

    isCollidedWith(otherPlanet) {
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
}