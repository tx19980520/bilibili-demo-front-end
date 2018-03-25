import React from 'react';
import ReactDOM from 'react-dom';
import BilibiliHome from './BilibiliHome.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BilibiliHome />, div);
  ReactDOM.unmountComponentAtNode(div);
});
