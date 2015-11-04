export class BootState extends Phaser.State {
  preload() {
    this.load.image('preloader', 'images/preloader.gif')
    this.game.load.image('phoenix', '/images/phoenix_logo.png')
    this.game.load.image('phaser', '/images/phaser.png')
    this.game.load.image('elephant', '/images/elephant.png')
  }
  create() {
    this.game.input.maxPointers = 1
    this.game.state.start('preload')
  }
}
