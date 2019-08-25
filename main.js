const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const windowStateKeeper = require('electron-window-state')
const supportedFileTypes = require('./utils/supportedFileTypes')

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

ipcMain.on('open-file-dialog', (e) => {
  dialog.showOpenDialog(mainWindow, {
    filters: [
      { name: 'Media files', extensions: supportedFileTypes.all },
      { name: 'Audio files', extensions: supportedFileTypes.audio },
      { name: 'Video files', extensions: supportedFileTypes.video }
    ],
    properties: ['openFile']
  }, (files) => {
    if (files) {
      e.sender.send('selected-file', files[0])
    }
  })
})