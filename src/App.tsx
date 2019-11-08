import * as React from 'react';
import StoreProvider from './store/StoreProvider';
import { DataFetcher } from './components/DataFetcher';
import Ekspanderbar from './components/Ekspanderbar';
import InfoHeader from './components/InfoHeader';
import './App.less';

const App: React.FC = () => (
    <StoreProvider>
        <DataFetcher>
            <InfoHeader />
            <Ekspanderbar />
        </DataFetcher>
    </StoreProvider>
);

export default App;
