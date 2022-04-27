export class Heal {

    constructor(pos, game, planet) {
        // basic settings
        this.pos = pos;
        this.game = game;
        this.planet = planet;
        this.id = planet.id;

        // sets up center pos
        const x = this.pos[0];
        const y = this.pos[1];
        this.center = [x , y - this.planet.radius*2];

        // sets up frame speed
        this.frameX = 0;
        this.frameY = 0;
        this.slowdown = 0;

        // creates image
        this.image = new Image();
        this.image.src = `./src/assets/heal_efffect/heal.png`;

        // sends this instance to be animated by Game class
        this.game.heals.push(this);
    }
    
    frame() { // 960 x 576 - 11 frames
        
        const x = 192 * this.frameX;
        const y = 192 * this.frameY;

        this.slowdown += 1;

        if (this.slowdown === 10) {
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
            this.slowdown = 0;
        }

        return [x,y];
    }
    
    step(ctx) {
        if (this.planet.population < this.planet.cap) {
            ctx.drawImage(this.image, ...this.frame(), 192, 192, ...this.center, this.planet.radius*2, this.planet.radius*3);
            this.frame();
        } else {
            this.destroy();
        }
    }

    destroy() {
        for (let i = 0; i < this.game.heals.length; i++) {
            const heal = this.game.heals[i];
            if (heal.id === this.id) {
                this.game.heals[i] = this.game.heals[0];
                this.game.heals.shift();
            }
        }
    }
}