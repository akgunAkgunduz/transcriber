const { remote } = require('electron')
const { isFileTypeSupported, sanitizeFilePath } = require('../utils/helpers')

const win = remote.getCurrentWindow()

class Controller {
  constructor(player, view, store) {
    this.player = player
    this.view = view
    this.store = store
  }

  setUpEventListeners() {
    this.player.audio.addEventListener('error', () => {
      this.view.displayErrorMessage(this.player.error)
      this.view.resetProgressAndPosition()
      this.player.resetVolumeAndSpeed()
      this.view.disableControls()
    })

    this.player.audio.addEventListener('loadedmetadata', () => {
      this.view.setProgressBarMaxValue(this.player.duration)
      this.view.setProgressBarValue(0)
      this.view.adaptProgressAndPositionToDuration(this.player.duration)
      this.view.setSongLength(this.player.duration)
      this.view.setSongPosition(0, 0)
      this.view.enableControls()

      if (this.store.getVolumeLevelForFile(this.player.src)) {
        this.player.volume = this.store.getVolumeLevelForFile(this.player.src)
      } else {
        this.player.volume = 0.5
      }
    })

    this.player.audio.addEventListener('timeupdate', () => {
      this.view.setProgressBarValue(this.player.position)
      this.view.setSongPosition(this.player.position, this.player.duration)
    })

    this.player.audio.addEventListener('play', () => this.view.displayPause())

    this.player.audio.addEventListener('pause', () => this.view.displayPlay())
    
    this.player.audio.addEventListener('ended', () => this.view.displayPlay())
    
    this.player.audio.addEventListener('volumechange', () => this.view.updateVolume(this.player.volume))
    
    this.player.audio.addEventListener('ratechange', () => this.view.updateSpeed(this.player.speed))

    this.view.elements.app.addEventListener('dragover', () => false)
    
    this.view.elements.app.addEventListener('dragleave', () => false)
    
    this.view.elements.app.addEventListener('dragend', () => false)
    
    this.view.elements.app.addEventListener('drop', (e) => {
      e.preventDefault()
      win.focus()

      if(!this.player.isPaused) {
        this.player.pause()
      }

      if (isFileTypeSupported(e.dataTransfer.files[0].path)) {
        this.player.src = sanitizeFilePath(e.dataTransfer.files[0].path)
        this.view.updateFileNameDisplay(e.dataTransfer.files[0].name)
      } else {
        this.player.src = ''
        this.view.resetProgressAndPosition()
        this.player.resetVolumeAndSpeed()
        this.view.disableControls()
      }

      return false
    })

    this.view.elements.volume.addEventListener('input', () => {
      this.player.volume = this.view.elements.volume.value
      this.store.setVolumeLevelForFile(this.player.src, this.player.volume)
    })
    
    this.view.elements.speed.addEventListener('input', () => this.player.speed = this.view.elements.speed.value)
    
    this.view.elements.toStart.addEventListener('click', () => this.player.position = 0)
    
    this.view.elements.rewind.addEventListener('click', () => this.player.position -= 2.5)
    
    this.view.elements.playPause.addEventListener('click', () => this.player.toggle())
    
    this.view.elements.forward.addEventListener('click', () => this.player.position += 2.5)
    
    this.view.elements.repeat.addEventListener('click', () => {
      this.player.repeat = !this.player.repeat
      this.view.toggleRepeat()
      this.store.repeat = this.player.repeat
    })

    this.view.elements.progress.addEventListener('input', () => this.player.position = this.view.elements.progress.value)

    this.view.elements.progress.addEventListener('mouseenter', () => this.player.isReady ? this.view.showProgressInfo() : null)

    this.view.elements.progress.addEventListener('mouseleave', () => this.view.hideProgressInfo())

    this.view.elements.progress.addEventListener('mousemove', (e) => this.view.setUpProgressInfo(e, this.player.duration))

    document.addEventListener('dragover', (e) => e.preventDefault())
    
    document.addEventListener('drop', (e) => e.preventDefault())

    document.addEventListener('DOMContentLoaded', () => {
      if(this.store.repeat) {
        this.player.repeat = true
        this.view.toggleRepeat()
      }
    })

    window.addEventListener('keydown', (e) => {
      if (this.player.isReady) {
        if (e.keyCode == '40') {
          if (this.player.speed > 0.5) {
            this.player.speed = (this.player.speed - 0.05).toFixed(2)
          }
        }
      
        if (e.keyCode == '38') {
          if (this.player.speed < 1.5) {
            this.player.speed = (this.player.speed + 0.05).toFixed(2)
          }
        }
      
        if (e.keyCode == '33') {
          if (this.player.volume < 1) {
            this.player.volume = (this.player.volume + 0.01).toFixed(2)
            this.store.setVolumeLevelForFile(this.player.src, this.player.volume)
          }
        }
      
        if (e.keyCode == '34') {
          if (this.player.volume > 0) {
            this.player.volume = (this.player.volume - 0.01).toFixed(2)
            this.store.setVolumeLevelForFile(this.player.src, this.player.volume)
          }
        }
      
        if (e.keyCode == '36') {
          this.player.position = 0
        }
      
        if (e.keyCode == '37') {
          this.player.position -= 2.5
        }
        
        if (e.keyCode == '39') {
          this.player.position += 2.5
        }
      
        if (e.keyCode == '32') {
          this.player.toggle()
        }
      }
    })
  }  
}

module.exports = Controller