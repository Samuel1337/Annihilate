import { Selector } from "./selector";
import { Planet } from "./planet";
import { Player } from "./player";
import { Space } from "./space";
import { Ai } from "./ai";

export class Game {
    constructor(gameView, canvas, ctx, num, level=1.5) {
        // basic settings
        this.gameView = gameView;
        this.canvas = canvas;
        this.ctx = ctx;
        
        // sets up players
        this.space = new Space(this);
        this.player = new Player(this);
        this.ai = new Ai(this,level);
        this.spacePlanets = [];
        this.playerPlanets = [];
        this.aiPlanets = [];
        this.playerCount = 0;
        this.aiCount = 0;
        
        // sets up planets
        this.planets = [];
        this.planets = this.setUpPlanets(num);
        
        // sets up spaceships
        this.spaceships = [];
        
        // handles special effects
        this.explosions = [];
        this.heals = [];
        this.starsFrameBack = 0;
        this.starsFrameFront = 0;

        // sets up selector
        this.selector = new Selector(canvas);
        this.currentPlanet = this.planets[0];
        this.selectedElements = 0;
        this.mouseOnElement = this.planets.map(planet => {return "_"} );
        this.clicked = false;
        // [ "_", "_", "2", "_" ] <= means that mouse is on planet 2
        // [ "0", "_", "_", "_" ] <= means that mouse is on planet 0
        
        this.battleSound = new this.sound("./src/assets/music/battle.mp3");
        this.battle = false;
        this.mute = false;
        this.musicIcon = new Image();
        this.musicIcon.src = "./src/assets/icon/music.png";

        // sets up clock for smooth game pace
        this.clock = setInterval(()=>this.checkGrowth(), 1000);
        this.planetsGrowth = [];

        // plays the game
        this.handleClick();
        window.requestAnimationFrame(this.animate.bind(this));
    }
    
    animate() {
        this.background(this.canvas, this.ctx);
        this.selector.draw(this.ctx);
        
        this.heals.forEach(heal => {
            heal.step(this.ctx);
        });
        this.planets.forEach(planet => {
            planet.step(this.ctx);
        });
        this.spaceships.forEach(spaceship => {
            spaceship.step(this.ctx);
        });
        this.explosions.forEach(explosion => {
            explosion.step(this.ctx);
        });
        this.checkForBattle();
        this.drawMusicIcon();
        this.checkForVictory();
        this.animation = window.requestAnimationFrame(this.animate.bind(this));
    }

    checkGrowth() {
        this.planets.forEach((planet, i) => {
            if (planet.population === this.planetsGrowth[i]) {
                console.log(this.planetsGrowth, planet.population, i)
                planet.underAttack = false;
            }
        })
        this.planetsGrowth = [];
        this.planets.forEach(planet => {
            this.planetsGrowth.push(planet.population);
        })
    }

    moveStarsBack() {
        this.starsFrameBack -= 0.1;
        if (this.starsFrameBack < -960) {
            this.starsFrameBack = 0;
        }
        return this.starsFrameBack;
    }

    moveStarsFront() {
        this.starsFrameFront -= 0.2;
        if (this.starsFrameFront < -960) {
            this.starsFrameFront = 0;
        }
        return this.starsFrameFront;
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
        ctx.drawImage(stars, this.moveStarsBack(), 0, 960, 540, 0, 0, canvas.width, canvas.height);
        
        // draws stars image
        ctx.drawImage(stars, this.moveStarsBack()+960, 0, 960, 540, 0, 0, canvas.width, canvas.height);
        
        // draws stars image
        ctx.drawImage(stars, this.moveStarsFront(), 50, 960, 540, 0, 0, canvas.width, canvas.height);
        
        // draws stars image
        ctx.drawImage(stars, this.moveStarsFront()+960, 50, 960, 540, 0, 0, canvas.width, canvas.height);
    }
    
