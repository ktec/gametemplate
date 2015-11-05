export class PlayState extends Phaser.State {
  preload() {
    this.game.load.image('phaser', '/images/phaser.png')
    this.game.load.image('elephant', '/images/elephant.png')
    this.sprites = ['phaser','elephant']
  }

  create() {
    this.game.score = 0
		this.scoreLabel = this.game.add.text(40, 20, 'Score: ' + this.game.score, { font: '25px Arial', fill: '#ffffff' })
		this.timeText = this.game.add.text(40, 60, 'Time: ' + this.game.score, { font: '25px Arial', fill: '#ffffff' })
    this.timer = this.time.create(false)
    this.timer.add(10000, this.timeUp, this)
    this.setRandomCounter()
    this.timer.start()
  }

  setRandomCounter() {
    this.countdown = this.game.rnd.integerInRange(0, 100)
  }

  clockTick() {
    let ticks = 10 - Math.floor(this.timer.seconds)
    this.timeText.text = "Time: " + ticks
  }

  timeUp() {
    this.game.newScore()
    this.game.state.start('gameover')
  }

  add_sprite(key){
		let scaleFactor = 0.4
		let spriteWidth = this.game.cache.getImage(key).width * scaleFactor
		let spriteHeight = this.game.cache.getImage(key).height * scaleFactor
		let randomX = this.game.rnd.integerInRange(0, this.game.width - spriteWidth)
		let randomY = this.game.rnd.integerInRange(0, this.game.height - spriteHeight)
    let sprite = this.game.add.sprite(randomX, randomY, key)
		this.game.physics.arcade.enable(sprite)
		sprite.body.gravity.y = this.game.rnd.integerInRange(100, 1000)
		sprite.scale.set(scaleFactor)
    sprite.inputEnabled = true
		sprite.checkWorldBounds = true
		sprite.outOfBoundsKill = true
		//sprite.input.pixelPerfectOver = true
    //sprite.input.useHandCursor = true
    sprite.events.onInputDown.add(this.onClickSprite, this)
		return sprite
	}

  onClickSprite(sprite, pointer) {
    let points = sprite.key == 'elephant' ? 1 : -1
    this.addPointsToScore(points)
		sprite.destroy()
	}

  addPointsToScore(points) {
    this.game.score += points
    this.scoreLabel.text = "Score: " + this.game.score
  }

  getRandom(items) {
    if (items.length){
      return items[Math.floor(Math.random()*items.length)]
    }
  }

  update() {
    this.clockTick()
    if (this.countdown-- < 0) {
      let key = this.getRandom(this.sprites)
      let sprite = this.add_sprite(key)
      this.setRandomCounter()
    }
  }
}
