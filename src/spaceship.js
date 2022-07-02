import { Explosion } from "./explosion";
import { Heal } from "./heal";

export class Spaceship {
    constructor(startPlanet, endPlanet, owner, velocity, attackBatch) {
        // basic settings
        this.startPlanet = startPlanet;
        this.endPlanet = endPlanet;
        this.startPos = startPlanet.pos;
        this.endPos = endPlanet.pos;
        this.pos = startPlanet.pos;
        this.owner = owner;
        this.velocity = velocity;
        this.attackBatch = attackBatch;
        this.game = owner.game;

        // arbitrary settings        
        this.radius = 20;
        this.alive = true;

        // sets spaceship center
        const x = this.pos[0] + this.startPlanet.radius - this.radius;
        const y = this.pos[1] + this.startPlanet.radius - this.radius;
        this.pos = [x, y];

        const endX = this.endPos[0] + this.startPlanet.radius - this.radius;
        const endY = this.endPos[1] + this.startPlanet.radius - this.radius;
        this.endPos = [endX, endY];

        // loads sprite
        this.image;
        if (owner.color === "red") {
            this.image = this.startPlanet.game.gameView.imageIndex.redJet;
        } else {
            this.image = this.startPlanet.game.gameView.imageIndex.blueJet;
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
                this.hitPlanet();
            }
        }
    }
    
    draw(ctx) {

        // draws spaceship
        ctx.drawImage(this.image,   0, 0,   1080, 1080, ...this.pos, this.radius*2, this.radius*2);
        //           |  src_img  | src_dim | src_size |   ctx_pos   |           ctx_dim          |
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
    
    hitPlanet() {
        if (this.endPlanet.owner === this.owner) {
            this.endPlanet.population += 1;
            this.endPlanet.incomingAttackers -= 1;
            this.endPlanet.processAttack();
        } else {
            if (this.endPlanet.population > 0) {
                this.endPlanet.population -= 1;
            }
            this.endPlanet.incomingAttackers -= 1;
            
            new Explosion(this.pos, this.game);
            this.endPlanet.processAttack();
            
            if (this.endPlanet.population <= 0) {
                this.conquer();
            }
        }
        this.alive = false;
    }

    conquer() {
        this.endPlanet.owner = this.owner;
        this.endPlanet.defaultColor = this.owner.color;
        this.endPlanet.color = this.owner.color;
        this.endPlanet.cap = this.owner.cap;
        this.endPlanet.rate = this.owner.rate;
        this.attackBatch = null;
        if (this.endPlanet.incomingAttackers <= 1) {
            this.endPlanet.underAttack = false;
        }
    }

    isCollidedWith(otherSpaceship) {
        // checks for collision
        const dx = (this.pos[0]) - (otherSpaceship.pos[0]);
        const dy = (this.pos[1]) - (otherSpaceship.pos[1]);
        const distance = Math.sqrt(dx * dx + dy * dy);
    
        if (distance < this.radius + otherSpaceship.radius) {
            // collision detected!
            return true;
        } else {
            // no collision
            return false;
        }
    }
}