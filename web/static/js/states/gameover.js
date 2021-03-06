export class GameOverState extends Phaser.State {
  create() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style)
    this.titleText.anchor.setTo(0.5, 0.5)

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'})
    this.congratsText.anchor.setTo(0.5, 0.5)

    this.scoreText = this.game.add.text(this.game.world.centerX, 220, 'Your Score: ' + this.game.score, { font: '25px Arial', fill: '#ffffff' })
    this.scoreText.anchor.setTo(0.5, 0.5)

    this.highscoreText = this.game.add.text(this.game.world.centerX, 240, 'Highest Score: ' + this.game.highscore, { font: '25px Arial', fill: '#ffffff' })
    this.highscoreText.anchor.setTo(0.5, 0.5)

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'})
    this.instructionText.anchor.setTo(0.5, 0.5)
  }

	update() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play')
    }
	}
}
