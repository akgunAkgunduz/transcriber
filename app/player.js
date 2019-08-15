class Player {
  constructor(audioElement) {
    this.audio = audioElement
  }

  play() {
    this.audio.play()
  }

  pause() {
    this.audio.pause()
  }
}

module.exports = Player