export class MenuState extends Phaser.State {
  create() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};

    this.titleText = this.game.add.text(this.game.world.centerX, 300, 'Tic-Tac-Toe', style);
    this.titleText.anchor.setTo(0.5, 1);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, '1 Player', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, '2 Player', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, -2);
    console.log(this.game.input.currentPointers);
  }

	update() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
	}
}
