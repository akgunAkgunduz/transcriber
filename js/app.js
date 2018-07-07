const transcriber = {
  currentDir: '',
  currentFilePath: '',
}

const container = document.getElementById('container')
const audio = document.getElementById('audio')
const fileDiv = document.getElementById('file-div')
const playPauseButton = document.getElementById('play-pause')
const progress = document.getElementById('progress')
const songLength = document.getElementById('song-length')
const songPosition = document.getElementById('song-position')
const songRate = document.getElementById('song-rate')
const volume = document.getElementById('volume')

audio.addEventListener('timeupdate', () => {
  progress.value = audio.currentTime
  songPosition.textContent = (audio.currentTime).toFixed(2)
})

audio.addEventListener('loadedmetadata', () => {
  songLength.textContent = audio.duration.toFixed(2)
  progress.max = audio.duration
  progress.value = 0
  volume.value = 1
  playPauseButton.disabled = false
  playPauseButton.click()  
})

container.addEventListener('dragover', () => {
  return false
})

container.addEventListener('dragleave', () => {
  return false
})

container.addEventListener('dragend', () => {
  return false
})

container.addEventListener('drop', (e) => {
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

window.addEventListener('keyup', (e) => {
  if (e.keyCode == '40') {
    audio.playbackRate = (audio.playbackRate - 0.05).toFixed(2)
    songRate.textContent = audio.playbackRate
  }
  if (e.keyCode == '38') {
    audio.playbackRate = (audio.playbackRate + 0.05).toFixed(2)
    songRate.textContent = audio.playbackRate
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