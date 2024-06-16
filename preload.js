// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  startBot: () => ipcRenderer.send('start-bot'),
  stopBot: () => ipcRenderer.send('stop-bot'),
  onBotOutput: (callback) =>
    ipcRenderer.on('bot-output', (event, data) => callback(data)),
});
