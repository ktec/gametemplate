export class MenuState extends Phaser.State {
  preload() {
    // this.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Fire.js');
    this.game.load.image('rock', 'images/rock.png')
    this.game.load.image('paper', 'images/paper.png')
    this.game.load.image('scissors', 'images/scissors.png')
  }

  create() {
    const label = this.addText("Rock Paper Scissors")
    label.anchor.setTo(0.5)
    label.y = 150

    const label2 = this.addText("Select your player")
    label2.y = label.y + 50
    label2.anchor.setTo(0.5)

    let background = this.game.add.sprite(0, 0)
  	background.width = 800
  	background.height = 600

  	let filter = this.game.add.filter('Fire', 800, 600)
  	filter.alpha = 0.0

  	background.filters = [filter]

    let space = 20

    let rock = this.game.add.sprite(32, this.game.world.height - 150, 'rock')
    rock.scale.setTo(0.3)

    let nextX = rock.x + rock.width + space

    let paper = this.game.add.sprite(nextX, this.game.world.height - 150, 'paper')
    paper.scale.setTo(0.3)

    nextX = paper.x + paper.width + space

    let scissors = this.game.add.sprite(nextX, this.game.world.height - 150, 'scissors')
    scissors.scale.setTo(0.3)

    menu = game.add.group();

    this.label = label
    this.background = background
    this.filter = filter
  }

  addText(message, style = { font: "45px Arial Black", fill: '#ffffff' }) {
    return this.add.text(this.world.centerX, this.world.centerY, message, style)
  }

  // v2. ninja, cowboy, bear

	update() {
    this.filter.update()
  }
}
