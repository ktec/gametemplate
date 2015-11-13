import {MenuState} from "./states/menu"
import {Socket} from "deps/phoenix/web/static/js/phoenix"

export class Game extends Phaser.Game {

  // Initialize Phaser
  constructor(width, height, container) {
    super(width, height, Phaser.AUTO, container, null)

    // store the socket
    let socket = new Socket("/socket", {})
    socket.connect()
    let channel = socket.channel("games:lobby", {})

    channel.on("shout", ({message, data}) => {
      console.log(`Shout received ${message}`, data)
    })

    channel.join()
      .receive("ok", _ => {
        console.log("Joined successfully")
        this.shout("Hello World", [1,2,3])
      })

    this.channel = channel
    this.socket = socket

    // Game States
    this.state.add('menu', new MenuState(), false)

    // lets start
    this.state.start('menu')
  }

  shout(message, data = null) {
    this.channel.push("shout", {message: message, data: data})
  }
}
