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
        this.attackOn = true;
        this.launchAttack();
    }
    launchAttack() {
        let that = this;
        this.startPlanet.underAttack = true;
        // while (this.attackOn) {
        //     this.attackCycle();
        // }
        this.launch = setInterval(() => {
                if (this.startPlanet.population > 0) {
                    this.startPlanet.population -= 1;
                    this.numOfSpaceships -= 1;
                }
                
                new Spaceship(this.startPlanet, this.endPlanet, this.owner, that.getVelocity(), this);
                this.endPlanet.incomingAttackers += 1;

                if (this.numOfSpaceships <= 0) {
                    this.startPlanet.underAttack = false;
                    this.startPlanet.attackBatch = null;
                    clearInterval(this.launch);
                } else if (this.startPlanet.population <= 0) {
                    clearInterval(this.launch);
                }
        }, 350); // spacing between spaceships
        
    }

    // attackCycle() {
    //     let that = this;
    //     let count = 0;
    //     while (this.attackOn) {
    //         count += 1;
    //         if (count > 10000) {
    //             count = 0;
    //             if (this.startPlanet.population > 0) {
    //                 this.startPlanet.population -= 1;
    //                 this.numOfSpaceships -= 1;
    //             }
                
    //             new Spaceship(this.startPlanet, this.endPlanet, this.owner, that.getVelocity(), this);
    //             this.endPlanet.incomingAttackers += 1;

    //             if (this.numOfSpaceships <= 0) {
    //                 this.startPlanet.underAttack = false;
    //                 this.startPlanet.attackBatch = null;
    //                 this.attackOn = false;
    //                 return null;
    //             } else if (this.startPlanet.population <= 0) {
    //                 this.attackOn = false;
    //                 return null;
    //             }
    //         }
    //     }
    // }

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