export class PlayState extends Phaser.State {
  preload() {
    this.game.load.image('rock', 'images/rock.png')
    this.game.load.image('paper', 'images/paper.png')
    this.game.load.image('scissors', 'images/scissors.png')
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    // synchronised label
    const label = this.addText("Rock Paper Scissors")
    label.anchor.setTo(0.5)
    label.inputEnabled = true
    label.input.enableDrag()
    label.events.onDragStart.add(this.dragStart, this)
    label.events.onDragStop.add(this.dragStop, this)

    // populates the cursors object with four properties: up, down, left, right
    this.cursors = this.game.input.keyboard.createCursorKeys()

    // create the characters
    let rock = this.game.add.sprite(32, this.game.world.height - 150, "rock")
    rock.scale.setTo(0.2)
    this.game.physics.arcade.enable([label, rock])
    rock.body.gravity.y = 2500
  	rock.body.bounce.y = 0.85
  	rock.body.collideWorldBounds = true

    let paper = this.game.add.sprite(64, this.game.world.height - 150, "paper")
    paper.scale.setTo(0.2)
    this.game.physics.arcade.enable([label, paper])
    paper.body.gravity.y = 2500
  	paper.body.bounce.y = 0.85
  	paper.body.collideWorldBounds = true

    let scissors = this.game.add.sprite(96, this.game.world.height - 150, "scissors")
    scissors.scale.setTo(0.2)
    this.game.physics.arcade.enable([label, scissors])
    scissors.body.gravity.y = 2500
  	scissors.body.bounce.y = 0.85
  	scissors.body.collideWorldBounds = true


    // lets enable some physics
    label.body.immovable = true
    label.body.collideWorldBounds = true

    let background = this.game.add.sprite(0, 0)
  	background.width = 800
  	background.height = 600

  	let filter = this.game.add.filter('Fire', 800, 600)
  	filter.alpha = 0.0

  	background.filters = [filter]

    this.characters = {
      'rock': rock,
      'paper': paper,
      'scissors': scissors
    }
    this.label = label
    this.background = background
    this.filter = filter
  }

  addText(message, style = { font: "45px Arial Black", fill: '#ffffff' }) {
    return this.add.text(this.world.centerX, this.world.centerY, message, style)
  }

  dragStart(sprite, pointer) {
    // stop physics while we drag
    sprite.body.enable = false
    this.draggedSprite = sprite
    this.timer = this.time.events.loop(10, this.onTick, this)
  }

  dragStop(sprite, pointer) {
    // start physics while we drag
    sprite.body.enable = true
    delete this.draggedSprite
    this.time.events.remove(this.timer)
  }

  // v2. ninja, cowboy, bear

  onTick() {
    if (this.draggedSprite) {
      console.log(this.draggedSprite)
      this.game.shout('label',
        {
          x: this.draggedSprite.x,
          y: this.draggedSprite.y
        }
      )
    }
  }

  onShout({message, data}) {
    console.log("onShout", message, data)
    if (data == null) { return }
    // console.log(`Shout received ${message}`, data)
    let { x, y } = data
    switch (message) {
      case "rock":
      case "paper":
      case "scissors":
        let sprite = this.characters[message]
        sprite.body.enable = false
        if (x) { sprite.x = x }
        if (y) { sprite.y = y }
        sprite.body.enable = true
        break;
      case "label":
        if (x) { this.label.x = x }
        if (y) { this.label.y = y }
        break;
      default:
        console.log(x,y)
    }
  }

  preRender() {
    // this.game.shout('Position',
    //   {
    //     // x: this.label.x,
    //     // y: this.label.y
    //   }
    // )
  }

	update() {
    // this.filter.update()
    //  Collide the rock and the stars with the platforms

    let p = this.characters[this.game.player]
    this.game.physics.arcade.collide(p, this.label)

    //  Reset the rocks velocity (movement)
    p.body.velocity.x = 0;

    if (this.cursors.left.isDown)
    {
        //  Move to the left
        p.body.velocity.x = -150;
    }
    else if (this.cursors.right.isDown)
    {
        //  Move to the right
        p.body.velocity.x = 150;
    }

    //  Allow the player to jump if they are touching the ground.
    if (this.cursors.up.isDown)
    {
        p.body.velocity.y = -350;
    }

    if (Math.abs(p.body.velocity.y) > 10 ||
      Math.abs(p.body.velocity.x) > 10) {
      this.game.shout(this.game.player, { x: p.x, y: p.y })
    }

  }
}
