const path = require('path')

class Player {
  constructor(audioElement) {
    this.audio = audioElement
  }

  get src() {
    return this.audio.src
  }

  play() {
    this.audio.play()
  }

  pause() {
    this.audio.pause()
  }
}

module.exports = Player