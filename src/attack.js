import { Spaceship } from "./spaceship";

export class Attack {
    constructor(startPlanet, endPlanet) {
        this.startPlanet = startPlanet;
        this.owner = startPlanet.owner;
        this.endPlanet = endPlanet;
        this.startPos = startPlanet.center;
        this.endPos = endPlanet.center;
        this.numOfSpaceships = startPlanet.population;
        this.spaceships = [];
        this.velocity = this.getVelocity();
        this.launchAttack();
    }
    launchAttack() {
        let that = this;
        console.log("fire!")
        this.startPlanet.underAttack = true;
        this.launch = setInterval(() => {
                this.startPlanet.population -= 1;
                this.numOfSpaceships -= 1;
                
                const spaceship = new Spaceship(this.startPlanet, this.endPlanet, this.owner, that.getVelocity(), this);
                this.spaceships.push(spaceship);

                if (this.numOfSpaceships <= 1) {
                    this.startPlanet.underAttack = false;
                    this.startPlanet.attackBatch = null;
                    clearInterval(this.launch);
                } else if (this.startPlanet.population <= 0) {
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