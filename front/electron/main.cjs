const { app, BrowserWindow, ipcMain, shell } = require('electron')
const path = require('path')
const { spawn } = require('child_process')
const dns = require('dns')
const { Menu } = require('electron')
const { readYamlFile, writeYamlFile } = require('./rwYaml.cjs')

// 是否是开发环境
const isDev = process.env.IS_DEV == 'true' ? true : false
// 定义窗口
let win
// 在 Electron 的主线程中调用 Python 脚本
spawn('python', ['py/main.py'])
const createWindow = () => {
  win = new BrowserWindow({
    width: 400,
    height: 420,
    // width:1920,
    // height:1080,
    icon: path.join(__dirname, '../public/taskBarLogo3.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true, // 启用上下文隔离
      nodeIntegration: true
    },
    // 打开开发者工具
    devTools: true,
    // 禁止自定义缩放窗口
    resizable: false,
    // 禁用窗口外壳
    frame: false,
    // 禁用双击放大或缩小
    fullscreenable: false,
    maximizable: false
  })

  // win.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`)
  win.loadURL(
    isDev ? 'http://localhost:5173' : `file://${path.join(__dirname, '../dist/index.html')}`
  )
  // win.loadURL('http://localhost:5173/')
  // win.loadFile(path.join(__dirname, '../dist/index.html'))
}

app.whenReady().then(() => {
  // 顶部栏方法
  //   注册关闭，最大化，最小化
  ipcMain.on('close', () => win.close())
  ipcMain.on('mini', () => win.minimize())
  ipcMain.on('max', () => win.maximize())
  ipcMain.on('unmax', () => win.unmaximize())
  // 打开开发者工具
  ipcMain.on('open-dev-tools', () => win.webContents.openDevTools())
  // 强制刷新
  ipcMain.on('reload', () => win.reload())
  // 注册读写 YAML 文件的方法
  ipcMain.handle('read-yaml-file', (path) => {
    readYamlFile(path)
  })
  ipcMain.handle('write-yaml-file', (path, data) => {
    writeYamlFile(path, data)
  })
  // 判断是否有网络,在预加载脚本中调用
  ipcMain.handle('check-connection', async () => {
    return new Promise((resolve, reject) => {
      let timer = null
      timer = setTimeout(() => {
        resolve(false)
      }, 8000)
      dns.resolve('www.ihmeng.cn', function (err, addresses) {
        if (err) {
          resolve(false)
        } else {
          timer = null
          resolve(true)
        }
      })
    })
  })
  // 右键上下文菜单
  ipcMain.on('show-context-menu', (event) => {
    menu.popup({ window: BrowserWindow.fromWebContents(event.sender) })
  })
  // 打开外链
  ipcMain.on('open-external-link', (event, url) => {
    shell.openExternal(url)
  })
  createWindow()
  // 启动后打开开发者工具
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

// 创建上下文菜单
const template = [
  {
    label: 'Menu Item 1',
    click: () => {
      // event.sender.send('context-menu-command', 'menu-item-1')
      console.log('Menu Item 1')
    }
  },
  { type: 'separator' },
  { label: 'Menu Item 2', type: 'checkbox', checked: true }
]
const menu = Menu.buildFromTemplate(template)

// 热更新
// try {
//   require('electron-reloader')(module, {})
// } catch (_) {}
