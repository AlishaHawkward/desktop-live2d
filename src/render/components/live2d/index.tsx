import { useEffect, useRef } from 'react';

import { LAppDelegate } from '@/framework/live2dloader/lappdelegate';

import './style.less';

const Index = () => {
  const intervalRef = useRef<any>();

  useEffect(() => {
    if (LAppDelegate.getInstance().initialize() === false) {
      return;
    }
    LAppDelegate.getInstance().run();
    intervalRef.current = setInterval(() => {
      ipcRenderer.invoke('get-mouse-pos').then((res) => {
        const live2d = document.getElementById('live2d') as HTMLCanvasElement;
        const rect = live2d.getBoundingClientRect();
        const x = res.x - window.screenLeft;
        const y = res.y - window.screenTop;
        const mouseX: number = x - rect.left;
        const mouseY: number = y - rect.top;
        const posX: number = mouseX > rect.width ? rect.width : mouseX;
        const posY: number = mouseY < 0 ? 0 : mouseY;
        // console.log(posX, posY);
        LAppDelegate.getInstance()._view.onTouchesMoved(posX, posY);
        if (mouseX < rect.width && mouseY > 0) {
          live2d.classList.add('opacity');
        } else {
          live2d.classList.remove('opacity');
        }
      });
    }, 1000 / 60);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return (
    <div id="landlord" className="lock">
      <canvas id="live2d" width="320" height="350" className="live2d" />
    </div>
  );
};

export default Index;
