export class MenuState extends Phaser.State {
  create() {
    this.keyboard = new Keyboard()
    // const label = this.addText('Hello World')
    // label.events.onDragStart.add(this.dragStart, this)
    // label.events.onDragStop.add(this.dragStop, this)
    // this.label = label

    this.input.keyboard.addCallbacks(this, this.onPress)
  }

  onPress(event) {
    // console.log(event)
    // console.log(event.which)
    let [char, pos] = this.keyboard.charFromCode(event.which, event.shiftKey)
    console.log(char, pos)
    this.addLetter(char, pos)
  }

  addLetter(char, pos) {
    //this._keys[keycode] = new Phaser.Key(this.game, keycode);
    //console.log(Phaser.Keyboard[keyCode])
    let sprite = this.addText(char)
    // sprite.x = pos.x
    // sprite.y = pos.y
    let tweenPos = this.add.tween(sprite)
    let tweenScale = this.add.tween(sprite.scale)

    let moveTo = tweenPos.to(pos, 200, Phaser.Easing.Linear.None)
    let scaleBig = tweenScale.to({x:5, y:5}, 200, Phaser.Easing.Bounce.InOut)
    let scaleToOne = tweenScale.to({x: 1, y: 1}, 100, Phaser.Easing.Bounce.Out)
    // let fadeOut = tweenPos.to({ alpha:0, angle: 0 }, 3200, Phaser.Easing.Linear.None)

    moveTo
      .chain(scaleBig)
      .chain(scaleToOne)
      // .chain(fadeOut)

    // tweenPos.onComplete.add(function () { sprite.destroy() })
    //.start()
    moveTo.start()
    tweenScale.start()
  }

  addText(message, style = { font: '65px Arial Black', fill: '#ffffff' }) {
    let label = this.add.text(this.world.centerX, this.world.centerY, message, style)
    label.anchor.setTo(0.5)
    label.inputEnabled = true
    label.input.enableDrag()
    label.events.onDragStop.add(this.dragStop, this)
    return label
  }

  // dragStart() {
  //   this.game.shout('Drag started')
  // }
  //
  dragStop(sprite, pointer) {
    let data = { x: sprite.x, y: sprite.y }
    console.log(`${sprite.text.charCodeAt(0)}: ['${sprite.text.toLowerCase()}', '${sprite.text}', {x: ${data.x}, y: ${data.y}}],`)
    //this.game.shout('Drag stopped', data)
  }
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

class Keyboard {
  constructor() {
    this.data = {
      81: ['q', 'Q', {x: 79, y: 311}],
      85: ['u', 'U', {x: 394, y: 310}],
      87: ['w', 'W', {x: 140, y: 311}],
      69: ['e', 'E', {x: 197, y: 311}],
      82: ['r', 'R', {x: 244, y: 311}],
      84: ['t', 'T', {x: 291, y: 311}],
      89: ['y', 'Y', {x: 342, y: 310}],
      // 219: ['{','['],
      // 221: ['}',']']
    }
  }
  charFromCode(code, shiftKey) {
    let char = ''
    if (code in this.data) {
      let [up, down, pos] = this.data[code]
      char = (shiftKey) ? up : down
      return [char, pos]
    } else {
      char = String.fromCharCode(code)
      console.log(code)
      return [char, {}]
    }
  }
}
