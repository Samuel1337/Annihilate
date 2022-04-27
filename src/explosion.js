export class Explosion {

    constructor(pos, game) {
        // basic settings
        this.pos = pos;
        this.game = game;

        // sets up center pos
        const x = this.pos[0]-40;
        const y = this.pos[1]-40;
        this.center = [Math.floor(Math.random() * 40 + x), Math.floor(Math.random() * 40 + y)];

        this.frameIdx = 0;

        this.image = new Image();
        this.image.src = `./src/assets/blue_explosion/img_${this.frameIdx}.png`;

        this.game.explosions.push(this);
    }
    
    frame() {
        if (this.frameIdx < 29) {
            this.frameIdx += 1;
        } else {
            this.frameIdx = 0;
            this.game.explosions.shift();
        }
    }
    
    step(ctx) {
        this.image.src = `./src/assets/blue_explosion/img_${this.frameIdx}.png`;
        ctx.drawImage(this.image, 0, 0, 400, 400, ...this.center, 100, 100);
        this.frame();
    }
}