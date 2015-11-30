export class MenuState extends Phaser.State {
  preload() {
    // this.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Fire.js');
    this.game.load.image("rock", "images/rock.png")
    this.game.load.image("paper", "images/paper.png")
    this.game.load.image("scissors", "images/scissors.png")
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

  	let filter = this.game.add.filter("Fire", 800, 600)
  	filter.alpha = 0.0

  	background.filters = [filter]

    let state = this
    let menu = new Menu(this.game, function menuItemClick(button, pointer) {
      state.playGame(button.key)
    })
    menu.x = this.game.world.width / 2
    menu.y = this.game.world.height / 2 + 100

    this.menu = menu
    this.label = label
    this.background = background
    this.filter = filter
  }

  addText(message, style = { font: "45px Arial Black", fill: "#ffffff" }) {
    return this.add.text(this.world.centerX, this.world.centerY, message, style)
  }

  // v2. ninja, cowboy, bear
	update() {
    this.filter.update()
    // this.menu.rotation += 0.02
  }

  onShout() {}

  playGame(character) {
    this.game.player = character
    this.game.state.start("play")
  }
}

class Menu {
  constructor(game, clickHandler) {
    // here we create a group
    let group = game.add.group()

    // create the menu items
    group.add(this.createItem(game, 64, 0, "rock"))
    group.add(this.createItem(game, 256, 0, "paper"))
    group.add(this.createItem(game, 384, 0, "scissors"))

    group.pivot.setTo(group.width/2, group.height/2)

    this.clickHandler = clickHandler
    return group
  }

  createItem(game, x, y, key) {
    let button = game.make.button(x, y, key, this.onInputClick, this, 2, 1, 0)
    button.anchor.setTo(0.5)
    button.scale.setTo(0.3)
    button.onInputOver.add(this.onInputOver, this)
    button.onInputOut.add(this.onInputOut, this)
    button.onInputUp.add(this.onInputUp, this)
    return button
  }

  onInputOver(button) {
    button.scale.setTo(0.4)
  }

  onInputOut(button) {
    button.scale.setTo(0.3)
  }

  onInputUp(button) {
    button.scale.setTo(0.3)
  }

  onInputClick(button, pointer) {
    button.scale.setTo(0.2)
    // console.log("click", button.key)
    this.clickHandler(button, pointer)
  }

}
