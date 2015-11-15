export class MenuState extends Phaser.State {
  preload() {
    // this.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Fire.js');

  }

  create() {
    const label = this.addText("Hello World")
    label.anchor.setTo(0.5)
    label.inputEnabled = true
    label.input.enableDrag()
    label.events.onDragStart.add(this.dragStart, this)
    label.events.onDragStop.add(this.dragStop, this)
    this.label = label

    let background = this.game.add.sprite(0, 0)
  	background.width = 800
  	background.height = 600

  	this.filter = this.game.add.filter('Fire', 800, 600)
  	this.filter.alpha = 0.0

  	background.filters = [this.filter]

  }

  addText(message, style = { font: "65px Arial Black", fill: '#ffffff' }) {
    return this.add.text(this.world.centerX, this.world.centerY, message, style)
  }

  dragStart(sprite, pointer) {
    this.draggedSprite = sprite
  }

  dragStop(sprite, pointer) {
    delete this.draggedSprite
  }

  onShout({message, data}) {
    if (data == null) { return }
    // console.log(`Shout received ${message}`, data)
    let { x, y } = data
    if (x) { this.label.x = x }
    if (y) { this.label.y = y }
  }

	update() {
    this.filter.update()
    if (this.draggedSprite) {
      // console.log(this.draggedSprite)
      this.game.shout('Drag started',
        {
          x: this.draggedSprite.x,
          y: this.draggedSprite.y
        }
      )
    }
  }
}
