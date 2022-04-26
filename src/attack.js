import { Spaceship } from "./spaceship";

export class Attack {
    constructor(startPlanet, endPlanet) {
        this.startPlanet = startPlanet;
        this.endPlanet = endPlanet;
        this.startPos = startPlanet.center;
        this.endPos = endPlanet.center;

        this.velocity = this.getVelocity();
        this.launchAttack();
    }
    launchAttack() {
        let that = this;
        console.log("fire!")
        this.launch = setInterval(() => {
                this.startPlanet.underAttack = true;
                this.endPlanet.underAttack = true;
                this.startPlanet.population -= 1;
                
                new Spaceship(this.startPlanet, this.endPlanet, this.startPlanet.owner, that.getVelocity());
                
                if (this.startPlanet.population <= 0) {
                    this.startPlanet.underAttack = false;
                    this.startPlanet.attackBatch = null;
                    clearInterval(this.launch);
                }
        }, 350); // spacing between spaceships
        
    }
    getVelocity() {
        // finds the angle
        const dx = this.endPos[0] - this.startPos[0];
        const dy = this.endPos[1] - this.startPos[1];
        const angle = Math.atan2(dy, dx);
        
        // finds the velocity
        const velocity = [Math.cos(angle), Math.sin(angle)];
        return velocity;
    }
}