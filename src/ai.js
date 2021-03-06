import { Player } from "./player";
import { Space } from "./space";

export class Ai {
    constructor(game, level=1) {
        this.color = "red";
        this.cap = 30*level;
        this.rate = 1;
        this.game = game;
       
        this.potentialPreys = [];
        this.potentialPredators = [];
        this.actionQueue = [];
        
        this.play();
    }
    
    play() {
        this.aiThinking = setInterval(()=>{
            if (this.game.aiCount > 0) {
                this.decideAttack();
            }
        }, 9000);
    }

    decideAttack() {
        const die = this.rollDie();
        this.updatePlanets();
        this.watchForPotentialPreys();
        this.watchForPotentialPredators();
        
        if (!this.attackVulnerable()) {

            switch (die) {
                case 1:
                    this.attackEmpty();
                break;
                    
                case 2:
                    this.attackPlayer();
                break;
            
                case 3:
                    this.attackVulnerable();
                break;

                case 4:
                    this.reinforceAlly();
                break;

                case 5:
                    this.doubleAttackPlayer();
                break;

                default:
                    this.wait();
                break;
            }
        } 
    }
        
    watchForPotentialPreys() {
        const myStrongest = this.myStrongest();

        this.game.playerPlanets.forEach(planet => {
            if (planet.population < myStrongest.population) {
                this.potentialPreys.push(planet);
            }
        });
        this.game.spacePlanets.forEach(planet => {
            if (planet.population < myStrongest.population) {
                this.potentialPreys.push(planet);
            }
        });
        this.potentialPreys.forEach(planet => {
            if (planet.population > myStrongest.population) {
                this.potentialPreys = this.destroy(this.potentialPreys, planet);
            }
        });

    }
    
    
    watchForPotentialPredators() {
        const myStrongest = this.myStrongest();
        
        this.game.playerPlanets.forEach(planet => {
            if (planet.population > myStrongest.population) {
                this.potentialPreys.push(planet);
            }
        });
        this.potentialPredators.forEach(planet => {
            if (planet.population < myStrongest.population) {
                this.potentialPredators = this.destroy(this.potentialPredators, planet);
            }
        });
    }
    
    attackPlayer() {
        const playerWeakest = this.playerWeakest();
        const readyPlanets = this.game.aiPlanets.map(planet => {
            if (planet.population >= playerWeakest) {
                return planet;
            }
        });
        const baseIdx = Math.floor(Math.random() * readyPlanets.length);
        const targetIdx = Math.floor(Math.random() * this.game.playerPlanets.length);
        const basePlanet = readyPlanets[baseIdx];
        const targetPlanet = this.game.playerPlanets[targetIdx];
        if (basePlanet && targetPlanet) {
            if (basePlanet.population > targetPlanet.population) {
                basePlanet.attack(targetPlanet);
            }
        } 
    }
    
    attackEmpty() {
        if (this.game.spacePlanets.length > 0) {
            const readyPlanets = this.game.aiPlanets.map(planet => {
                if (planet.population > 20) {
                    return planet;
                }
            });
            const baseIdx = Math.floor(Math.random() * readyPlanets.length);
            const targetIdx = Math.floor(Math.random() * this.game.spacePlanets.length);
            const basePlanet = readyPlanets[baseIdx];
            const targetPlanet = this.game.spacePlanets[targetIdx];
            if (basePlanet && targetPlanet) {
                if (basePlanet.population > targetPlanet.population) {
                    basePlanet.attack(targetPlanet);
                }
            }
        }
    }

    attackVulnerable() {
        const baseIdx = Math.floor(Math.random() * this.game.aiPlanets.length);
        const targetIdx = Math.floor(Math.random() * this.potentialPreys.length);
        const basePlanet = this.game.aiPlanets[baseIdx];
        const targetPlanet = this.potentialPreys[targetIdx];
        if (basePlanet && targetPlanet) {
            if (basePlanet.population > targetPlanet.population) {
                basePlanet.attack(targetPlanet);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    
    reinforceAlly() {
        const myStrongest = this.myStrongest();
        const myWeakest = this.myWeakest();

        if (myStrongest != myWeakest) {
            myStrongest.attack(myWeakest);
        } else {
            this.attackVulnerable();
        }
    }
    
    doubleAttackPlayer() {
        if (this.game.aiPlanets.length > 1) {
            
            const playerStrongest = this.playerStrongest();
            const myStrongest = this.myStrongest();
            
            const myPopulations = this.game.aiPlanets.map(planet => {
                return planet.population;
            }).sort().reverse();
            
            let mySecondStrongest = myPopulations[2];
            
            if (mySecondStrongest) {
                this.game.aiPlanets.forEach(planet => {
                    if (planet.population === mySecondStrongest) {
                        mySecondStrongest = planet;
                    }
                })
                mySecondStrongest.attack(playerStrongest);
            }

            myStrongest.attack(playerStrongest);
            
        } else {
            this.attackVulnerable();
        }
    }

    updatePlanets() {
        const playerPlanets = [];
        const aiPlanets = [];
        const spacePlanets = [];
        this.game.planets.forEach(planet => {
            if (planet.owner instanceof Player) {
                playerPlanets.push(planet);
            } else if (planet.owner instanceof Space) {
                spacePlanets.push(planet);
            } else {
                aiPlanets.push(planet);
            }
        });
        this.game.playerPlanets = playerPlanets;
        this.game.spacePlanets = spacePlanets;
        this.game.aiPlanets = aiPlanets;
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

    playerStrongest() {
        let playerStrongestPlanet = this.game.playerPlanets[0];
        this.game.playerPlanets.forEach(planet => {
            if (planet.population > playerStrongestPlanet) {
                playerStrongestPlanet = planet;
            }
        });
        return playerStrongestPlanet;
    }
    
    playerWeakest() {
        let playerWeakestPlanet = this.game.playerPlanets[0];
        this.game.playerPlanets.forEach(planet => {
            if (planet.population < playerWeakestPlanet) {
                playerWeakestPlanet = planet;
            }
        });
        return playerWeakestPlanet;
    }

    rollDie() {
        return Math.floor(Math.random() * 5 + 1);
    }

    destroy(arr, target) {
        const idx = arr.indexOf(target);
        arr[idx] = arr[0];
        arr.shift();
        return arr;
    }

    wait() {}
}