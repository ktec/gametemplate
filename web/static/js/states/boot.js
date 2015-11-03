export class BootState extends Phaser.State {
  preload() {
    this.load.image('preloader', 'images/preloader.gif')
  }
  create() {
    this.game.input.maxPointers = 1
    this.game.state.start('preload')
  }
}
