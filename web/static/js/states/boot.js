export class BootState extends Phaser.State {
  preload() {
    this.load.spritesheet('preloader', 'images/sprite-preloader.png', 220, 18, 10)
  }
  create() {
    this.game.input.maxPointers = 1
    this.game.state.start('preload')
  }
}
