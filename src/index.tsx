import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import AppWrapper from './AppWrapper';

console.log('NODE_ENV: ' + process.env.NODE_ENV);
console.log('REACT_APP_NODE_ENV: ' + process.env.REACT_APP_NODE_ENV);

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('./mock');
}

ReactDOM.render(<AppWrapper />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
