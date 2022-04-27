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
        this.play();
    }
    
    play() {
        this.aiThinking = setInterval(()=>{
            this.decideAttack();
        }, 7000);
    }

    decideAttack() {
        const die = this.rollDie();
        this.updatePlanets();

        if (die % 2 === 0) {
            this.watchForPotentialPreys();
            
            switch (die) {
                case 2:
                    this.attackPlayer();
                break;
                    
                case 4:
                    this.attackEmpty();
                break;
            
                case 6:
                    this.wait();
                break;
                    
                default:
                    this.wait();
                break;
            }
            
        } else {
            this.watchForPotentialPredators();
            
            switch (die) {
                case 1:
                    this.reinforceAlly();
                break;
    
                case 3:
                    this.doubleAttackPlayer();
                break;
                    
                case 5:
                    this.wait();
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
    
    attackPlayer() {
        console.log("attackPlayer")
        if (this.game.playerPlanets.length > 0) {
            const playerWeakest = this.playerWeakest();
            const readyPlanets = this.game.aiPlanets.map(planet => {
                if (planet.population > playerWeakest) {
                    return planet;
                }
            });
            const baseIdx = Math.floor(Math.random() * readyPlanets.length);
            const targetIdx = Math.floor(Math.random() * this.game.playerPlanets.length);
            const basePlanet = readyPlanets[baseIdx];
            const targetPlanet = this.game.playerPlanets[targetIdx];
            if (basePlanet && targetPlanet) {
                basePlanet.attack(targetPlanet);
            }
        }
    }
    
    attackEmpty() {
        console.log("attackEmpty")
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
                basePlanet.attack(targetPlanet);
            }
        }
    }
    
    reinforceAlly() {
        console.log("reinforceAlly")
        
    }
    
    doubleAttackPlayer() {
        console.log("doubleAttack")
        const playerStrongest = this.playerStrongest();
        let batch = [];
        let sum = 0;
        this.game.aiPlanets.forEach(planet => {
            batch.push(planet);
            sum += planet.population;
            if (sum > playerStrongest.population) {
                this.commitAttack(playerStrongest, ...batch);
                return true;
            }
        });
    }
    
    commitAttack(targetPlanet,basePlanet) {
        console.log(targetPlanet);
        console.log(basePlanet);
        if (basePlanet && targetPlanet) {
            basePlanet.attack(targetPlanet);
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
        console.log(this.game.playerPlanets);
        console.log(this.game.spacePlanets);
        console.log(this.game.aiPlanets);
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
        return 4;
        return Math.floor(Math.random() * 6 + 1);
    }

    destroy(arr, target) {
        const idx = arr.indexOf(target);
        arr[idx] = arr[0];
        arr.shift();
        return arr;
    }

    wait() {}
}