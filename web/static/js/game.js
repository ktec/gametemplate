import {MenuState} from "./states/menu"

export class Game extends Phaser.Game {

  // Initialize Phaser
  constructor(width, height, container, socket) {
    super(width, height, Phaser.AUTO, container, null)

    // store the socket
    this.socket = socket

    // Game States
    this.state.add('menu', new MenuState(), false)

    // lets start
    this.state.start('menu')
  }

}
