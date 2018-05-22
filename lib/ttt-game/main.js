const View = require("./ttt-view.js");
const Game = require("./ttt-backend/game.js");

$l( () => {
  const grid = $l('figure.ttt');

  const game = new Game();
  const view = new View(game, grid);
  view.bindEvents();
});
