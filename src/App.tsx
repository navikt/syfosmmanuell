import * as React from 'react';
import StoreProvider from './store/StoreProvider';
import { DataFetcher } from './components/DataFetcher';
import EkspanderbartPanel from './components/EkspanderbartPanel';
import Progresjon from './components/Progresjon';
import './App.less';

const App: React.FC = () => (
    <StoreProvider>
        <DataFetcher>
            <Progresjon />
            <EkspanderbartPanel />
        </DataFetcher>
    </StoreProvider>
);

export default App;
