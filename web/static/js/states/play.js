export class PlayState extends Phaser.State {
  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'phaser')
    this.logo.anchor.setTo(0.5, 0.5)
    this.up_key = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    this.down_key = this.game.input.keyboard.addKey(Phaser.Keyboard.UP)
    this.left_key = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    this.right_key = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    this.space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.emitter = this.createEmitter(this.logo, this.game)
  }

  checkGameComplete() {
  }

  zoomOut() {
    let x = this.logo.scale.x
    let y = this.logo.scale.y
    this.logo.scale.setTo(x * 0.95, y * 0.95)
  }

  zoomIn() {
    let x = this.logo.scale.x
    let y = this.logo.scale.y
    this.logo.scale.setTo(x * 1.05, y * 1.05)
  }

  rotateLeft() {
    this.logo.rotation -= 0.01
  }

  rotateRight() {
    this.logo.rotation += 0.1
  }

  createEmitter(sprite, game) {
    //let emitter = game.add.emitter(sprite.x - 40 , sprite.y - 140, 1)
    let emitter = game.add.emitter(180 , 50, 1000)
    emitter.makeParticles('phoenix')
    // emitter.minParticleSpeed.set(-4, 4)
    // emitter.maxParticleSpeed.set(4, 4)
    emitter.setAlpha(0.3, 1)
    // emitter.setScale(0.1, 0.1, 0.1, 0.1, 0, Phaser.Easing.Quadratic.Out, true)
    // emitter.lifespan = 1500
    // emitter.gravity = -50
    // emitter.minRotation = 180
    // emitter.maxRotation = 180
    emitter.minParticleScale = 0.01
    emitter.maxParticleScale = 0.09
    // Attach the emitter to the sprite
    emitter.minParticleSpeed.setTo(-300, 300)
    emitter.maxParticleSpeed.setTo(300, 300)
    // emitter.bounce.setTo(0.5, 0.5)
    // emitter.angularDrag = -180;

    emitter.rotation = -90

    sprite.addChild(emitter)
    emitter.start(false, 1000, 100)
    return emitter
  }

  update() {
    // this.rotateLeft()

    // this.emitter.rotation = -this.logo.rotation

    //this.emitter.rotate(this.logo.x, this.logo.y, 1, true)

    this.game.physics.arcade.collide(this.emitter)
    if (this.down_key.isDown) { this.zoomIn() }
    if (this.up_key.isDown) { this.zoomOut() }
    if (this.left_key.isDown) { this.rotateLeft() }
    if (this.right_key.isDown) { this.rotateRight() }
    if (this.space_key.isDown) { this.emitter.emitParticle() }
  }
}
