export class MenuState extends Phaser.State {
  preload() {
    // this.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Fire.js');
  }

  create() {
    const label = this.addText("Snow flakes")
    label.anchor.setTo(0.5)
    label.y = 150

    let background = this.game.add.sprite(0, 0)
  	background.width = 800
  	background.height = 600

    var graphics = this.game.add.graphics(100, 100)

    // set a fill and line style
    graphics.beginFill(0xFF3300)
    graphics.lineStyle(10, 0xffd900, 1)

    // draw a shape
    graphics.moveTo(50,50)
    graphics.lineTo(250, 50)
    graphics.lineTo(100, 100)
    // graphics.lineTo(250, 220)
    // graphics.lineTo(50, 220)
    // graphics.lineTo(50, 50)
    graphics.endFill()

    window.graphics = graphics;

  	let filter = this.game.add.filter("Fire", 800, 600)
  	filter.alpha = 0.0

  	background.filters = [filter]

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

}
