const path = require('path')

class Player {
  constructor(audioElement) {
    this.audio = audioElement
  }

  get src() {
    return this.audio.src
  }

  set src(newSrc) {
    this.audio.src = newSrc
  }

  get position() {
    return this.audio.currentTime
  }

  set position(newPosition) {
    this.audio.currentTime = newPosition
  }

  get duration() {
    return this.audio.duration
  }

  set duration(newDuration) {
    this.audio.duration = newDuration
  }

  get volume() {
    return this.audio.volume
  }

  set volume(newVolume) {
    this.audio.volume = newVolume
  }

  get speed() {
    return this.audio.playbackRate
  }

  set speed(newSpeed) {
    this.audio.playbackRate = newSpeed
  }

  get repeat() {
    return this.audio.loop
  }

  set repeat(newValue) {
    this.audio.loop = newValue
  }

  get error() {
    return this.audio.error.code
  }

  get isReady() {
    return this.audio.readyState === 4
  }

  get isPaused() {
    return this.audio.paused
  }

  play() {
    this.audio.play()
  }

  pause() {
    this.audio.pause()
  }

  toggle() {
    this.isPaused ? this.play() : this.pause()
  }

  resetVolumeAndSpeed() {
    this.audio.volume = 0.5
    this.audio.playbackRate = 1
  }
}

module.exports = Player