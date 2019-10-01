import * as React from 'react';
import StoreProvider from './store/StoreProvider';
import { DataFetcher } from './components/DataFetcher';
import EkspanderbartPanel from './components/EkspanderbartPanel';
import './App.less';

const App: React.FC = () => (
    <StoreProvider>
        <DataFetcher>
            <EkspanderbartPanel />
        </DataFetcher>
    </StoreProvider>
);

export default App;
