import { Star } from "./star";

export class GameView {
    constructor(game, ctx) {
        this.ctx = ctx;
        this.game = game;
        setInterval(()=>{
            this.animate();
        }, 20);
    }

    animate() {
        
    }

    start() {
        
    }
}