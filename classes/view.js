const { generateDurationText, generatePositionText } = require('../utils/helpers')

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

  displayErrorMessage(errorCode) {
    switch (errorCode) {
      case 3:
        this.elements.fileDiv.querySelector('span').innerText = 'Error: Decoding error.'
        break
      case 4:
        this.elements.fileDiv.querySelector('span').innerText = 'Error: File/Media type not supported.'
        break
      default:
        this.elements.fileDiv.querySelector('span').innerText = 'Error: An unexpected error ocurred.'
    }
  }

  resetProgressAndPosition() {
    this.elements.songLength.textContent = ''
    this.elements.songPosition.textContent = ''  
    this.elements.progressAndPosition.style.gridTemplateColumns = '0px 1fr 0px'
    this.elements.progressAndPosition.style.gridColumnGap = '0px'
  }

  adaptProgressAndPositionToDuration(duration) {
    if ( duration < 3600) {
      this.elements.progressAndPosition.style.gridTemplateColumns = '40px 1fr 40px'
    } else {
      this.elements.progressAndPosition.style.gridTemplateColumns = '60px 1fr 60px'
    }
    this.elements.progressAndPosition.style.gridColumnGap = '4px'
  }

  setProgressBarValue(newValue) {
    this.elements.progress.value = newValue
  }

  setProgressBarMaxValue(newMax) {
    this.elements.progress.max = newMax
  }

  setSongPosition(position, duration) {
    this.elements.songPosition.textContent = generatePositionText(position, duration)
  }

  setSongLength(duration) {
    this.elements.songLength.textContent = generateDurationText(duration)
  }

  updateVolume(volume) {
    this.elements.volume.value = volume
    this.elements.songVolume.textContent = Math.floor(volume * 100) + '%'
  }

  updateSpeed(speed) {
    this.elements.speed.value = speed
    this.elements.songRate.textContent = speed.toFixed(2) + 'x'
  }

  updateFileNameDisplay(text) {
    this.elements.fileDiv.querySelector('span').textContent = text
  }

  toggleRepeat() {
    this.elements.repeat.classList.toggle('on')
  }
}

module.exports = View