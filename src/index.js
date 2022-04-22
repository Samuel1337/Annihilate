const { Game } = require("./game");
const { GameView } = require("./game_view");
const { Player } = require("./player");

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.querySelector("canvas");
  console.log(canvas);
  canvas.width = window.innerWidth - 500;
  canvas.height = window.innerHeight - 200;
  const ctx = canvas.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
  new Player();
});