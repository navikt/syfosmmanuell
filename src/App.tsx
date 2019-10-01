import * as React from 'react';
import './App.less';

import StoreProvider from './store/StoreProvider';
import { DataFetcher } from './components/DataFetcher';
import EkspanderbartPanel from './components/EkspanderbartPanel';

const App: React.FC = () => {
    return (
        <StoreProvider>
            <DataFetcher>
                <EkspanderbartPanel />
            </DataFetcher>
        </StoreProvider>
    );
};

export default App;
