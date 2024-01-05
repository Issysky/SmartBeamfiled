// 预加载脚本
const { ipcRenderer } = require('electron')
const { contextBridge } = require('electron/renderer')

//顶部栏方法
contextBridge.exposeInMainWorld('topBar', {
  close: () => ipcRenderer.send('close'),
  mini: () => ipcRenderer.send('mini'),
  max: () => ipcRenderer.send('max'),
  unmax: () => ipcRenderer.send('unmax')
})
