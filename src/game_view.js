import { Game } from "./game";
import { ImageIndex } from "./images";

export class GameView {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        
        this.backgroundMusic0 = new this.sound("./src/assets/music/background0.mp3");
        this.backgroundMusic1 = new this.sound("./src/assets/music/background1.mp3");
        this.backgroundMusic2 = new this.sound("./src/assets/music/background2.mp3");
        
        this.imageSrcs = ['YouTube.png', 'bullet.png', 'paper.jpg', 'SpaceShip.png', 'url.png'];
        this.images = [youtube, bullet, background, spaceship, url];
        this.loadCount = 0; // keep a count of images that have loaded so far

        this.frameX = 0;
        this.frameY = 0;

        this.level = 0;
        this.difficulty = 0.5;

        this.game = null;
        this.mainMenu = true;
        this.levelScreen = false;

        this.canvasCenter = [this.canvas.width/2, this.canvas.height/2];

        this.slowdown = 0;

        this.imageIndex = new ImageIndex();

        this.image = this.imageIndex.image;
        this.play = this.imageIndex.play;
        this.victoryImage = this.imageIndex.victoryImage;
        this.defeatImage = this.imageIndex.defeatImage;
        this.title = this.imageIndex.title;
        this.victoryText = this.imageIndex.victoryText;
        this.defeatText = this.imageIndex.defeatText;
    
        this.waitForClickPLay();
        this.animate();
    }

    start() {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        cancelAnimationFrame(this.animation);
        this.levelScreen = false;
        this.backgroundMusic1.play();
        this.game = new Game(this, this.canvas, this.ctx, 9, this.increaseDifficulty());
    }
    
    animate() {
        if (this.mainMenu) {
            this.drawLogo();
        }
        this.animation = requestAnimationFrame(this.animate.bind(this));
    }

    frame() {
        
        this.slowdown += 1;
        
        if (this.slowdown === 5) {
            this.frameX += 1;
            if (this.frameX >= 50) {
                this.frameX = 0;
            }
            this.slowdown = 0;
        }

        let x = 300 * this.frameX;
        let y = 300 * this.frameY;
        
        return [x,y];
    }

    drawLogo() {
        this.makeBlackBackground();

        this.ctx.shadowColor = "red";
        this.ctx.shadowBlur = 50;

        this.ctx.drawImage(
            // source image
            this.image,
            // source position
            ...this.frame(),
            // source dimension
            300, 300,
            // ctx position
            this.canvas.width/2 - 150, this.canvas.height/2 - 150,
            // ctx dimension
            300, 300);
            
            this.ctx.shadowBlur = 0;

            this.ctx.drawImage(
                // source image
                this.play,
                // source position
                0, 0,
                // source dimension
                454, 150,
                // ctx position
                this.canvas.width/2 - 227, this.canvas.height/2 - 75,
                // ctx dimension
                454, 150);
    } 

    waitForClickPLay() {
        window.addEventListener("mousedown",(evt) => {
            if (this.mainMenu) {
                if (this.mouseOnPlayButton(evt)) {
                    this.nextLevel();
                    this.mainMenu = false;
                }
            }
        });
    }

    mouseOnPlayButton(evt) {
        const rect = this.canvas.getBoundingClientRect();
            this.mousePos = [
                evt.clientX - rect.left,
                evt.clientY - rect.top
            ];
            // gets mouse's relative position to the canvas
            
            this.dx = (this.canvas.width/2) - (this.mousePos[0]);
            this.dy = (this.canvas.height/2) - (this.mousePos[1]);
            this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
            // calculates radial distance between planet and mouse

            if (this.distance > 150) {
                // no mouse. Do nothing
                return false;
            } else {
                // mouse over! Start Game
                return true;
            }
    }

    sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function(){
            this.sound.play();
        }
        this.stop = function(){
            this.sound.pause();
        }
        this.reset = function(){
            this.sound.pause();
            this.sound.currentTime = 0;
        }
    }

    increaseDifficulty() {
        this.difficulty += 0.5;
        return this.difficulty;
    }

    nextLevel() {
        this.level += 1;
        this.makeBlackBackground();
        this.ctx.fillStyle = "white";
        this.ctx.font = 'bold 18px sans-serif';
        this.ctx.textAlign = "center";
        this.ctx.fillText(`Level ${this.level}`, this.canvas.width/2, this.canvas.height/2);
        this.mainMenu = false;
        this.levelScreen = true;
        setTimeout(()=>{
            if (this.game === null) {
                this.start();
            }
        }, 2000)
    }

    returnToGameView() {
        if (this.game && this.game.gameOver) {
            this.game.destroyGame();
            this.nextLevel();
        }
    }

    returnToTheBeginning() {
        if (this.game && this.game.gameOver) {
            this.level = 0;
            this.difficulty = 0.5;
            this.game.destroyGame();
            this.backgroundMusic0.reset();
            this.backgroundMusic1.reset();
            this.backgroundMusic2.reset();
            this.mainMenu = true;
            this.waitForClickPLay();
            this.animate();
        }
    }

    victoryScreen() {
        if (this.game) {
            this.ctx.drawImage(
                // source image
            this.victoryImage,
            // source position
            0, 0,
            // source dimension
            1920, 1080,
            // ctx position
            0,0,
            // ctx dimension
            this.canvas.width, this.canvas.height);
            
            this.ctx.shadowColor = "white";
            this.ctx.shadowBlur = 15;

            this.ctx.drawImage(
            // source image
            this.victoryText,
            // source position
            0, 0,
            // source dimension
            813, 254,
            // ctx position
            (this.canvas.width/2) - (813/2), (this.canvas.height/2) - (254/2),
            // ctx dimension
            813, 254);
        }
            
        setTimeout(()=>{
            this.returnToGameView();
            return null;
        }, 3000)
    }

    defeatScreen() {
        if (this.game) {
        this.ctx.drawImage(
            // source image
            this.defeatImage,
            // source position
            0, 0,
            // source dimension
            2048, 1280,
            // ctx position
            0,0,
            // ctx dimension
            this.canvas.width, this.canvas.height+150);

        this.ctx.shadowColor = "white";
        this.ctx.shadowBlur = 15;

        this.ctx.drawImage(
            // source image
            this.defeatText,
            // source position
            0, 0,
            // source dimension
            813, 254,
            // ctx position
            (this.canvas.width/2) - (813/2), (this.canvas.height/2) - (254/2),
            // ctx dimension
            813, 254);
        }

        setTimeout(()=>{
            this.returnToTheBeginning();
            return null;
        }, 3000)
    }

    makeBlackBackground() {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}