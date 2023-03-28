import { app, BrowserWindow } from 'electron';

function createWindow() {
  // Create the main Electron window
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    title: 'matApp',
    roundedCorners: false,
    frame: true,
    thickFrame: false,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
    win.loadURL(process.env.CLIENT_SERVER || 'http://localhost:8080');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
