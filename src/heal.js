export class Heal {

    constructor(pos, game, planet) {
        // basic settings
        this.pos = pos;
        this.game = game;
        this.planet = planet;

        // sets up center pos
        const x = this.pos[0];
        const y = this.pos[1];
        this.center = [x - 10, y - 10];

        this.frameX = 0;
        this.frameY = 0;

        this.image = new Image();
        this.image.src = `./src/assets/heal_efffect/heal.png`;

        this.game.explosions.push(this);
    }
    
    frame() { // 960 x 576 - 11 frames
        
        const x = 96 * this.frameX;
        const y = 192 * this.frameY;

        // increments X
        if (this.frameX < 5) {
            this.frameX += 1;
        } else {
            this.frameX = 0;
            // increments Y
            if (this.frameY < 3) {
                this.frameY += 1;
            } else {
                this.frameY = 0;
            }
        }

        return [x,y];
    }
    
    step(ctx) {
        ctx.drawImage(this.image, ...this.frame(), 96, 192, ...this.pos, this.planet.radius*2, this.planet.radius*2);
        this.frame();
    }
}