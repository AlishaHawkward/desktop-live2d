import { ipcMain, screen } from 'electron';

const Index = () => {
  ipcMain.handle('get-mouse-pos', () => {
    return screen.getCursorScreenPoint();
  });
};

export default Index;
