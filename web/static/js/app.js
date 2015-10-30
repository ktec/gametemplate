// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "deps/phoenix_html/web/static/js/phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"

class PlayState extends Phaser.State {
  preload() {
    this.game.load.image('logo', '/images/phaser.png')
  }

  create() {
    var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo')
    logo.anchor.setTo(0.5, 0.5)
  }

	update() {
	}
}

class Game extends Phaser.Game {

	// Initialize Phaser
	constructor(width, height, container) {
		super(width, height, Phaser.AUTO, container, null)
    this.state.add('play', new PlayState(), false)
    // Start the "boot" state
		this.state.start('play')
  }

}

// Lets go!
new Game(700, 450, 'phaser')
