export class Spaceship {
    constructor(startPlanet, endPlanet, owner, velocity) {
        // basic settings
        this.pos = startPlanet.pos;
        this.startPos = startPlanet.pos;
        this.endPos = endPlanet.pos;
        this.owner = owner;
        this.velocity = velocity;

        // arbitrary settings
        this.radius = 20;
        const x = this.pos[0] + this.radius;
        const y = this.pos[1] + this.radius;
        this.pos = [x, y];
        
        const endX = this.endPos[0] + this.radius;
        const endY = this.endPos[1] + this.radius;
        this.endPos = [endX, endY];


        // loads sprite
        this.image = new Image();
        if (owner.color === "red") {
            this.image.src = "./src/assets/spaceships/red_jet.png";
        } else {
            this.image.src = "./src/assets/spaceships/blue_jet.png";
        }

        // selects canvas and context
        this.canvas = document.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");

        // annihilates
        this.fire();
    }

    fire() {
        this.spaceship = setInterval(()=>{
            this.updatePos();
            this.draw();
            if (this.pos === this.endPos) {
                clearInterval(this.spaceship);
            }
        }, 1);
    }
    
    draw() {
        // draws spaceship
        this.ctx.drawImage(this.image,   0, 0,   1080, 1080, ...this.pos, this.radius*2, this.radius*2);
        //                |  src_img  | src_dim | src_size |   ctx_pos   |           ctx_dim          |
    }
        
    updatePos() {
        // updates position
        let x;
        let y;
        x = this.pos[0] + this.velocity[0]*2;
        y = this.pos[1] + this.velocity[1]*2;
        this.pos = [x,y];
    }
    
}