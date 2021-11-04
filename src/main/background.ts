import { app, BrowserWindow } from 'electron';

import ipcIndex from './service';
import initTray from './service/tray';
import createWindow from './window';

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // If app is active but no window found, reinit window.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  ipcIndex();
  initTray();
});

app.on('window-all-closed', () => {
  // If platform is not darwin, quit the app.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
