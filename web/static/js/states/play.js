export class PlayState extends Phaser.State {
  preload() {
    this.load.image("rock", "images/rock.png")
    this.load.image("paper", "images/paper.png")
    this.load.image("scissors", "images/scissors.png")
  }

  create() {
    this.physics.startSystem(Phaser.Physics.ARCADE)

    this.scoreLabel = this.game.add.text(30, 30, "score: 0", { font: "18px Arial", fill: "#ffffff" });
    this.score = 0;

    // synchronised label
    const label = this.addText("Rock Paper Scissors")
    label.anchor.setTo(0.5)
    this.makeDraggable(label)

    // populates the cursor object with four properties: up, down, left, right
    this.cursor = this.input.keyboard.createCursorKeys()

    // create the characters
    let rock = this.createSprite("rock", 32, this.world.height - 150)
    let paper = this.createSprite("paper", 128, this.world.height - 150)
    let scissors = this.createSprite("scissors", 256, this.world.height - 150)

    // lets enable some physics
    this.physics.arcade.enable(label)
    label.body.immovable = true
    label.body.collideWorldBounds = true

    this.characters = {
      "rock": { player: rock, enemy: paper, food: scissors },
      "paper": { player: paper, enemy: scissors, food: rock },
      "scissors": { player: scissors, enemy: rock, food: paper }
    }

    this.sprites = [rock, paper, scissors]
    this.sprites.forEach((e) => {
      console.log(e)
    })
    this.label = label

    this.time.events.loop(50, this.sendUpdate, this);

    // let background = this.add.sprite(0, 0)
  	// background.width = 800
  	// background.height = 600
  	// let filter = this.add.filter('Fire', 800, 600)
  	// filter.alpha = 0.0
  	// background.filters = [filter]
    // this.background = background
    // this.filter = filter
  }

  sendUpdate() {
    let player = this.getPlayer()
    let g = this.game
    let absY = Math.abs(player.body.velocity.y)
    let absX = Math.abs(player.body.velocity.x)
    // console.log('sendUpdate', player.body.velocity)
    if (absX > 1 || absY > 1) {
      g.shout("position", { c: g.player, x: player.x, y: player.y })
    }
  }

  addText(message, style = { font: "45px Arial Black", fill: "#ffffff" }) {
    return this.add.text(this.world.centerX, this.world.centerY, message, style)
  }

  makeDraggable(sprite) {
    sprite.inputEnabled = true
    sprite.input.enableDrag()
    sprite.events.onDragStart.add(this.dragStart, this)
    sprite.events.onDragStop.add(this.dragStop, this)
  }

  dragStart(sprite, pointer) {
    // stop physics while we drag
    // sprite.body.enable = false
    this.draggedSprite = sprite
    this.timer = this.time.events.loop(10, this.onTick, this)
  }

  dragStop(sprite, pointer) {
    // start physics while we drag
    // sprite.body.enable = true
    delete this.draggedSprite
    this.time.events.remove(this.timer)
  }

  createSprite(key, x, y) {
    let sprite = this.add.sprite(x, y, key)
    sprite.scale.setTo(0.1)
    this.physics.arcade.enable(sprite)
    sprite.body.gravity.y = 500
  	sprite.body.bounce.y = 0.1
  	sprite.body.collideWorldBounds = true
    return sprite
  }

  resetSprite(sprite) {
    sprite.x = 32
    sprite.y = this.world.height - 150
  }

  // v2. ninja, cowboy, bear
  onTick() {
    if (this.draggedSprite) {
      // console.log(this.draggedSprite)
      this.game.shout("label",
        {
          x: this.draggedSprite.x,
          y: this.draggedSprite.y
        }
      )
    }
  }

  onShout({message, data}) {
    var d = new Date()
    console.log("onShout", d.getTime(), message, data)
    if (data == null) { return }
    // console.log(`Shout received ${message}`, data)
    switch(message) {
      case "kill":
        this.onKill(data)
        break
      case "position":
        this.onPosition(data)
        break
      default:
        // console.log(x,y)
    }
  }

  onKill( {c} ) {
    // console.log("kill ", c)
    let sprite = this.getCharacters(c).player
    //sprite.kill()
    this.resetSprite(sprite)
  }

  onPosition( {c,x,y} ) {
    switch(c) {
      case "rock":
      case "paper":
      case "scissors":
        let sprite = this.getCharacters(c).player
        this.positionSprite(sprite, {c,x,y})
        break
      case "label":
        if (x) { this.label.x = x }
        if (y) { this.label.y = y }
        break
    }
  }

  positionSprite(sprite, {x,y}) {
    sprite.body.enable = false
    if (x) { sprite.x = x }
    if (y) { sprite.y = y }
    sprite.body.enable = true
  }

  moveSprite(sprite) {
    if (this.cursor.left.isDown) {
      sprite.body.velocity.x = -200
    } else if (this.cursor.right.isDown) {
      sprite.body.velocity.x = 200
    } else {
      sprite.body.velocity.x = 0
    }
    if (this.cursor.up.isDown) { // && sprite.body.touching.down) {
  		sprite.body.velocity.y = -320
  	}
  }

  getCharacters(key) {
    return this.characters[key]
  }

  getOtherCharacters(key) {
    let list = Array.from(this.characters)
                    .forEach((k, v) => { console.log("keith",k) })
    return list
  }

  getPlayer() {
    return this.getCharacters(this.game.player).player
  }

  preRender() {
  }

	update() {
    // this.filter.update()
    let {player, enemy, food} = this.getCharacters(this.game.player)
    if (player) {
      //  Collide the rock and the stars with the platforms
      this.physics.arcade.collide(player, this.label)
      this.physics.arcade.overlap(player, enemy, this.playerDie, null, this)
      this.physics.arcade.overlap(player, food, this.eatFood, null, this)

      this.moveSprite(player)

      this.scoreLabel.text = `Score: ${this.score}`
    }
  }

  playerDie(player, enemy) {
    console.log("Player Dies")
    this.score = this.score - 1
    let g = this.game
    g.shout("kill", { c: player.key })
    this.resetSprite(player)
  }

  eatFood(player, food) {
    this.score = this.score + 1
    // console.log('Player Eat Food', arguments)
    let g = this.game
    g.shout("kill", { c: food.key })
    this.resetSprite(food)
  }
}
