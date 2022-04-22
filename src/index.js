const { Game } = require("./game");
const { GameView } = require("./game_view");
const { Planet } = require("./planet");
const { Player } = require("./player");

document.addEventListener("DOMContentLoaded", function () {
  // sets up the canvas and ctx
  const canvas = document.querySelector("canvas");
  canvas.width = window.innerWidth - 500;
  canvas.height = window.innerHeight - 200;
  console.log(canvas.width + " x " + canvas.height);
  const ctx = canvas.getContext("2d");
  
  //creates game and gameView
  console.log(ctx);
  const game = new Game(ctx, 3);
  new GameView(game, ctx).start();

  // runs render test
  // renderTest(ctx);

  // creates a planet
});

function renderTest(ctx) {
  ctx.fillStyle = "blue";
  ctx.fillRect(100, 100, 100, 100);
}