const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    toggleAlwaysOnTop: () => ipcRenderer.invoke("toggleAlwaysOnTop"),
    closeWindow: () => ipcRenderer.send("closeWindow")
});