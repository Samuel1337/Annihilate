const { Game } = require("./game");
const { GameView } = require("./game_view");
const { Player } = require("./player");

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementsByTagName("canvas")[0];
  const ctx = canvas.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();
  new Player();
});