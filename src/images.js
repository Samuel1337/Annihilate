
export class ImageIndex {
    constructor() {
        this.image = new Image();               this.image.src = "./src/assets/black_hole/intro_planet.png";
        this.play = new Image();                this.play.src = "./src/assets/texts/play.png";
        this.victoryImage = new Image();        this.victoryImage.src = "./src/assets/screens/victory.jpg";
        this.defeatImage = new Image();         this.defeatImage.src = "./src/assets/screens/defeat.jpeg";
        this.title = new Image();               this.title.src = "./src/assets/texts/title_white.png";
        this.victoryText = new Image();         this.victoryText.src = "./src/assets/texts/victory_red.png";
        this.defeatText = new Image();          this.defeatText.src = "./src/assets/texts/defeat_red.png";
        this.heal = new Image();                this.heal.src = "./src/assets/heal_efffect/heal.png";
        this.redJet = new Image();              this.redJet.src = "./src/assets/spaceships/red_jet.png";
        this.blueJet = new Image();             this.blueJet.src = "./src/assets/spaceships/blue_jet.png";
        this.background = new Image();          this.background.src = `./src/assets/SpaceBg/Backgrounds/Blue1.png`;
        this.stars = new Image();               this.stars.src = `./src/assets/SpaceBg/Backgrounds/BlueStars.png`;
        this.musicIcon = new Image();           this.musicIcon.src = "./src/assets/icon/music.png";

        this.planet = [];
        this.makePlanets();

        this.explosion = [];
        this.makeExplosion();
    }

    makePlanets() {
        for (let i = 0; i < 12; i++) {       
            let planetType = new Image();
            planetType.src = `./src/assets/planets/planet_${i}.png`;
            this.planet.push(planetType);
        }
    }
    
    makeExplosion() {
        for (let i = 0; i < 30; i++) {
            let explosionFrame = new Image();
            explosionFrame.src = `./src/assets/blue_explosion/img_${i}.png`;
            this.explosion.push(explosionFrame);
        }
    }
}