const { remote } = require('electron')
const { color1, color2, color3, color4 } = require('../utils/stylingVariables')

const win = remote.getCurrentWindow()

class TitleBar {
  constructor(elements) {
    this.elements = elements
  }

  setUpEventListeners() {
    this.elements.minimize.addEventListener('click', () => win.minimize())
    this.elements.close.addEventListener('click', () => win.close())

    this.elements.minimize.addEventListener('mouseenter', () => {
      this.elements.minimize.style.backgroundColor = color1
      if (document.hasFocus()) {
        this.elements.minimize.style.color = color4
      } else {
        this.elements.minimize.style.color = 'gray'
      }
    })

    this.elements.minimize.addEventListener('mouseleave', () => {
      this.elements.minimize.style.backgroundColor = color3
      if (document.hasFocus()) {
        this.elements.minimize.style.color = color1
      } else {
        this.elements.minimize.style.color = 'gray'
      }
    })

    this.elements.close.addEventListener('mouseenter', () => {
      this.elements.close.style.backgroundColor = 'red'
      if (document.hasFocus()) {
        this.elements.close.style.color = 'white'
      } else {
        this.elements.close.style.color = 'gray'
      }
    })

    this.elements.close.addEventListener('mouseleave', () => {
      this.elements.close.style.backgroundColor = color3
      if (document.hasFocus()) {
        this.elements.close.style.color = color1
      } else {
        this.elements.close.style.color = 'gray'
      }
    })

    win.on('focus', () => {
      this.elements.container.style.backgroundColor = color2
      this.elements.appName.style.color = 'white'
      this.elements.minimize.style.color = color1
      this.elements.close.style.color = color1
    })
    
    win.on('blur', () => {
      this.elements.container.style.backgroundColor = color1
      this.elements.appName.style.color = 'gray'
      this.elements.minimize.style.color = 'gray'
      this.elements.close.style.color = 'gray'
    })

    win.on('minimize', () => {
      this.elements.minimize.style.backgroundColor = color3 
      this.elements.minimize.style.color = color1
    })
  }
}

module.exports = TitleBar