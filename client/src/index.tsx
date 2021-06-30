import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './components/App';
import StoreProvider from './data/store';
import DecoratorWrapper from './components/Decorator';
import { setupLogger } from './utils/logger';

if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_DEMO === 'true') {
  require('./mock');
}

setupLogger();

ReactDOM.render(
  <StoreProvider>
    <DecoratorWrapper />
    <main>
      <App />
    </main>
  </StoreProvider>,
  document.getElementById('root'),
);
