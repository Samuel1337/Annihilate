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
        this.space = new Space(this);
        this.player = new Player(this);
        this.ai = new Ai(this);
        
        // sets up planets
        this.planets = [];
        this.planets = this.setUpPlanets(num);
        
        // sets up spaceships
        this.spaceships = [];
        
        // handles special effects
        this.explosions = [];
        this.heals = [];

        // sets up selector
        this.selector = new Selector(canvas);
        this.currentPlanet = this.planets[0];
        this.selectedElements = 0;
        this.mouseOnElement = this.planets.map(planet => {return "_"} );
        this.clicked = false;
        // [ "_", "_", "2", "_" ] <= means that mouse is on planet 2
        // [ "0", "_", "_", "_" ] <= means that mouse is on planet 0
        
        // plays the game
        this.handleClick();
        window.requestAnimationFrame(this.animate.bind(this));
    }
    
    animate() {
        this.background(this.canvas, this.ctx);
        this.selector.draw(this.ctx);
        this.planets.forEach(planet => {
            planet.step(this.ctx);
        });
        this.spaceships.forEach(spaceship => {
            spaceship.step(this.ctx);
        });
        this.explosions.forEach(explosion => {
            explosion.step(this.ctx);
        });
        this.heals.forEach(heal => {
            heal.step(this.ctx);
        });
        // this.checkForCollision();
        window.requestAnimationFrame(this.animate.bind(this));
    }

    background(canvas, ctx) {
        // creates background image
        let background = new Image();
        background.src = `./src/assets/SpaceBg/Backgrounds/Blue1.png`;
        
        // creates stars image
        let stars = new Image();
        stars.src = `./src/assets/SpaceBg/Backgrounds/BlueStars.png`;
        
        // draws background image
        ctx.drawImage(background, 0, 0, 960, 540, 0, 0, canvas.width, canvas.height);
        
        // draws stars image
        ctx.drawImage(stars, 0, 0, 960, 540, 0, 0, canvas.width, canvas.height);
        
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

    handleClick() {
        window.addEventListener("mousedown",(evt) => {
            console.log(this.clicked);
            if (this.clicked === false) {
                // this.clicked = true;
                console.log("click");
                // prevents capturing more than 1 click
                
                if (this.mouseOnElement.every(el => { return el === "_" })) {
                    console.log("empty space");
                    // when clicking on empty space
                    this.planets.forEach(planet => { planet.resetSelection() })
                } else {
                    console.log("clicked unselected planet");
                    console.log(this.currentPlanet.selected);
                    // when clicking on unselected planet  

                    if (this.selectedElements === 0) {
                        console.log("first planet selected");
                        // when this is the first planet to be selected

                        this.currentPlanet.addSelection("first");
                    } else {
                        console.log("second planet selected");
                        // when this is the second planet to be selected

                        this.currentPlanet.addSelection("second");
                        setTimeout(()=>{
                            this.currentPlanet.resetSelection();
                        },500);
                    }
                }
                if (this.currentPlanet.selected && this.selectedElements > 1) {
                    console.log("clicked on another planet")
                    // when clicking on another planet while this one is selected  
                    setTimeout(()=>{
                        this.planets.forEach(planet => { planet.resetSelection() })
                        this.currentPlanet.resetSelection();
                    },500);
                }
                this.clicked = true; // prevents capturing more than 1 click
            }
        });
        window.addEventListener("mouseup",(evt) => {
            this.clicked = false; // allows planet to be clicked on again
        });
    }

    getPlanet() {
        const planetId = -1;
        this.mouseOnElement.forEach(planetId => {
            if (planetId != "_") {
                planetId = planetId;
            }
        }); 
        if (planetId != -1) {
            this.planets.forEach(planet => {
                if (planet.id === planetId) {
                    return planet;
                }
            });
        }
    }

    checkForCollision() {
        for (let i = 0; i < this.spaceships.length-1; i++) {
            const spaceship1 = this.spaceships[i];
            const spaceship2 = this.spaceships[i+1];
            
            if (spaceship1.owner === spaceship2.owner) {
                if (spaceship1.isCollidedWith(spaceship2)) {
                    this.destroy(spaceship1, spaceship2);
                }
            }
        }
    }

    destroy(...deadSpaceships) {
        deadSpaceships.forEach(el => {
            const idx = this.spaceships.indexOf(el);
            this.spaceships[idx] = null;
        })
        
        const arr = this.spaceships.filter(el => {
            return el !== null;
        })

        this.spaceships = arr;
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