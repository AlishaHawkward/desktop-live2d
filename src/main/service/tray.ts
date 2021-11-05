import { app, Menu, Tray } from 'electron';
import path from 'path';
import { win } from '../window';

const buildPath = app.isPackaged ? path.join(process.resourcesPath, 'build') : 'build';

let tray: Tray;

let displayMode = 0;

const createNewTray = () => {
  tray = new Tray(path.join(buildPath, './icons/png/16x16.png'));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: displayMode === 0 ? '开启拖动' : '关闭拖动',
      click: () => {
        if (displayMode) {
          displayMode = 0;
          win.setIgnoreMouseEvents(true);
        } else {
          displayMode = 1;
          win.setIgnoreMouseEvents(false);
        }
        tray.destroy();
        createNewTray();
      },
    },
    {
      label: '退出',
      click: () => {
        app.quit();
      },
    },
  ]);
  tray.setContextMenu(contextMenu);
};

const initTray = () => {
  createNewTray();

  setInterval(() => {
    if (!tray || tray.isDestroyed()) {
      createNewTray();
    }
  }, 1000);
};

export default initTray;
