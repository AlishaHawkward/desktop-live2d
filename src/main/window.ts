import { app, BrowserWindow } from 'electron';
import path from 'path';

export let win: BrowserWindow;

export default () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, './preload.js'),
    },
  });

  if (process.platform === 'darwin') {
    app.dock.hide();
  }
  if (process.platform === 'win32') {
    win.setSkipTaskbar(true);
  }
  win.setIgnoreMouseEvents(true);
  win.maximize();

  win.once('ready-to-show', () => {
    win.show();
  });

  process.env.ENV === 'production' ? win.loadFile(path.join(__dirname, '../render/index.html')) :
    win.loadURL(`http://localhost:${process.env.PORT}`);
};
