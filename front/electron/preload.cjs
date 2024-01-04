// 预加载脚本
const { ipcRenderer } = require("electron");
const { contextBridge } = require("electron/renderer");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  close: () => ipcRenderer.send("close"),
  mini: () => ipcRenderer.send("mini"),
  max: () => ipcRenderer.send("max"),
  unmax: () => ipcRenderer.send("unmax"),

});