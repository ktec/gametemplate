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
    //this.addLetter(char, pos)

    this.game.shout('addLetter', {c: char, x: pos.x, y: pos.y})
  }

  addLetter(char, pos) {
    console.log("hello", char, pos)
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
    let fadeOut = tweenPos.to({ alpha:0 }, 3200, Phaser.Easing.Linear.None)

    moveTo
      .chain(scaleBig)
      .chain(scaleToOne)
      .chain(fadeOut)

    tweenPos.onComplete.add(function () { sprite.destroy() })
    moveTo.start()
    tweenScale.start()
  }

  addText(message, style = { font: '65px Arial Black', fill: '#ffffff' }) {
    style.fill = this.generateRandomHexColour()
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

  generateRandomHexColour() {
    return '#'+('00000'+(Math.random()*16777216<<0).toString(16)).substr(-6)
  }

  onShout({message, data}) {
    console.log(`Shout received ${message}`, data)
    if (data == null) { return }
    // let { x, y } = data
    // if (x) { this.label.x = x }
    // if (y) { this.label.y = y }
    let {c, x, y} = data
    console.log(c,x,y)
    this.addLetter(c, {x: x, y: y})
  }

	update() {}
}

class Keyboard {
  constructor() {
    this.data = {
      49: ['1', '!', {x: 48, y: 265}],
      50: ['2', '@', {x: 85, y: 265}],
      51: ['3', '£', {x: 129, y: 265}],
      52: ['4', '$', {x: 175, y: 265}],
      53: ['5', '%', {x: 220, y: 265}],
      54: ['6', '^', {x: 264, y: 265}],
      55: ['7', '&', {x: 308, y: 265}],
      56: ['8', '*', {x: 347, y: 265}],
      57: ['9', '(', {x: 390, y: 265}],
      48: ['0', ')', {x: 434, y: 265}],
      189: ['-', '_', {x: 479, y: 265}],
      187: ['=', '+', {x: 535, y: 265}],

      81: ['q', 'Q', {x: 79, y: 310}],
      85: ['u', 'U', {x: 394, y: 310}],
      87: ['w', 'W', {x: 140, y: 310}],
      69: ['e', 'E', {x: 197, y: 310}],
      82: ['r', 'R', {x: 244, y: 310}],
      84: ['t', 'T', {x: 291, y: 310}],
      89: ['y', 'Y', {x: 342, y: 310}],
      73: ['i', 'I', {x: 429, y: 310}],
      79: ['o', 'O', {x: 468, y: 310}],
      80: ['p', 'P', {x: 516, y: 310}],
      219: ['[', '{', {x: 565, y: 310}],
      221: [']', '}', {x: 618, y: 310}],

      65: ['a', 'A', {x: 109, y: 365}],
      83: ['s', 'S', {x: 154, y: 365}],
      68: ['d', 'D', {x: 201, y: 365}],
      70: ['f', 'F', {x: 246, y: 365}],
      71: ['g', 'G', {x: 291, y: 365}],
      72: ['h', 'H', {x: 341, y: 365}],
      74: ['j', 'J', {x: 390, y: 365}],
      75: ['k', 'K', {x: 433, y: 365}],
      76: ['l', 'L', {x: 482, y: 365}],
      186: [';', ':', {x: 515, y: 365}],
      222: ['\'', '\"', {x: 554, y: 365}],
      220: ['\\', '|', {x: 600, y: 365}],

      192: ['`', '~', {x: 80, y: 420}],
      90: ['z', 'Z', {x: 126, y: 420}],
      88: ['x', 'X', {x: 176, y: 420}],
      67: ['c', 'C', {x: 220, y: 420}],
      86: ['v', 'V', {x: 267, y: 420}],
      66: ['b', 'B', {x: 315, y: 420}],
      78: ['n', 'N', {x: 364, y: 420}],
      77: ['m', 'M', {x: 418, y: 420}],
      188: [',', '<', {x: 478, y: 420}],
      190: ['.', '>', {x: 530, y: 420}],
      191: ['/', '?', {x: 565, y: 420}],
      // 219: ['{','['],
      // 221: ['}',']']
    }
  }
  charFromCode(code, shiftKey) {
    let char = ''
    if (code in this.data) {
      let [down, up, pos] = this.data[code]
      char = (shiftKey) ? up : down
      return [char, pos]
    } else {
      char = String.fromCharCode(code)
      console.log(code)
      return [char, {}]
    }
  }
}
