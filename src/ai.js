export class Ai {
    constructor(game, level=1) {
        this.color = "red";
        this.cap = 30*level;
        this.rate = 1;
        this.game = game;
        this.potentialPreys = [];
        this.potentialPredators = [];
    }
    
    decideAttack() {
        const die = this.rollDie();

        if (die % 2 === 0) {
            this.watchForPotentialPreys();
            
            switch (die) {
                case 2:
                    
                    break;
    
                case 4:
                    
                    break;
            
                case 6:
                    
                    break;
                    
                default:

                    break;
            }

        } else {
            this.watchForPotentialPredators();

            switch (die) {
                case 1:
                    
                    break;
    
                case 3:
                    
                    break;
            
                case 5:
                    
                    break;
                    
                default:

                    break;
            }
        }
    }
    
    watchForPotentialPreys() {
        const myStrongest = this.myStrongest();

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
        const myStrongest = this.myStrongest();

        this.game.playerPlanets.forEach(planet => {
            if (planet.population > myStrongest) {
                this.potentialPreys.push(planet);
            }
        });
        this.potentialPredators.forEach(planet => {
            if (planet.population < myStrongest) {
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
        return Math.floor(Math.random() * 6 + 1);
    }

    destroy(arr, target) {
        const idx = arr.indexOf(target);
        arr[idx] = arr[0];
        arr.shift();
        return arr;
    }
}