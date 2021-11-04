import { app, Menu, Tray } from 'electron';
import path from 'path';

const buildPath = app.isPackaged ? path.join(process.resourcesPath, 'build') : 'build';

let tray: Tray;

const createNewTray = () => {
  tray = new Tray(path.join(buildPath, './icons/png/16x16.png'));
  const contextMenu = Menu.buildFromTemplate([
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
