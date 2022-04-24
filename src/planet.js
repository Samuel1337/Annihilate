import { Game } from "./game";
import { Selector } from "./selector";

export class Planet {
    constructor(pos, color, id, game) {
        
        this.pos = pos;
        this.defaultColor = color;
        this.color = color;
        this.id = id;
        this.game = game;

        this.radius = 30;
        this.center = [this.pos[0]+this.radius, this.pos[1]+this.radius]; 
        
        const frameIdx = Math.floor(Math.random() * (12));
        
        this.picture = document.createElement("img");
        this.picture.src = `./src/assets/planets/planet_${frameIdx}.png`;

        this.image = new Image();
        this.image.src = `./src/assets/planets/planet_${frameIdx}.png`;
        this.frameIdx = 0;
        this.arcPos = [this.pos[0]+this.radius, this.pos[1]+this.radius];

        this.canvas = document.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");
        
        this.mouseOn = false;
        this.clicked = false;
        this.mousePos = [0,0];
        this.dx = 0;
        this.dy = 0;
        this.distance = 1000;

        this.selected = false;
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
        
        this.isMouseOn();

        if (this.selected) {
            this.highlight();
        }

        ctx.fillStyle = this.color;
        
        ctx.beginPath();
        ctx.arc(...this.arcPos,this.radius+2,0,2*Math.PI);
        ctx.closePath();
        if (this.color != "gray") {
            ctx.fill();
        }
        
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
            // gets mouse's relative position to the canvas
            
            this.dx = (this.pos[0] + this.radius) - (this.mousePos[0]);
            this.dy = (this.pos[1] + this.radius) - (this.mousePos[1]);
            this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
            // calculates radial distance between planet and mouse

            if (this.distance > this.radius) {
                // no mouse uses default color around planet
                this.mouseOn = false;
                this.color = this.defaultColor;
                this.game.mouseOnElement[this.id] = "_";
            } else {
                // mouse over! highlights planet in yellow
                this.mouseOn = true;
                this.color = "yellow";
                this.game.mouseOnElement[this.id] = this.id;
            }           
            
        });
        window.addEventListener("mousedown",(evt) => {
            
            if (this.clicked === false) {
                // prevents capturing more than 1 click

                if (this.game.mouseOnElement.every(el => { return el === "_" })) {
                    // when clicking on empty space
                    this.resetSelection();
                }
                if (this.game.mouseOnElement.includes(this.id)) {
                    // when clicking on unselected planet  
                    
                    if (this.game.selectedElements === 0) {
                        // when this is the first planet to be selected
                        this.addSelection("first");
                    } else {
                        // when this is the second planet to be selected
                        this.addSelection("second");
                        setTimeout(()=>{
                            this.resetSelection();
                        },1000);
                    }
                } else {
                    // when clicking on another planet while this one is selected  
                    if (this.selected) {
                        setTimeout(()=>{
                            this.resetSelection();
                        },1000);
                    }
                }
                this.clicked = true; // prevents capturing more than 1 click
            }
        });
        window.addEventListener("mouseup",(evt) => {
            this.clicked = false; // allows planet to be clicked on again
        });
    }
    
    addSelection(target) {
        if (target === "first") {
            this.game.selector.setFirstTarget(this.pos);
        } else {
            this.game.selector.setSecondTarget(this.pos);
        }
        this.game.selectedElements += 1;
        this.selected = true;
    }

    resetSelection() {
        this.game.selector.defaultTargets();
        this.game.selectedElements = 0;
        this.selected = false;
        this.clicked = false;
    }

    highlight() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(...this.arcPos,this.radius+5,0,2*Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
    }
}