import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import './index.less';
import App from './components/App';
import NAVSPA from '@navikt/navspa';
import StoreProvider from './data/store';
import DecoratorWrapper from './components/Decorator';

if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_NODE_ENV === 'development') {
  require('./mock');
}

const Wrapper = () => {
  return (
    <StoreProvider>
      <DecoratorWrapper />
      <main>
        <App />
      </main>
    </StoreProvider>
  );
};

NAVSPA.eksporter('wrapper', Wrapper);
