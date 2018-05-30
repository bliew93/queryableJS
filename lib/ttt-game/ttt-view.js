class View {

  constructor(game, $el) {
    this.game = game;
    let $grid = $el.HTMLElements[0];
    this.grid = $grid.append(this.setupBoard());
  }

  bindEvents() {
    $l('ul').on('click', 'li', el => {
      let $li = $l(el.target);
      if($li.attr('class') === "clicked"){
        alert("Invalid move");
      }
      else{
        this.makeMove($li);
      }

      if(this.game.isOver()){
        $l('.player-won').text(this.game.winner() + ' wins!');
      }

    });
  }

  makeMove($square) {
    const pos = {
      0: [0, 0],
      1: [0, 1],
      2: [0, 2],
      3: [1, 0],
      4: [1, 1],
      5: [1, 2],
      6: [2, 0],
      7: [2, 1],
      8: [2, 2],
    };
    $square.toggleClass("unclicked");
    $square.toggleClass("clicked");

    $square.text(this.game.currentPlayer);
    let num = $l("li").index($square);
    let $pos = pos[num];
    this.game.playMove($pos);
  }

  setupBoard() {
    let $list = $l('<ul></ul>');
    for(let i = 0; i < 9; i++){
      let $li = $l('<li class="unclicked"></li>');
      $list.append($li);
    }

    return $list;
  }
}

module.exports = View;
