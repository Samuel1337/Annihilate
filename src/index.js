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
  background(canvas, ctx);
  console.log(ctx);
  const game = new Game(ctx, 4);
  new GameView(game, ctx).start();
  // runs render test
  // renderTest(ctx);

  // creates a planet
});

function renderTest(ctx) {
  ctx.fillStyle = "blue";
  ctx.fillRect(100, 100, 100, 100);
}

function background(canvas, ctx) {
  canvas.style.background = `url(./src/assets/SpaceBg/Backgrounds/Blue1.png)`;
  let stars = new Image();
  stars.src = `./src/assets/SpaceBg/Backgrounds/BlueStars.png`;
  console.log(stars);
  ctx.drawImage(stars, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
}