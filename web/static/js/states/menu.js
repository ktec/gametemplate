export class MenuState extends Phaser.State {
  create() {
    const label = this.addText('Hello World')
    label.anchor.setTo(0.5)
    label.inputEnabled = true
    label.input.enableDrag()
    label.events.onDragStart.add(this.dragStart, this)
    label.events.onDragStop.add(this.dragStop, this)
    this.label = label
  }

  addText(message, style = { font: '65px Arial', fill: '#ffffff' }) {
    return this.add.text(this.world.centerX, this.world.centerY, message, style)
  }

  dragStart() {
    this.game.shout('Drag started')
  }

  dragStop(sprite, pointer) {
    let data = { x: pointer.x, y: pointer.y }
    this.game.shout('Drag stopped', data)
  }

  onShout({message, data}) {
    console.log(`Shout received ${message}`, data)
    if (data == null) { return }
    let { x, y } = data
    if (x) { this.label.x = x }
    if (y) { this.label.y = y }
  }

	update() {}
}
