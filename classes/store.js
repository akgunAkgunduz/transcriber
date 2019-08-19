class Store {
  get repeat() {
    return JSON.parse(localStorage.getItem('repeat'))
  }

  set repeat(status) {
    localStorage.setItem('repeat', status)
  }
}

module.exports = Store