import { app, screen, BrowserWindow } from 'electron';
import path from 'path';

export let win: BrowserWindow;

export default () => {
  win = new BrowserWindow({
    x: 0,
    y: screen.getPrimaryDisplay().bounds.height - 350,
    width: 320,
    height: 350,
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
  // win.maximize();

  win.once('ready-to-show', () => {
    win.show();
  });

  process.env.ENV === 'production' ? win.loadFile(path.join(__dirname, '../render/index.html')) :
    win.loadURL(`http://localhost:${process.env.PORT}`);
};
