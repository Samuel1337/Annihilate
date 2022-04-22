import { Planet } from "./planet";

export class Game {
    constructor(ctx, num) {
        this.ctx = ctx;
        this.planets = [];
        this.planets = this.setUpPlanets(num);
        this.animate(ctx);
    }
    
    setUpPlanets(num) {
        let ready = false;
        while(ready === false) {
            ready = true;
            this.planets = [
                new Planet(this.randomPos(), "turquoise"),
                new Planet(this.randomPos(), "red")
            ];
            for (let i = 0; i < num; i++) {
                this.planets.push(new Planet(this.randomPos(), "gray"));
            }

            if (!this.looksNice()) {
                console.log("red light!");
                ready = false;
            }
        }
        return this.planets;
    }
    
    looksNice() {
        let xTable = [];
        let yTable = [];
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
                if (greater - smaller < 150) {
                    console.log(greater, smaller);
                    return false;
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
                if (greater - smaller < 150) {                   
                    return false;
                } 
            });
        });
        return true;
    }
    
    randomPos() {
        let canvas = document.querySelector("canvas");
        let width = Math.random()*(canvas.width-250)+75;
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