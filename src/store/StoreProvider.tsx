import * as React from 'react';
import { useAppStore } from './AppStore';

interface StoreProviderProps {
    children: React.ReactNode;
}

const StoreProvider: React.FC = (props: StoreProviderProps) => {
    return <useAppStore.Provider>{props.children}</useAppStore.Provider>;
};

export default StoreProvider;
