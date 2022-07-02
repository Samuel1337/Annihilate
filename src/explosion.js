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

        this.image = this.game.gameView.explosion[this.frameIdx];

        this.game.explosions.push(this);
        this.game.battle = true;
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
        this.image = this.game.gameView.explosion[this.frameIdx];
        ctx.drawImage(this.image, 0, 0, 400, 400, ...this.center, 100, 100);
        this.frame();
    }
}