    setUpPlanets(num) {
        let game = this;
        let ready = false;
        let count = 0;

        while(ready === false) {
            // sets up player and AI
            ready = true;
            const playerPlanet = new Planet(Game.leftPos(), this.player, 0, game);
            const aiPlanet = new Planet(Game.rightPos(), this.ai, 1, game);
            this.planets = [playerPlanet,aiPlanet];
            
            this.playerPlanets = [playerPlanet];
            this.aiPlanets = [aiPlanet];

            let planetId = 2;
            
            for (let i = 0; i < num; i++) {
                // sets up free planets
                const planet = new Planet(Game.randomPos(), this.space, planetId, game)
                this.planets.push(planet);
                this.spacePlanets.push(planet);
                planetId += 1;
            }
            
            if (!this.looksNice()) {
                // checks to see if no planets are overlapping
                ready = false;
                this.spacePlanets = [];
                this.playerPlanets = [];
                this.aiPlanets = [];

                if (count === 100) {
                    // tries 100 times before readjusting the number of planets
                    count = 0;
                    num--;
                }
                count++;
            }
        }
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
            if (this.clicked === false) {
                // prevents capturing more than 1 click
                
                if (this.mouseOnElement.every(el => { return el === "_" })) {
                    // when clicking on empty space
                    this.planets.forEach(planet => { planet.resetSelection() })
                } else {
                    // when clicking on unselected planet  

                        if (this.selectedElements === 0) {
                            // when this is the first planet to be selected
                            if (this.currentPlanet.owner instanceof Player) {
                                this.currentPlanet.addSelection("first");
                            }
                        } else {
                            // when this is the second planet to be selected
                            
                            this.currentPlanet.addSelection("second");
                            setTimeout(()=>{
                                this.currentPlanet.resetSelection();
                            },500);
                        }
                }
                if (this.currentPlanet.selected && this.selectedElements > 1) {
                    // when clicking on another planet while this one is selected  
                    setTimeout(()=>{
                        this.planets.forEach(planet => { planet.resetSelection() })
                        this.currentPlanet.resetSelection();
                    },500);
                }
                this.clicked = true; // prevents capturing more than 1 click
            }
            if (this.mouseOnMusicIcon(evt)) {
                if (this.mute) {
                    this.mute = false;
                    this.gameView.backgroundMusic1.play();
                } else {
                    this.mute = true;
                    this.battleSound.stop();
                    this.gameView.backgroundMusic1.stop();
                }
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
    
    checkForBattle() {
        if (this.battle === true) {
            if (!this.mute) {
                this.battleSound.play();
            }
        }
    }

    drawMusicIcon() {
        if (!this.mute) {
            this.ctx.shadowColor = "white";
            this.ctx.shadowBlur = 15;
        }
        this.ctx.drawImage(this.musicIcon, 0, 0, 64, 64, this.canvas.width - 64, 32, 32, 32);
        this.ctx.shadowBlur = 0;
    }

    muteMusic() {
        this.mute = true;
        this.battleSound.stop();
    }

    mouseOnMusicIcon(evt) {
        const rect = this.canvas.getBoundingClientRect();
        this.mousePos = [
            evt.clientX - rect.left,
            evt.clientY - rect.top
        ];
        // gets mouse's relative position to the canvas
        
        this.dx = (this.canvas.width - 64) - (this.mousePos[0]);
        this.dy = (32) - (this.mousePos[1]);
        this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        // calculates radial distance between planet and mouse

        if (this.distance > 32) {
            // no mouse. uses default color around planet
            return false;
        } else {
            // mouse over! highlights planet in yellow
            return true;
        }    
    }

    checkForVictory() {
        let pCount = 0;
        let aCount = 0;
        this.planets.forEach(planet => {
            if (planet.owner.color === "aqua") {
                pCount += 1;
            } else if (planet.owner.color === "red") {
                aCount += 1;
            }
        });

        this.playerCount = pCount;
        this.aiCount = aCount;


        if (this.playerCount === 0) {
            this.endingScreen("defeat");
        } else if (this.aiCount === 0) {
            this.endingScreen("victory");
        }
    }

    mouseOnNextButton(evt) {
        const rect = this.canvas.getBoundingClientRect();
        this.mousePos = [
            evt.clientX - rect.left,
            evt.clientY - rect.top
        ];
        // gets mouse's relative position to the canvas
        
        this.dx = (this.canvas.width - 64) - (this.mousePos[0]);
        this.dy = (32) - (this.mousePos[1]);
        this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        // calculates radial distance between planet and mouse

        if (this.distance > 32) {
            // no mouse. uses default color around planet
            return false;
        } else {
            // mouse over! highlights planet in yellow
            return true;
        }    
    }

    endingScreen(result) {
        setTimeout(()=>{
            if (this.playerCount === 0 || this.aiCount === 0) {    
                window.cancelAnimationFrame(this.animation);
                if (result === "victory") {
                    this.gameView.victoryScreen();
                } else {
                    this.gameView.defeatScreen();
                }
            }
        }, 5000);
    }
    
    sound(src) {
        this.soundFx = document.createElement("audio");
        this.soundFx.src = src;
        this.soundFx.setAttribute("preload", "auto");
        this.soundFx.setAttribute("controls", "none");
        this.soundFx.style.display = "none";
        this.soundFx.volume = 0.5;
        document.body.appendChild(this.soundFx);
        
        this.play = function(){
            this.soundFx.play();
        }
        this.stop = function(){
            this.soundFx.pause();
        }
    }
}