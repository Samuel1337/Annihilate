import { Planet } from "./planet";

export class Game {
    constructor(ctx, num) {
        this.ctx = ctx;
        this.planets = [];
        this.planets = this.setUpPlanets(num);
        this.animate(this.ctx);
    }
    
    setUpPlanets(num) {
        let ready = false;
        let count = 0;
        while(ready === false) {
            ready = true;
            this.planets = [
                new Planet(Game.leftPos(), "turquoise", 0),
                new Planet(Game.rightPos(), "red", 1)
            ];
            let planetId = 2;
            
            for (let i = 0; i < num; i++) {
                this.planets.push(new Planet(Game.randomPos(), "gray", planetId));
                planetId += 1;
            }

            if (!this.looksNice()) {
                ready = false;
                if (count === 1000) {
                    console.log("red light!");
                    count = 0;
                    num--;
                }
                count++;
            }
        }
        console.log("green light!");
        return this.planets;
    }
    
    // looksNice() {
    //     let ready = false;
    //     for (let i = 0; i < this.planets.length-1; i++) {
    //         const firstPlanet = this.planets[i];
    //         ready = true;

    //         for (let j = i+1; j < this.planets.length; j++) {
    //             const secondPlanet = this.planets[j];
                
    //             if (firstPlanet.isCollidedWith(secondPlanet)) {
    //                 ready = false;
    //             }
    //         }
    //     }
    //     return ready;
    // }

    looksNice() {
        let xTable = [];
        let yTable = [];
        let ready = true;
        
        this.planets.forEach(planet => {
            let planet_x = planet.pos[0];
            let planet_y = planet.pos[1];
            xTable.push(planet_x);
            yTable.push(planet_y);
            
            let greater;
            let smaller;

            xTable.forEach(el => {
                if (el > planet_x){
                    greater = el;
                    smaller = planet_x;
                } else if (el < planet_x) {
                    greater = planet_x;
                    smaller = el;
                } else {
                    greater = 200;
                    smaller = 0;
                }

                if (greater - smaller < 20) {
                    console.log("x");
                    console.log(greater - smaller);
                    ready = false;
                } 
            });

            yTable.forEach(el => {
                if (el > planet_y){
                    greater = el;
                    smaller = planet_y;
                } else if (el < planet_y) {
                    greater = planet_y;
                    smaller = el;
                } else {
                    greater = 200;
                    smaller = 0;
                }
                if (greater - smaller < 20) {
                    console.log("y");                   
                    console.log(greater-smaller);
                    ready = false;
                } 
            });
        });
        return ready;
    }
    
    static randomPos() {
        let canvas = document.querySelector("canvas");
        let width = Math.random()*(canvas.width-250)+75;
        let height = Math.random()*(canvas.height-250)+75;
        let pos = [width, height];
        return pos;
    }

    static leftPos() {
        let canvas = document.querySelector("canvas");
        let width = Math.random()*(canvas.width/4)+75;
        let height = Math.random()*(canvas.height-250)+75;
        let pos = [width, height];
        return pos;
    }

    static rightPos() {
        let canvas = document.querySelector("canvas");
        let width = Math.random()*(canvas.width/4)+canvas.width*2/3-75;
        let height = Math.random()*(canvas.height-250)+75;
        let pos = [width, height];
        return pos;
    }
    //Math.random() * (max - min) + min;

    animate(ctx) {
        setInterval(()=>{
            this.planets.forEach(planet => {
                planet.animate(ctx);
            }); 
        }, 100);
    }
}