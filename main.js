const electron = require('electron')
const windowStateKeeper = require('electron-window-state')

const { app, BrowserWindow } = electron

let mainWindow

function createWindow () {
  let mainWindowState = windowStateKeeper()

  mainWindow = new BrowserWindow({
    width: 600, 
    height: 240,
    backgroundColor: '#2B2B2B',
    x: mainWindowState.x,
    y: mainWindowState.y,
    icon: 'images/transcriber.ico',
    resizable: false,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('index.html')
  mainWindow.webContents.openDevTools({ mode: 'detach' })
  mainWindow.setMenu(null)

  mainWindowState.manage(mainWindow)

  mainWindow.once('ready-to-show', function() {
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})