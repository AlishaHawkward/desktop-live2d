import React from 'react';
import ReactDOM from 'react-dom';

import Live2D from '@/components/live2d';

import './global.less';

ReactDOM.render(
  <React.StrictMode>
    <Live2D />
  </React.StrictMode>,
  document.getElementById('root'),
);
