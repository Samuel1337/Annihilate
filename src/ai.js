export class Ai {
    constructor(game, level=1) {
        this.color = "red"
        this.cap = 30*level;
        this.rate = 1;
        this.game = game;
        this.potentialPreys = [];
        this.potentialPredators = [];
    }
    
    decideAttack() {
        const die = this.rollDie();


        this.watchForPotentialPreys();
        this.watchForPotentialPredators();
    }
    
    watchForPotentialPreys() {
        const myStrongest = this.myStrongest()

        this.game.playerPlanets.forEach(planet => {
            if (planet.population < myStrongest) {
                this.potentialPreys.push(planet);
            }
        });
        this.potentialPreys.forEach(planet => {
            if (planet.population > myStrongest) {
                this.potentialPreys = this.destroy(this.potentialPreys, planet);
            }
        });
    }
    
    watchForPotentialPredators() {
        this.game.playerPlanets.forEach(planet => {
            if (planet.population > this.myStrongest()) {
                this.potentialPreys.push(planet);
            }
        });
        this.potentialPredators.forEach(planet => {
            if (planet.population > myStrongest) {
                this.potentialPredators = this.destroy(this.potentialPredators, planet);
            }
        });
    }
    
    myStrongest() {
        let myStrongestPlanet = this.game.aiPlanets[0];
        this.game.aiPlanets.forEach(planet => {
            if (planet.population > myStrongestPlanet) {
                myStrongestPlanet = planet;
            }
        });
        return myStrongestPlanet;
    }
    
    myWeakest() {
        let myWeakestPlanet = this.game.aiPlanets[0];
        this.game.aiPlanets.forEach(planet => {
            if (planet.population < myWeakestPlanet) {
                myWeakestPlanet = planet;
            }
        });
        return myWeakestPlanet;
    }

    rollDie() {
        return Math.floor(Math.random()*6);
    }

    destroy(arr, target) {
        const idx = arr.indexOf(target);
        arr[idx] = arr[0];
        arr.shift();
        return arr;
    }
}