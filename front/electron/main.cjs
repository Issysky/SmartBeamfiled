const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { spawn } = require('child_process')
const dns = require('dns');


// 定义窗口
let win
// 在 Electron 的主线程中调用 Python 脚本
spawn('python', ['py/main.py'])
// 判断是否联网
// dns.resolve('www.baidu.com', function(err) {
//   if (err) {
//     console.log("No connection");
//   } else {
//     console.log("Connected");
//   }
// });
const createWindow = () => {
  win = new BrowserWindow({
    width: 1152,
    height: 648,
    icon: path.join(__dirname, '../src/assets/logo.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true, // 启用上下文隔离
      nodeIntegration: true
    },
    devTools: true,
    resizable: false,
    frame: false
  })

  win.loadURL('http://localhost:5173/')
}

app.whenReady().then(() => {
  // 顶部栏方法
  //   注册关闭，最大化，最小化
  ipcMain.on('close', () => win.close())
  ipcMain.on('mini', () => win.minimize())
  ipcMain.on('max', () => win.maximize())
  ipcMain.on('unmax', () => win.unmaximize())

  createWindow()
  // 启动后打开开发者工具
  win.webContents.openDevTools()
})

// 下方托盘邮件任务栏
app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: '新窗口',
    description: 'Create a new window'
  }
])
