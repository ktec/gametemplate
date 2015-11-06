export class MenuState extends Phaser.State {
  create() {
    const label = this.addText('Hello World')
    label.anchor.setTo(0.5)
    this.label = label
  }

  addText(message, style = { font: '65px Arial', fill: '#ffffff' }) {
    return this.add.text(this.world.centerX, this.world.centerY, message, style)
  }

	update() {}
}
