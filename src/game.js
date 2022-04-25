import { Selector } from "./selector";
import { Planet } from "./planet";
import { Player } from "./player";
import { Space } from "./space";
import { Ai } from "./ai";

export class Game {
    constructor(canvas, ctx, num) {
        // basic settings
        this.canvas = canvas;
        this.ctx = ctx;
        
        // sets up players
        this.space = new Space();
        this.player = new Player();
        this.ai = new Ai();

        // sets up planets
        this.planets = [];
        this.planets = this.setUpPlanets(num);
        
        // sets up selector
        this.selector = new Selector(canvas);
        this.selectedElements = 0;
        this.mouseOnElement = this.planets.map(planet => {return "_"} );
        // [ "_", "_", "2", "_" ] <= means that mouse is on planet 2
        // [ "0", "_", "_", "_" ] <= means that mouse is on planet 0

        // plays the game
        this.animate(ctx);
    }

    animate(ctx) {
        setInterval(()=>{
            this.background(this.canvas, ctx);
            this.selector.draw(ctx);
            this.planets.forEach(planet => {
                planet.step(ctx);
            }); 
        }, 100);
    }

    background(canvas, ctx) {
        // creates background image
        let background = new Image();
        background.src = `./src/assets/SpaceBg/Backgrounds/Blue1.png`;
        
        // creates stars image
        let stars = new Image();
        stars.src = `./src/assets/SpaceBg/Backgrounds/BlueStars.png`;
        
        // draws background image
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width+200, canvas.height+200);
        
        // draws stars image
        ctx.drawImage(stars, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width+200, canvas.height+200);
        
    }
    
    setUpPlanets(num) {
        let game = this;
        let ready = false;
        let count = 0;

        while(ready === false) {
            // sets up player and AI
            ready = true;
            this.planets = [
                new Planet(Game.leftPos(), this.player, 0, game),
                new Planet(Game.rightPos(), this.ai, 1, game)
            ];
            let planetId = 2;
            
            for (let i = 0; i < num; i++) {
                // sets up free planets
                this.planets.push(new Planet(Game.randomPos(), this.space, planetId, game));
                planetId += 1;
            }
            
            if (!this.looksNice()) {
                // checks to see if no planets are overlapping
                ready = false;
                if (count === 100) {
                    // tries 100 times before readjusting the number of planets
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
    
    looksNice() {
        // checks if each planet is too close to every other planet 
        let ready = true;
        for (let i = 0; i < this.planets.length-1; i++) {
            const firstPlanet = this.planets[i];

            for (let j = i+1; j < this.planets.length; j++) {
                const secondPlanet = this.planets[j];
                
                if (firstPlanet.isTooCloseTo(secondPlanet)) {
                    ready = false;
                }
            }
        }
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
    
}