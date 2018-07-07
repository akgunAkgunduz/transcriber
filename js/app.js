const transcriber = {
  currentDir: '',
  currentFilePath: '',
}

const app = document.getElementById('app')
const audio = document.getElementById('audio')
const fileDiv = document.getElementById('file-div')
const playPauseButton = document.getElementById('play-pause')
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
  audio.volume = 1
  volume.value = 1
  playPauseButton.disabled = false
  playPauseButton.click()  
})

audio.addEventListener('volumechange', () => {
  volume.value = audio.volume
  songVolume.textContent = Math.floor(audio.volume * 100)
})

audio.addEventListener('ratechange', () => {
  speed.value = audio.playbackRate
  songRate.textContent = audio.playbackRate
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
  songRate.textContent = 1
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

playPauseButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play()
    playPauseButton.querySelector('i').innerHTML = 'pause'
  } else {
    audio.pause()
    playPauseButton.querySelector('i').innerHTML = 'play_arrow'
  }
})

progress.addEventListener('input', () => {
  audio.currentTime = progress.value
})

window.addEventListener('keydown', (e) => {
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

  if (e.keyCode == '37') {
    audio.currentTime = audio.currentTime - 2.5
  }

  if (e.keyCode == '39') {
    audio.currentTime = audio.currentTime + 2.5
  }

  if (e.keyCode == '32') {
    playPauseButton.click()
  }
})