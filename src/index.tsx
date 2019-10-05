import * as ReactDOM from 'react-dom';
import * as React from 'react';
import App from './App';
import * as dayjs from 'dayjs';
import 'dayjs/locale/nb';
import env from './utils/environments';

dayjs.locale('nb');

if (!(env.isPreprod || env.isProduction)) {
    require('./mock');
}

ReactDOM.render(<App />, document.getElementById('root'));
