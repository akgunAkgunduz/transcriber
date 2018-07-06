const { remote } = require('electron')

var win = remote.getCurrentWindow()

const root = document.querySelector(':root')
const cssVariables = getComputedStyle(root)
const appName = document.getElementById('app-name')
const minimize = document.getElementById('minimize')
const close = document.getElementById('close')

const color1 = cssVariables.getPropertyValue('--color1')
const color2 = cssVariables.getPropertyValue('--color2')
const color3 = cssVariables.getPropertyValue('--color3')
const color4 = cssVariables.getPropertyValue('--color4')

minimize.addEventListener('click', () => win.minimize())
close.addEventListener('click', () => win.close())

minimize.addEventListener('mouseenter', () => {
  minimize.style.backgroundColor = color1
  if (document.hasFocus()) {
    minimize.style.color = color4
  } else {
    minimize.style.color = 'gray'
  }
})

minimize.addEventListener('mouseleave', () => {
  minimize.style.backgroundColor = color3
  if (document.hasFocus()) {
    minimize.style.color = color1
  } else {
    minimize.style.color = 'gray'
  }
})

close.addEventListener('mouseenter', () => {
  close.style.backgroundColor = 'red'
  if (document.hasFocus()) {
    close.style.color = 'white'
  } else {
    close.style.color = 'gray'
  }
})

close.addEventListener('mouseleave', () => {
  close.style.backgroundColor = color3
  if (document.hasFocus()) {
    close.style.color = color1
  } else {
    close.style.color = 'gray'
  }
})

win.on('focus', () => {
  appName.style.color = 'white'
  minimize.style.color = '#2B2B2B'
  close.style.color = '#2B2B2B'
})

win.on('blur', () => {
  appName.style.color = 'gray'
  minimize.style.color = 'gray'
  close.style.color = 'gray'
})

win.on('minimize', () => {
  minimize.style.backgroundColor = color3 
  minimize.style.color = color1
})
