class Store {
  get repeat() {
    return JSON.parse(localStorage.getItem('repeat'))
  }

  set repeat(status) {
    localStorage.setItem('repeat', status)
  }

  getVolumeLevelForFile(src) {
    return localStorage.getItem(src)
  }

  setVolumeLevelForFile(src, volumeLevel) {
    localStorage.setItem(src, volumeLevel)
  }
}

module.exports = Store