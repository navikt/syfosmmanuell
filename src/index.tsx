import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import * as serviceWorker from './serviceWorker';
import Navbar from './components/Navbar';
import App from './components/App';

console.log('NODE_ENV: ' + process.env.NODE_ENV);
console.log('REACT_APP_NODE_ENV: ' + process.env.REACT_APP_NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  require('./mock');
}

const AppWrapper = () => {
  return (
    <>
      <Navbar />
      <span className="app">
        <App />
      </span>
    </>
  );
};

ReactDOM.render(<AppWrapper />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
