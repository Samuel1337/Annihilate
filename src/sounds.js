
export class SoundIndex {
    constructor() {
        this.backgroundMusic0 = new this.sound("./src/assets/music/background0.mp3");
        this.backgroundMusic1 = new this.sound("./src/assets/music/background1.mp3");
        this.backgroundMusic2 = new this.sound("./src/assets/music/background2.mp3");
        this.battleSound = new this.sound("./src/assets/music/battle.mp3");
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
}