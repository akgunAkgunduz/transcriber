const { remote } = require('electron')

var win = remote.getCurrentWindow()

const minimize = document.getElementById('minimize')
const close = document.getElementById('close')

minimize.addEventListener('click', () => win.minimize())
close.addEventListener('click', () => win.close())