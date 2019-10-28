import * as React from 'react';
import StoreProvider from './store/StoreProvider';
import { DataFetcher } from './components/DataFetcher';
import EkspanderbartPanel from './components/EkspanderbartPanel';
import InfoHeader from './components/InfoHeader';
import './App.less';

const App: React.FC = () => (
    <StoreProvider>
        <DataFetcher>
            <InfoHeader />
            <EkspanderbartPanel />
        </DataFetcher>
    </StoreProvider>
);

export default App;
