const { Game } = require("./game");
const { GameView } = require("./game_view");

document.addEventListener("DOMContentLoaded", function () {
  // sets up the canvas and ctx
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  
  // resizes canvas to fit the screen
  canvas.width = window.innerWidth - 500;
  canvas.height = window.innerHeight - 200;
  
  // plays the game
  new GameView(canvas, ctx)
});
