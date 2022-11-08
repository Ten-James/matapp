import { app, BrowserWindow } from "electron";
import path from "path";

const IS_DEV = process.env.IS_IN_DEVELOPMENT || false;

function createWindow() {
  // Create the main Electron window
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    title: "matApp",
    roundedCorners: false,
    frame: true,
    thickFrame: false,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  if (IS_DEV) {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools({
      mode: "detach",
    });
  } else {
    win.loadURL(`file://${path.join(__dirname, "..", "dist", "index.html")}`);
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
