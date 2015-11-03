import {BootState} from "./states/boot"
import {GameOverState} from "./states/gameover"
import {MenuState} from "./states/menu"
import {PlayState} from "./states/play"
import {PreloadState} from "./states/preload"

export class Game extends Phaser.Game {

  // Initialize Phaser
  constructor(width, height, container) {
    super(width, height, Phaser.AUTO, container, null)

    // Game States
    this.state.add('boot', new BootState(), false)
    this.state.add('gameover', new GameOverState(), false)
    this.state.add('menu', new MenuState(), false)
    this.state.add('play', new PlayState(), false)
    this.state.add('preload', new PreloadState(), false)

    // Start the "boot" state
    this.state.start('boot')
  }
}
