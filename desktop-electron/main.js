const {app, BrowserWindow,Menu} = require('electron')

const gotTheLock = app.requestSingleInstanceLock()

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
  })
  mainWindow.loadURL('https://quanlyhang.kechuyengame.com')

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu)
}

const mainMenuTemplate = [];

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})