const { remote } = require('electron')
const { generateDurationText, generatePositionText, isFileTypeSupported, sanitizeFilePath } = require('../utils/helpers')

var win = remote.getCurrentWindow()

class Controller {
  constructor(player, view) {
    this.player = player
    this.view = view
  }

  setUpEventListeners() {
    this.player.audio.addEventListener('error', () => {
      console.log(this.player.audio.error)

      switch (this.player.audio.error.code) {
        case 3:
          this.view.elements.fileDiv.querySelector('span').innerText = 'Error: Decoding error.'
          break
        case 4:
          this.view.elements.fileDiv.querySelector('span').innerText = 'Error: Media type not supported.'
          break
        default:
          this.view.elements.fileDiv.querySelector('span').innerText = 'Error: An unexpected error ocurred.'
      }
    
      this.view.elements.songLength.textContent = ''
      this.view.elements.songPosition.textContent = ''
    
      this.view.elements.progressAndPosition.style.gridTemplateColumns = '0px 1fr 0px'
      this.view.elements.progressAndPosition.style.gridColumnGap = '0px'
    
      this.player.audio.volume = 0.5
      this.player.audio.playbackRate = 1
    
      this.view.elements.progress.disabled = true
      this.view.elements.toStart.disabled = true
      this.view.elements.rewind.disabled = true
      this.view.elements.playPause.disabled = true
      this.view.elements.forward.disabled = true
      this.view.elements.volume.disabled = true
      this.view.elements.speed.disabled = true
    })

    this.player.audio.addEventListener('loadedmetadata', () => {
      console.log('loadedmetadata')

      this.view.elements.progress.max = audio.duration
      this.view.elements.progress.value = 0

      if (this.player.audio.duration < 3600) {
        this.view.elements.progressAndPosition.style.gridTemplateColumns = '40px 1fr 40px'
      } else {
        this.view.elements.progressAndPosition.style.gridTemplateColumns = '60px 1fr 60px'
      }
      this.view.elements.progressAndPosition.style.gridColumnGap = '4px'

      this.view.elements.songLength.textContent = generateDurationText(this.player.audio.duration)
      this.view.elements.songPosition.textContent = generatePositionText(0, 0)

      this.view.elements.progress.disabled = false
      this.view.elements.toStart.disabled = false
      this.view.elements.rewind.disabled = false
      this.view.elements.playPause.disabled = false
      this.view.elements.forward.disabled = false
      this.view.elements.volume.disabled = false
      this.view.elements.speed.disabled = false

      this.view.elements.playPause.click()
    })
    
    this.player.audio.addEventListener('canplay', () => console.log('canplay'))
    this.player.audio.addEventListener('canplaythrough', () => console.log('canplaythrough'))

    this.player.audio.addEventListener('timeupdate', () => {
      this.view.elements.progress.value = this.player.audio.currentTime
      this.view.elements.songPosition.textContent = generatePositionText(this.player.audio.currentTime, this.player.audio.duration)
    })
    
    this.player.audio.addEventListener('ended', () => {      
      this.view.elements.playPause.querySelector('i').innerHTML = 'play_arrow'      
    })
    
    this.player.audio.addEventListener('volumechange', () => {
      this.view.elements.volume.value = this.player.audio.volume
      this.view.elements.songVolume.textContent = Math.floor(this.player.audio.volume * 100) + '%'
    })
    
    this.player.audio.addEventListener('ratechange', () => {
      this.view.elements.speed.value = this.player.audio.playbackRate
      this.view.elements.songRate.textContent = this.player.audio.playbackRate.toFixed(2) + 'x'
    })

    this.view.elements.app.addEventListener('dragover', () => {
      return false
    })
    
    this.view.elements.app.addEventListener('dragleave', () => {
      return false
    })
    
    this.view.elements.app.addEventListener('dragend', () => {
      return false
    })
    
    this.view.elements.app.addEventListener('drop', (e) => {
      e.preventDefault()
      win.focus()
    
      if(!this.player.audio.paused) {
        this.player.audio.pause()
      }
    
      console.log(e.dataTransfer.files[0])
    
      if (isFileTypeSupported(e.dataTransfer.files[0].path)) {
        this.player.audio.src = sanitizeFilePath(e.dataTransfer.files[0].path)
        this.view.elements.fileDiv.querySelector('span').textContent = e.dataTransfer.files[0].name
      } else {
        this.player.audio.src = ''
    
        this.view.elements.songPosition.textContent = ''
        this.view.elements.songLength.textContent = ''
    
        this.view.elements.progressAndPosition.style.gridTemplateColumns = '0px 1fr 0px'
        this.view.elements.progressAndPosition.style.gridColumnGap = '0px'
    
        this.player.audio.volume = 0.5
        this.player.audio.playbackRate = 1
    
        this.view.elements.progress.disabled = true
        this.view.elements.toStart.disabled = true
        this.view.elements.rewind.disabled = true
        this.view.elements.playPause.disabled = true
        this.view.elements.forward.disabled = true
        this.view.elements.volume.disabled = true
        this.view.elements.speed.disabled = true
      }
    
      return false
    })
    
    document.addEventListener('dragover', (e) => {
      e.preventDefault()
    })
    
    document.addEventListener('drop', (e) => {
      e.preventDefault()
    })

    this.view.elements.volume.addEventListener('input', () => {
      this.player.audio.volume = this.view.elements.volume.value
    })
    
    this.view.elements.speed.addEventListener('input', () => {
      this.player.audio.playbackRate = this.view.elements.speed.value
    })
    
    this.view.elements.toStart.addEventListener('click', () => {
      this.player.audio.currentTime = 0
    })
    
    this.view.elements.rewind.addEventListener('click', () => {
      this.player.audio.currentTime = this.player.audio.currentTime - 2.5
    })
    
    this.view.elements.playPause.addEventListener('click', () => {
      if (this.view.elements.audio.paused) {
        this.player.audio.play()
        this.view.elements.playPause.querySelector('i').innerHTML = 'pause'
      } else {
        this.player.audio.pause()
        this.view.elements.playPause.querySelector('i').innerHTML = 'play_arrow'
      }
    })
    
    this.view.elements.forward.addEventListener('click', () => {
      this.player.audio.currentTime = this.player.audio.currentTime + 2.5
    })
    
    this.view.elements.repeat.addEventListener('click', () => {
      this.view.elements.repeat.classList.toggle('on')
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

    window.addEventListener('keydown', (e) => {
      if (this.player.audio.readyState === 4) {
        if (e.keyCode == '40') {
          if (this.player.audio.playbackRate > 0.5) {
            this.player.audio.playbackRate = (this.player.audio.playbackRate - 0.05).toFixed(2)
          }
        }
      
        if (e.keyCode == '38') {
          if (this.player.audio.playbackRate < 1.5) {
            this.player.audio.playbackRate = (this.player.audio.playbackRate + 0.05).toFixed(2)
          }
        }
      
        if (e.keyCode == '33') {
          if (this.player.audio.volume < 1) {
            this.player.audio.volume = (this.player.audio.volume + 0.01).toFixed(2)
          }
        }
      
        if (e.keyCode == '34') {
          if (this.player.audio.volume > 0) {
            this.player.audio.volume = (this.player.audio.volume - 0.01).toFixed(2)
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
          this.view.elements.playPause.click()
        }
      }
    })
  }  
}

module.exports = Controller