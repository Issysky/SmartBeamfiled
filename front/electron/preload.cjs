// 预加载脚本
const { ipcRenderer } = require('electron')
const { contextBridge } = require('electron/renderer')

//顶部栏方法
contextBridge.exposeInMainWorld('topBar', {
  close: () => ipcRenderer.send('close'),
  mini: () => ipcRenderer.send('mini'),
  max: () => ipcRenderer.send('max'),
  unmax: () => ipcRenderer.send('unmax'),
  // 打开开发者工具
  openDevTools: () => ipcRenderer.send('open-dev-tools'),
  // 强制刷新
  reload: () => ipcRenderer.send('reload'),
  // 检测网络
  pingInter: () =>
    ipcRenderer.invoke('check-connection').then((res) => {
      if(res){
        return '在线'
      }else{
        return '离线'
      }
    }),
  getMenu: () => ipcRenderer.send('show-context-menu'),
  // 打开外链
  openExternal: (url) => ipcRenderer.send('open-external-link', url)
})

// 读写 YAML 文件的方法
contextBridge.exposeInMainWorld('rwYaml', {
  readYamlFile: (path) => ipcRenderer.invoke('read-yaml-file', path),
  writeYamlFile: (path, data) => ipcRenderer.invoke('write-yaml-file', path, data)
})
