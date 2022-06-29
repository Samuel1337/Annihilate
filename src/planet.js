import { Attack } from "./attack";
import { Heal } from "./heal";

export class Planet {
    constructor(pos, owner, id, game) {
        // basic planet settings
        this.pos = pos;
        this.owner = owner;
        this.id = id;
        this.game = game;
        this.defaultColor = owner.color;
        this.color = owner.color;
        
        // adjusts planet size to the window width
        if (game.canvas.height > 550) {
            this.radius = 40;
        } else {
            this.radius = 30;
        }

        // arbitrary planet settings
        this.center = [this.pos[0]+this.radius, this.pos[1]+this.radius]; 
        this.underAttack = false;
        this.planetSpeed = 5;

        // core gameplay settings
        this.population = 20;
        this.cap = owner.cap;
        this.rate = owner.rate;
        this.slowdownRate = 0;

        // random choice of planet sprite from ./assets/planets
        const imgIdx = Math.floor(Math.random() * (12));
        
        // creates planet image instance
        this.image = new Image();
        this.image.src = `./src/assets/planets/planet_${imgIdx}.png`;
        this.frameIdx = 0;
        this.slowdownFrame = 0;

        // selects canvas and context
        this.canvas = document.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");
        
        // pointer variables
        this.mouseOn = false;
        this.clicked = false;
        this.mousePos = [0,0];
        this.dx = 0;
        this.dy = 0;
        this.distance = 1000;
        
        // event handler
        this.isMouseOn();
        this.selected = false;

        // attack manager
        this.attackBatch = null;
        this.incomingAttackers = 0;
        this.wait = null;
    }
    
    step(ctx) {
        this.draw(ctx);
        if (!this.underAttack && this.population < this.cap) {
            this.growPopulation();
        }
    }
    
    draw(ctx) {
        // adds event listener that highlights the planet (hover, click)
        if (this.selected) {
            this.highlight();
        }

        // draws planet
        // if (this.color != "gray") {
        this.drawOutline(ctx);
        // }
        this.drawImage(ctx);
        
        // draws the number of fighters on the planet
        this.drawPopulation(ctx);   
    }
    
    frame() {
        // crops the sprite image into frames and iterates through them
        let frame = 300*this.frameIdx;
        this.slowdownFrame++;
        if (this.slowdownFrame === this.planetSpeed) {
            this.slowdownFrame = 0;
            this.frameIdx++;
        }
        if (this.frameIdx === 50) {
            this.frameIdx = 0;
        }
        return frame;
    }
    
    drawOutline(ctx) {
        // sets up colored outline
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(...this.center,this.radius+2,0,2*Math.PI);
        ctx.closePath();
        ctx.fill();    
        ctx.shadowBlur = 0;
    }
    
    drawImage(ctx) {
        // draws one specific frame of the sprite 
        ctx.drawImage(this.image, this.frame(), 0, 300, 300, ...this.pos, this.radius*2, this.radius*2);
        //           |  src_img  |    src_dim    | src_size |  ctx_pos   |           ctx_dim          |
    }

    drawPopulation(ctx) {
        // draws white backdrop
        ctx.strokeStyle = "white";
        ctx.font = 'bold 18px sans-serif';
        ctx.textAlign = "center";
        // ctx.textBaseline = "hanging";
        ctx.lineWidth = 3;
        ctx.strokeText(`${this.population}`, this.center[0],this.center[1]-this.radius-7);
        
        // draws black text
        ctx.fillStyle = "black";
        ctx.font = 'bold 18px sans-serif';
        ctx.textAlign = "center";
        ctx.fillText(`${this.population}`, this.center[0],this.center[1]-this.radius-7);
    }

    growPopulation() {
        this.slowdownRate += 1;
        // increments planet population to its peak
        if (this.slowdownRate >= 10) {
            this.population += this.rate;
            this.slowdownRate = 0;
        }
    }

    isCollidedWith(otherPlanet) {
        // checks for collision
        const dx = (this.pos[0] + this.radius) - (otherPlanet.pos[0] + otherPlanet.radius);
        const dy = (this.pos[1] + this.radius) - (otherPlanet.pos[1] + otherPlanet.radius);
        const distance = Math.sqrt(dx * dx + dy * dy);
    
        if (distance < this.radius + otherPlanet.radius) {
            // collision detected!
            return true;
        } else {
            // no collision
            return false;
        }
    }

    isTooCloseTo(otherPlanet) {
        // checks for proximity
        const dx = (this.pos[0] + this.radius) - (otherPlanet.pos[0] + otherPlanet.radius);
        const dy = (this.pos[1] + this.radius) - (otherPlanet.pos[1] + otherPlanet.radius);
        const distance = Math.sqrt(dx * dx + dy * dy);
    
        if (distance < this.radius + otherPlanet.radius + 50) {
            // too close!
            return true;
        } else {
            // far enough
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
            // gets mouse's relative position to the canvas
            
            this.dx = (this.pos[0] + this.radius) - (this.mousePos[0]);
            this.dy = (this.pos[1] + this.radius) - (this.mousePos[1]);
            this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
            // calculates radial distance between planet and mouse

            if (this.distance > this.radius) {
                // no mouse. uses default color around planet
                this.mouseOn = false;
                this.color = this.defaultColor;
                this.game.mouseOnElement[this.id] = "_";
            } else {
                // mouse over! highlights planet in yellow
                this.mouseOn = true;
                this.color = "yellow";
                this.game.currentPlanet = this;
                this.game.mouseOnElement[this.id] = this.id;
            }           
            
        });
    }
    
    attack(targetPlanet) {
        // clears current attack if any and begins a new one
        if (this.attackBatch instanceof Attack) {
            clearInterval(this.attackBatch.launch);
        }
        this.attackBatch = new Attack(this, targetPlanet);
    }
    
    processAttack() {
        clearTimeout(this.wait);
        if (this.underAttack === false) {
            this.underAttack = true;
        }

        if (this.incomingAttackers <= 1) {
            this.wait = setTimeout(()=>{
                this.underAttack = false;
                this.incomingAttackers = 0;
                new Heal(this.pos, this.game, this);
            }, 800)
        }
    }
    
    addSelection(target) {
        if (target === "first") {
            this.game.selector.setFirstTarget(this);
        } else {
            this.game.selector.setSecondTarget(this);
        }
        this.game.selectedElements += 1;
        this.selected = true;
    }
    
    resetSelection() {
        this.game.selector.defaultTargets();
        this.game.selectedElements = 0;
        this.selected = false;
    }

    highlight() {
        this.ctx.fillStyle = this.defaultColor;
        this.ctx.beginPath();
        this.ctx.arc(...this.center,this.radius+5,0,2*Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
    }
}