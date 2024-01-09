// 预加载脚本
const { ipcRenderer } = require('electron')
const { contextBridge } = require('electron/renderer')

//顶部栏方法
contextBridge.exposeInMainWorld('topBar', {
  close: () => ipcRenderer.send('close'),
  mini: () => ipcRenderer.send('mini'),
  max: () => ipcRenderer.send('max'),
  unmax: () => ipcRenderer.send('unmax'),
  // 检测网络
  pingInter: () =>
    ipcRenderer.invoke('check-connection').then((connection) => {
      if (connection) {
        return 'connected'
      } else {
        return 'disconnected'
      }
    }),
  getMenu:  () =>  ipcRenderer.send('show-context-menu')
})
