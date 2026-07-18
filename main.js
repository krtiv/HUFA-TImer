const {
    app,
    BrowserWindow,
    nativeTheme,
    ipcMain
} = require("electron");
const path = require("path");

function createWindow() {

    nativeTheme.themeSource = "dark";

const win = new BrowserWindow({
    width: 420,
    height: 150,

    icon: path.join(__dirname, "assets", "icon.ico"),

    useContentSize: true,

    frame: false,
    transparent: true,

    resizable: false,
    maximizable: false,
    minimizable: false,
    fullscreenable: false,

    autoHideMenuBar: true,

    center: true,

    webPreferences: {
    preload: path.join(__dirname, "preload.js"),
    nodeIntegration: false,
    contextIsolation: true
}

});

    win.removeMenu();

    win.loadFile("index.html");

    ipcMain.handle("toggleAlwaysOnTop", () => {

    const state = !win.isAlwaysOnTop();

    win.setAlwaysOnTop(state);

    return state;

});

ipcMain.on("closeWindow", () => {
    BrowserWindow.getFocusedWindow()?.close();
});
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        app.quit();
});