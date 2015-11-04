export class MenuState extends Phaser.State {
  create() {
    let style1 = { font: '65px Arial', fill: '#ffffff', align: 'center'}
    let style2 = { font: '16px Arial', fill: '#ffffff', align: 'center'}

    this.titleText = this.addCenteredText('Elephant Tickle', 300, style1)
    this.instructionsText = this.addCenteredText('Tickle the elephants', 400, style2)
  }

  addCenteredText(str, yPos, style) {
    let text = this.game.add.text(this.game.world.centerX, yPos, str, style)
    text.anchor.setTo(0.5, 1)
    return text
  }

	update() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play')
    }
	}
}
