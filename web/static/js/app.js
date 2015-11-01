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
    this.game.load.image('phoenix', '/images/phoenix.png')
    this.game.load.image('phaser', '/images/phaser.png')
    this.game.load.image('elephant', '/images/elephant.png')
  }

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
    this.logo.rotation -= 0.1
  }

  rotateRight() {
    this.logo.rotation += 0.1
    this.emitter.setRotation(this.logo.rotation, this.logo.rotation)
  }

  createEmitter(sprite, game) {

    let emitter = game.add.emitter(sprite.x - 40 , sprite.y - 140, 1000)
    emitter.makeParticles('elephant')
    emitter.minParticleSpeed.set(-400, 400)
    emitter.maxParticleSpeed.set(400, 400)
    emitter.setAlpha(0.3, 0.8)

    // setScale(minX, maxX, minY, maxY, rate, ease, yoyo)
    emitter.setScale(0.01, 0.1, 0.01, 0.1, 0, Phaser.Easing.Quadratic.Out, true)
    
    // emitter.gravity = -500
    // emitter.minRotation = 0
    // emitter.maxRotation = 0.5
    // Attach the emitter to the sprite
    // emitter.minParticleSpeed.setTo(-300, -300)
    // emitter.maxParticleSpeed.setTo(200, 400)
    // emitter.minParticleScale = 0.1
    // emitter.maxParticleScale = 0.5
    // emitter.bounce.setTo(0.5, 0.5)
    emitter.angularDrag = 30;

    //sprite.addChild(emitter)
    // emitter.start(false, 1000, 100)
    return emitter
  }

	update() {
    this.game.physics.arcade.collide(this.emitter)
    if (this.down_key.isDown) { this.zoomIn() }
    if (this.up_key.isDown) { this.zoomOut() }
    if (this.left_key.isDown) { this.rotateLeft() }
    if (this.right_key.isDown) { this.rotateRight() }
    if (this.space_key.isDown) { this.emitter.emitParticle() }
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
