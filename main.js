const { app, BrowserWindow } = require('electron')
const path = require('path')

// 禁用 GPU 沙盒模式（解决大部分透明窗口的 GPU 崩溃问题）
app.commandLine.appendSwitch('disable-gpu-sandbox');
// 强制开启透明视觉效果支持
app.commandLine.appendSwitch('enable-transparent-visuals');

function createWindow () {
  const win = new BrowserWindow({
    width: 350,         
    height: 500,
    transparent: true, 
    frame: false,        
    alwaysOnTop: true, 
    hasShadow: false,  
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false 
    }
  })

  win.setMenu(null)
  win.loadFile('index.html')

  // 注意看，它现在乖乖待在 createWindow 的大括号里面了！
  //win.webContents.openDevTools() 
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})