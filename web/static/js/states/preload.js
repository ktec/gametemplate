export class PreloadState extends Phaser.State {
  constructor() {
    super()
    this.ready = false
  }

  preload() {
    this.asset = this.add.sprite(this.game.width/2,this.game.height/2, 'preloader')
    this.asset.anchor.setTo(0.5, 0.5)

    let animate = this.asset.animations.add('walk')
    this.asset.animations.play('walk', 5, true)

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)
    this.load.setPreloadSprite(this.asset)
    this.load.image('yeoman', 'images/phoenix.png')
    this.load.spritesheet('cell', 'images/cell.png', 107, 107)
  }

  create() {
    this.asset.cropEnabled = false
  }

	update() {
    if(!!this.ready) {
      this.game.state.start('menu')
    }
	}

  onLoadComplete() {
    this.ready = true
  }
}
