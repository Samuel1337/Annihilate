const { Game } = require("./game");
const { GameView } = require("./game_view");
const { Planet } = require("./planet");
const { Player } = require("./player");

document.addEventListener("DOMContentLoaded", function () {
  // sets up the canvas and ctx
  const canvas = document.querySelector("canvas");
  console.log(canvas);
  canvas.width = window.innerWidth - 500;
  canvas.height = window.innerHeight - 200;
  const ctx = canvas.getContext("2d");
  
  //creates game and gameView
  const game = new Game();
  new GameView(game, ctx).start();

  // runs render test
  console.log(ctx);
  // renderTest(ctx);

  // creates a planet
  const planet = new Planet();
  setInterval(()=>{
    planet.animate(ctx); 
  }, 100);
});

function renderTest(ctx) {
  ctx.fillStyle = "blue";
  ctx.fillRect(100, 100, 100, 100);
}