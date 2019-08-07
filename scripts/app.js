const transcriber = {
  currentFilePath: '',
  repeat: localStorage.getItem('repeat') || 'false'
}

const app = document.getElementById('app')
const audio = document.getElementById('audio')
const fileDiv = document.getElementById('file-div')
const toStart = document.getElementById('to-start')
const rewind = document.getElementById('rewind')
const playPause = document.getElementById('play-pause')
const forward = document.getElementById('forward')
const repeat = document.getElementById('repeat')
const progressAndPosition = document.getElementById('progress-and-position')
const progressDiv = document.getElementById('progress-div')
const progress = document.getElementById('progress')
const fakeProgress = document.getElementById('fake-progress')
const progressInfo = document.getElementById('progress-info')
const songLength = document.getElementById('song-length')
const songPosition = document.getElementById('song-position')
const songVolume = document.getElementById('song-volume')
const songRate = document.getElementById('song-rate')
const volume = document.getElementById('volume')
const speed = document.getElementById('speed')

audio.addEventListener('loadedmetadata', () => {
  progress.max = audio.duration
  progress.value = 0
  if (localStorage.getItem(transcriber.currentFilePath)) {
    audio.volume = localStorage.getItem(transcriber.currentFilePath)
  } else {
    audio.volume = 0.5
  }

  if (audio.duration < 3600) {
    progressAndPosition.style.gridTemplateColumns = '40px 1fr 40px'
  } else {
    progressAndPosition.style.gridTemplateColumns = '60px 1fr 60px'
  }
  progressAndPosition.style.gridColumnGap = '4px'

  songLength.textContent = generateDurationText(audio.duration)
  songPosition.textContent = generatePositionText(0, 0)

  progress.disabled = false
  toStart.disabled = false
  rewind.disabled = false
  playPause.disabled = false
  forward.disabled = false
  volume.disabled = false
  speed.disabled = false

  playPause.click()  
})

audio.addEventListener('timeupdate', () => {
  progress.value = audio.currentTime
  songPosition.textContent = generatePositionText(audio.currentTime, audio.duration)
})

audio.addEventListener('ended', () => {
  if (transcriber.repeat == 'false') {
    audio.currentTime = 0
    playPause.querySelector('i').innerHTML = 'play_arrow'
  }
})

audio.addEventListener('volumechange', () => {
  volume.value = audio.volume
  localStorage.setItem(transcriber.currentFilePath, audio.volume)
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
  audio.src = sanitizeFilePath(transcriber.currentFilePath)
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

repeat.addEventListener('click', () => {
  audio.loop = !JSON.parse(transcriber.repeat)
  transcriber.repeat = JSON.stringify(audio.loop)
  localStorage.repeat = audio.loop
  repeat.classList.toggle('on')
})

progress.addEventListener('input', () => {
  audio.currentTime = progress.value
})

progress.addEventListener('mousemove', (e) => {
  const duration = audio.duration || 0
  const progressWidth = fakeProgress.offsetWidth
  const cursorPositionRelative = e.clientX - e.target.parentNode.offsetLeft - 8
  const cursorPositionTime = duration * (cursorPositionRelative / progressWidth)
  const infoWidth = progressInfo.offsetWidth  

  if (cursorPositionRelative < 0) {
    progressInfo.innerText = generateDurationText(0)  
  } else if (cursorPositionRelative > progressWidth) {
    progressInfo.innerText = generateDurationText(duration)
  } else {
    progressInfo.innerText = generateDurationText(cursorPositionTime)
  }

  if (e.clientX < e.target.parentNode.offsetLeft ) {
    progressInfo.style.left = `${-(infoWidth / 2) + 8}px`
  } else if (e.clientX > progressWidth + 8 + e.target.parentNode.offsetLeft ) {
    progressInfo.style.left = `${progressWidth + 8 - (infoWidth / 2)}px`
  } else {
    progressInfo.style.left = `${cursorPositionRelative - infoWidth / 2 + 8}px`
  }

  progressInfo.style.top = `${e.target.offsetTop - 24}px`  
})

progress.addEventListener('mouseenter', () => {
  if (audio.readyState === 4) {
    progressInfo.style.opacity = 1
  }
})

progress.addEventListener('mouseleave', () => {
  progressInfo.style.opacity = 0
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

document.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('repeat') == 'true') {
    audio.loop = true
    repeat.classList.add('on')
  }
})
