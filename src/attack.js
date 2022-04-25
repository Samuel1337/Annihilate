import { Spaceship } from "./spaceship";

export class Attack {
    constructor(startPlanet, endPlanet) {
        this.startPlanet = startPlanet;
        this.endPlanet = endPlanet;
        this.startPos = startPlanet.center;
        this.endPos = endPlanet.center;

        this.velocity = this.velocity();
        this.launchAttack();
    }
    launchAttack() {
        let attacking = true;
        console.log("fire!")
        this.launch = setInterval(() => {
            if (attacking) {
                this.startPlanet.underAttack = true;
                this.endPlanet.underAttack = true;
                this.startPlanet.population -= 1;
                
                new Spaceship(this.startPlanet, this.endPlanet, this.startPlanet.owner, this.velocity);
                
                if (this.startPlanet.population <= 0) {
                    this.startPlanet.underAttack = false;
                    this.endPlanet.underAttack = false;
                    attacking = false;
                    clearInterval(this.launch);
                }
            }
        }, 500); // spacing between spaceships
        
    }
    velocity() {
        // finds the angle
        const dx = this.endPos[0] - this.startPos[0];
        const dy = this.endPos[1] - this.startPos[1];
        const angle = Math.atan2(dy, dx);
        
        // finds the velocity
        const velocity = [Math.cos(angle), Math.sin(angle)];
        return velocity;
    }
}