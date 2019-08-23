const { remote } = require('electron')
const { generateDurationText, generatePositionText, isFileTypeSupported, sanitizeFilePath } = require('../utils/helpers')

var win = remote.getCurrentWindow()

class Controller {
  constructor(player, view, store) {
    this.player = player
    this.view = view
    this.store = store
  }

  setUpEventListeners() {
    this.player.audio.addEventListener('error', () => {
      this.view.displayErrorMessage(this.player.audio.error.code)
      this.view.resetProgressAndPosition()
      this.player.resetVolumeAndSpeed()
      this.view.disableControls()
    })

    this.player.audio.addEventListener('loadedmetadata', () => {
      this.view.elements.progress.max = audio.duration
      this.view.elements.progress.value = 0

      if (this.store.getVolumeLevelForFile(this.player.src)) {
        this.player.volume = this.store.getVolumeLevelForFile(this.player.src)
      } else {
        this.player.volume = 0.5
      }

      this.view.adaptProgressAndPositionToDuration(this.player.audio.duration)
      this.view.elements.songLength.textContent = generateDurationText(this.player.audio.duration)
      this.view.elements.songPosition.textContent = generatePositionText(0, 0)
      this.view.enableControls()
    })

    this.player.audio.addEventListener('timeupdate', () => {
      this.view.elements.progress.value = this.player.audio.currentTime
      this.view.elements.songPosition.textContent = generatePositionText(this.player.audio.currentTime, this.player.audio.duration)
    })

    this.player.audio.addEventListener('play', () => this.view.displayPause())

    this.player.audio.addEventListener('pause', () => this.view.displayPlay())
    
    this.player.audio.addEventListener('ended', () => this.view.displayPlay())
    
    this.player.audio.addEventListener('volumechange', () => {
      this.view.elements.volume.value = this.player.volume
      this.view.elements.songVolume.textContent = Math.floor(this.player.volume * 100) + '%'
    })
    
    this.player.audio.addEventListener('ratechange', () => {
      this.view.elements.speed.value = this.player.speed
      this.view.elements.songRate.textContent = this.player.speed.toFixed(2) + 'x'
    })

    this.view.elements.app.addEventListener('dragover', () => false)
    
    this.view.elements.app.addEventListener('dragleave', () => false)
    
    this.view.elements.app.addEventListener('dragend', () => false)
    
    this.view.elements.app.addEventListener('drop', (e) => {
      e.preventDefault()
      win.focus()

      if(!this.player.audio.paused) {
        this.player.pause()
      }

      if (isFileTypeSupported(e.dataTransfer.files[0].path)) {
        this.player.src = sanitizeFilePath(e.dataTransfer.files[0].path)
        this.view.elements.fileDiv.querySelector('span').textContent = e.dataTransfer.files[0].name
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
    
    this.view.elements.speed.addEventListener('input', () => {
      this.player.speed = this.view.elements.speed.value
    })
    
    this.view.elements.toStart.addEventListener('click', () => {
      this.player.audio.currentTime = 0
    })
    
    this.view.elements.rewind.addEventListener('click', () => {
      this.player.audio.currentTime = this.player.audio.currentTime - 2.5
    })
    
    this.view.elements.playPause.addEventListener('click', () => {
      this.player.toggle()
    })
    
    this.view.elements.forward.addEventListener('click', () => {
      this.player.audio.currentTime = this.player.audio.currentTime + 2.5
    })
    
    this.view.elements.repeat.addEventListener('click', () => {
      this.player.repeat = !this.player.repeat
      this.view.elements.repeat.classList.toggle('on')
      this.store.repeat = this.player.repeat
    })

    this.view.elements.progress.addEventListener('input', () => {
      this.player.audio.currentTime = progress.value
    })
    
    this.view.elements.progress.addEventListener('mousemove', (e) => {
      const duration = this.player.audio.duration || 0
      const progressWidth = this.view.elements.fakeProgress.offsetWidth
      const cursorPositionRelative = e.clientX - e.target.parentNode.offsetLeft - 8
      const cursorPositionTime = duration * (cursorPositionRelative / progressWidth)
      const infoWidth = this.view.elements.progressInfo.offsetWidth  
    
      if (cursorPositionRelative < 0) {
        this.view.elements.progressInfo.innerText = generateDurationText(0)  
      } else if (cursorPositionRelative > progressWidth) {
        this.view.elements.progressInfo.innerText = generateDurationText(duration)
      } else {
        this.view.elements.progressInfo.innerText = generateDurationText(cursorPositionTime)
      }
    
      if (e.clientX < e.target.parentNode.offsetLeft ) {
        this.view.elements.progressInfo.style.left = `${-(infoWidth / 2) + 8}px`
      } else if (e.clientX > progressWidth + 8 + e.target.parentNode.offsetLeft ) {
        this.view.elements.progressInfo.style.left = `${progressWidth + 8 - (infoWidth / 2)}px`
      } else {
        this.view.elements.progressInfo.style.left = `${cursorPositionRelative - infoWidth / 2 + 8}px`
      }
    
      this.view.elements.progressInfo.style.top = `${e.target.offsetTop - 24}px`  
    })
    
    this.view.elements.progress.addEventListener('mouseenter', () => {
      if (this.player.audio.readyState === 4) {
        this.view.elements.progressInfo.style.opacity = 1
      }
    })
    
    this.view.elements.progress.addEventListener('mouseleave', () => {
      this.view.elements.progressInfo.style.opacity = 0
    })

    document.addEventListener('dragover', (e) => e.preventDefault())
    
    document.addEventListener('drop', (e) => e.preventDefault())

    document.addEventListener('DOMContentLoaded', () => {
      if(this.store.repeat) {
        this.player.repeat = true
        this.view.elements.repeat.classList.add('on')
      }
    })

    window.addEventListener('keydown', (e) => {
      if (this.player.audio.readyState === 4) {
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
          this.player.audio.currentTime = 0
        }
      
        if (e.keyCode == '37') {
          this.player.audio.currentTime = this.player.audio.currentTime - 2.5
        }
      
        if (e.keyCode == '39') {
          this.player.audio.currentTime = this.player.audio.currentTime + 2.5
        }
      
        if (e.keyCode == '32') {
          this.player.toggle()
        }
      }
    })
  }  
}

module.exports = Controller