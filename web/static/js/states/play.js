export class MenuState extends Phaser.State {
  preload() {
    this.game.load.image('rock', 'images/rock.png')
    this.game.load.image('paper', 'images/paper.png')
    this.game.load.image('scissors', 'images/scissors.png')
  }

  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    let rock = this.game.add.sprite(32, this.game.world.height - 150, 'rock')
    rock.scale.setTo(0.1,0.1)

    const label = this.addText("Rock Paper Scissors")
    label.anchor.setTo(0.5)
    label.inputEnabled = true
    label.input.enableDrag()
    label.events.onDragStart.add(this.dragStart, this)
    label.events.onDragStop.add(this.dragStop, this)

    // populates the cursors object with four properties: up, down, left, right
    this.cursors = this.game.input.keyboard.createCursorKeys()

    // lets enable some physics
    this.game.physics.arcade.enable([label, rock])
    label.body.immovable = true
    label.body.collideWorldBounds = true
    rock.body.gravity.y = 2500
  	rock.body.bounce.y = 0.85
  	rock.body.collideWorldBounds = true

    let background = this.game.add.sprite(0, 0)
  	background.width = 800
  	background.height = 600

  	let filter = this.game.add.filter('Fire', 800, 600)
  	filter.alpha = 0.0

  	background.filters = [filter]


    this.rock = rock
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
    if (data == null) { return }
    // console.log(`Shout received ${message}`, data)
    let { x, y } = data
    switch (message) {
      case "rock":
        if (x) { this.rock.x = x }
        if (y) { this.rock.y = y }
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
    this.game.physics.arcade.collide(this.rock, this.label)

    //  Reset the rocks velocity (movement)
    this.rock.body.velocity.x = 0;

    if (this.cursors.left.isDown)
    {
        //  Move to the left
        this.rock.body.velocity.x = -150;
    }
    else if (this.cursors.right.isDown)
    {
        //  Move to the right
        this.rock.body.velocity.x = 150;
    }

    //  Allow the rock to jump if they are touching the ground.
    if (this.cursors.up.isDown)
    {
        this.rock.body.velocity.y = -350;
    }

    if (this.rock.body.velocity.y != 0 ||
      this.rock.body.velocity.x != 0) {
      let [x, y] = [this.rock.x, this.rock.y]
      this.game.shout('rock', { x: x, y: y })
    }

  }
}
