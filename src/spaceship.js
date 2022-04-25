export class Spaceship {
    constructor(startPlanet, endPlanet, owner, velocity) {
        // basic settings
        this.startPlanet = startPlanet;
        this.endPlanet = endPlanet;
        this.pos = startPlanet.pos;
        this.startPos = startPlanet.pos;
        this.endPos = endPlanet.pos;
        this.owner = owner;
        this.velocity = velocity;
        this.game = owner.game;
        
        // arbitrary settings        
        this.radius = 20;
        this.alive = true;

        // sets spaceship center
        const x = this.pos[0] + this.radius/2;
        const y = this.pos[1] + this.radius/2;
        this.pos = [x, y];

        const endX = this.endPos[0] + this.radius/2;
        const endY = this.endPos[1] + this.radius/2;
        this.endPos = [endX, endY];


        // loads sprite
        this.image = new Image();
        if (owner.color === "red") {
            this.image.src = "./src/assets/spaceships/red_jet.png";
        } else {
            this.image.src = "./src/assets/spaceships/blue_jet.png";
        }

        // add spaceship to array of spaceships to be animated
        this.owner.game.spaceships.push(this);
    }
    
    step(ctx) {
        if (this.alive) {
            if (!this.arrived()) {
                // moves spaceship
                this.updatePos();
            this.draw(ctx);
            } else {
                this.explode();
            }
        }
    }
    
    draw(ctx) {

        // draws spaceship
        ctx.drawImage(this.image,   0, 0,   1080, 1080, ...this.pos, this.radius*2, this.radius*2);
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

    arrived() {
        let dx = Math.abs(this.endPos[0] - this.pos[0])
        let dy = Math.abs(this.endPos[1] - this.pos[1])
        if (dx < this.radius && dy < this.radius) {
            return true;
        } else {
            return false;
        }
    }
    
    explode() {
        // this.endPlanet.underAttack = true;
        if (this.endPlanet.population > 0) {
            this.endPlanet.population -= 1;
        } else {
            this.conquer();
        }
        this.alive = false;
    }

    conquer() {
        this.endPlanet.owner = this.startPlanet.owner;
        this.endPlanet.defaultColor = this.startPlanet.owner.color;
        this.endPlanet.color = this.startPlanet.owner.color;
        this.endPlanet.cap = this.startPlanet.owner.cap;
        this.endPlanet.rate = this.startPlanet.owner.rate;
    }

    isCollidedWith(otherSpaceship) {
        // checks for collision
        console.log("collision check");
        const dx = (this.pos[0] + this.radius) - (otherSpaceship.pos[0] + otherSpaceship.radius);
        const dy = (this.pos[1] + this.radius) - (otherSpaceship.pos[1] + otherSpaceship.radius);
        const distance = Math.sqrt(dx * dx + dy * dy);
    
        if (distance < this.radius + otherSpaceship.radius) {
            // collision detected!
            console.log("Collision!");
            return true;
        } else {
            // no collision
            return false;
        }
    }
}