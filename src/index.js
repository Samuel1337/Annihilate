const { Game } = require("./game");
const { GameView } = require("./game_view");

document.addEventListener("DOMContentLoaded", function () {
  // sets up the canvas and ctx
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  
  // resizes canvas to fit the screen
  canvas.width = window.innerWidth - 500;
  canvas.height = window.innerHeight - 200;
  
  // loads fonts
  // loadFonts();

  //creates game and gameView
  const game = new Game(canvas, ctx, 7);
  new GameView(game, ctx).start();
});

async function loadFonts() {
  const font = new FontFace('pressStart', 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
  // wait for font to be loaded
  await font.load();
  // add font to document
  document.fonts.add(font);
  // enable font with CSS class
  document.body.classList.add('fonts-loaded');
}
