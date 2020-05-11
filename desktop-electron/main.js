const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
    const mainWindow = new BrowserWindow({
      width: 1920,
      height: 1080,
    })
    mainWindow.loadURL('https://quanlyhang.kechuyengame.com')
}
app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})