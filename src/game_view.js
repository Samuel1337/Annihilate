import { Star } from "./star";

export class GameView {
    constructor(game, ctx) {
        this.ctx = ctx;
        this.game = game;
        setInterval(()=>{
            this.drawRandomStars();
        }, 200);
    }

    render() {
        
    }

    start() {
        
    }

    drawRandomStars() {
        const options = {
            pos: "[x,y]",
            vel: "5",
            // dir: ,
            radius: "5px",
            color: "white",
            game: this.game
        };
        new Star(options);
    }
}