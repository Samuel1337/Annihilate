export class Spaceship {
    constructor(startPlanet, endPlanet) {
        this.pos = startPlanet.pos;
        this.vel = options.vel;
        this.dir = options.dir;
        this.radius = options.radius;
        this.color = options.color;
        this.game = options.game;
    }
    draw = function draw(ctx) {
        ctx.fillStyle = this.color;
        
        ctx.beginPath();
        ctx.arc(
            this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
        );
        ctx.fill();
    };
}