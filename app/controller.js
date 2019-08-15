class Controller {
  constructor(player, view) {
    this.player = player
    this.view = view
  }

  setUpEventListeners() {
    this.player.audio.addEventListener('loadedmetadata', () => console.log('loadedmetadata'))
    this.player.audio.addEventListener('canplay', () => console.log('canplay'))
    this.player.audio.addEventListener('canplaythrough', () => console.log('canplaythrough'))
  }
}

module.exports = Controller