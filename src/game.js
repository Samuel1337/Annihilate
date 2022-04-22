import { Planet } from "./planet";

export class Game {
    constructor(ctx, num) {
        this.ctx = ctx;
        this.planets = ["a"];
        console.log(this.planets);
        this.planets = this.setUpPlanets(num);
        this.animate(ctx);
    }

    setUpPlanets(num) {

        // while(!this.looksNice(this.planets)) {

            this.planets = [
                new Planet(this.randomPos(), "turquoise"),
                new Planet(this.randomPos(), "red")
            ];
            for (let i = 0; i < num; i++) {
                this.planets.push(new Planet(this.randomPos(), "gray"));
            }
        // }
        return this.planets;
    }

    // looksNice(planets) {
    //     // console.log(planets);
    //     // planets.forEach(planet => {

    //     // });
    //     return false;
    // }

    randomPos() {
        let canvas = document.querySelector("canvas");
        let width = Math.random()*(canvas.width-250)+75;
        let height = Math.random()*(canvas.height-250)+75;
        let pos = [width, height];
        console.log(canvas.width + " x " + canvas.height + " vs " + pos);
        console.log(`[${pos}] pos inside of Game class`);
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