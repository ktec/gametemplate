export class PlayState extends Phaser.State {
  create() {
    var CELL_WIDTH, CELL_HEIGHT,
        CELL_COLS, CELL_ROWS

        CELL_WIDTH = CELL_HEIGHT = 107
        CELL_COLS = CELL_ROWS = 3

    this.cells = this.game.add.group()
    this.player = 1

    this.cells.physicsBodyType = Phaser.Physics.ARCADE

    for (var i = 0; i < CELL_COLS; i++) {
      for (var j = 0; j < CELL_ROWS; j++) {
        var cell = this.cells.create(i * CELL_WIDTH, j * CELL_HEIGHT, 'cell')
        cell.frame = 0
        cell.inputEnabled = true
        cell.events.onInputDown.add(this.addPlayerMarker, this)
        this.game.physics.arcade.enable(cell)
      }
    }

    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    // this.sprite.events.onInputDown.add(this.clickListener, this)
  }

  checkGameComplete() {
    let plays_left = this.cells.filter(function(i) { return i.frame === 0 }).list
    console.log(plays_left)
    if (plays_left.length === 0) {
      this.game.state.start('gameover')
    }
  }

	update() {
	}

  addPlayerMarker(sprite, pointer) {
    console.log(this.cells)
    if(sprite.frame === 0) {
      sprite.frame = this.player
      this.player = this.player === 1 ? 2 : 1
    }
    this.checkGameComplete()
  }
}
