import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import View from './view';
import './styles/index.scss'

render(
  <AppContainer>
    <View />
  </AppContainer>, 
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./page', () => {
    const App = require('./page').default;

    render(<AppContainer><View /></AppContainer>, document.getElementById('app'));
  });
}
