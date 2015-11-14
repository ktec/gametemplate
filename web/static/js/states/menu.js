export class MenuState extends Phaser.State {
  create() {
    const label = this.addText('Hello World')
    // label.events.onDragStart.add(this.dragStart, this)
    // label.events.onDragStop.add(this.dragStop, this)
    // this.label = label
    //
    this.input.keyboard.addCallbacks(this, this.onDown)
  }

  onDown(e) {
    this.addLetter(e.which)
  }

  addLetter(keyCode) {
    let sprite = this.addText(String.fromCharCode(keyCode))
    let tween = this.add.tween(sprite)
    tween.to({ alpha: 0, x: Math.random() * 500, y: 2 * keyCode }, 800, Phaser.Easing.Linear.None)
    tween.onComplete.add(function () {
      sprite.destroy()
    })
    tween.start()
  }

  addText(message, style = { font: '65px Arial Black', fill: '#ffffff' }) {
    let label = this.add.text(this.world.centerX, this.world.centerY, message, style)
    label.anchor.setTo(0.5)
    label.inputEnabled = true
    label.input.enableDrag()
    return label
  }

  // dragStart() {
  //   this.game.shout('Drag started')
  // }
  //
  // dragStop(sprite, pointer) {
  //   let data = { x: pointer.x, y: pointer.y }
  //   this.game.shout('Drag stopped', data)
  // }
  //
  // onShout({message, data}) {
  //   console.log(`Shout received ${message}`, data)
  //   if (data == null) { return }
  //   let { x, y } = data
  //   if (x) { this.label.x = x }
  //   if (y) { this.label.y = y }
  // }
  //
	update() {}
}
