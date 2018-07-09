const transcriber = {
  currentDir: '',
  currentFilePath: '',
}

const app = document.getElementById('app')
const audio = document.getElementById('audio')
const fileDiv = document.getElementById('file-div')
const toStart = document.getElementById('to-start')
const rewind = document.getElementById('rewind')
const playPause = document.getElementById('play-pause')
const forward = document.getElementById('forward')
const repeat = document.getElementById('repeat')
const progress = document.getElementById('progress')
const songLength = document.getElementById('song-length')
const songPosition = document.getElementById('song-position')
const songVolume = document.getElementById('song-volume')
const songRate = document.getElementById('song-rate')
const volume = document.getElementById('volume')
const speed = document.getElementById('speed')

audio.addEventListener('timeupdate', () => {
  progress.value = audio.currentTime
  songPosition.textContent = (audio.currentTime).toFixed(2)
})

audio.addEventListener('loadedmetadata', () => {
  songLength.textContent = audio.duration.toFixed(2)
  progress.max = audio.duration
  progress.value = 0
  audio.volume = 0.5
  volume.value = 0.5

  progress.disabled = false
  toStart.disabled = false
  rewind.disabled = false
  playPause.disabled = false
  forward.disabled = false
  volume.disabled = false
  speed.disabled = false

  playPause.click()  
})

audio.addEventListener('volumechange', () => {
  volume.value = audio.volume
  songVolume.textContent = Math.floor(audio.volume * 100) + '%'
})

audio.addEventListener('ratechange', () => {
  speed.value = audio.playbackRate
  songRate.textContent = audio.playbackRate.toFixed(2) + 'x'
})

app.addEventListener('dragover', () => {
  return false
})

app.addEventListener('dragleave', () => {
  return false
})

app.addEventListener('dragend', () => {
  return false
})

app.addEventListener('drop', (e) => {
  e.preventDefault()
  win.focus()

  if(!audio.paused) {
    audio.pause()
  }

  transcriber.currentFilePath = e.dataTransfer.files[0].path
  audio.src = transcriber.currentFilePath
  audio.loop = true
  fileDiv.querySelector('span').textContent = e.dataTransfer.files[0].name

  return false
})

document.addEventListener('dragover', (e) => {
  e.preventDefault()
})

document.addEventListener('drop', (e) => {
  e.preventDefault()
})

volume.addEventListener('input', () => {
  audio.volume = volume.value
})

speed.addEventListener('input', () => {
  audio.playbackRate = speed.value
})

toStart.addEventListener('click', () => {
  audio.currentTime = 0
})

rewind.addEventListener('click', () => {
  audio.currentTime = audio.currentTime - 2.5
})

playPause.addEventListener('click', () => {
  if (audio.paused) {
    audio.play()
    playPause.querySelector('i').innerHTML = 'pause'
  } else {
    audio.pause()
    playPause.querySelector('i').innerHTML = 'play_arrow'
  }
})

forward.addEventListener('click', () => {
  audio.currentTime = audio.currentTime + 2.5
})

progress.addEventListener('input', () => {
  audio.currentTime = progress.value
})

window.addEventListener('keydown', (e) => {
  if (transcriber.currentFilePath) {
    if (e.keyCode == '40') {
      if (audio.playbackRate > 0.5) {
        audio.playbackRate = (audio.playbackRate - 0.05).toFixed(2)
      }
    }
  
    if (e.keyCode == '38') {
      if (audio.playbackRate < 1.5) {
        audio.playbackRate = (audio.playbackRate + 0.05).toFixed(2)
      }
    }
  
    if (e.keyCode == '33') {
      if (audio.volume < 1) {
        audio.volume = (audio.volume + 0.01).toFixed(2)
      }
    }
  
    if (e.keyCode == '34') {
      if (audio.volume > 0) {
        audio.volume = (audio.volume - 0.01).toFixed(2)
      }
    }
  
    if (e.keyCode == '36') {
      audio.currentTime = 0
    }
  
    if (e.keyCode == '37') {
      audio.currentTime = audio.currentTime - 2.5
    }
  
    if (e.keyCode == '39') {
      audio.currentTime = audio.currentTime + 2.5
    }
  
    if (e.keyCode == '32') {
      playPause.click()
    }
  }
})