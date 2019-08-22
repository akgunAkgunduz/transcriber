class View {
  constructor(userInterfaceElements) {
    this.elements = userInterfaceElements
  }

  enableControls() {
    this.elements.controls.forEach(control => control.disabled = false)
  }

  disableControls() {
    this.elements.controls.forEach(control => control.disabled = true)
  }

  displayPlay() {
    this.elements.playPause.querySelector('i').innerHTML = 'play_arrow'
  }

  displayPause() {
    this.elements.playPause.querySelector('i').innerHTML = 'pause'
  }
}

module.exports = View