export class MenuState extends Phaser.State {
  create() {
    const label = this.addText('Hello World')
    label.anchor.setTo(0.5)
    label.inputEnabled = true
    label.events.onInputDown.add(this.labelClicked, this)

  }

  addText(message, style = { font: '65px Arial', fill: '#ffffff' }) {
    return this.add.text(this.world.centerX, this.world.centerY, message, style)
  }

  labelClicked() {
    console.log('You clicked!');
  }

	update() {}
}
