import * as React from 'react';
import { useAppStore } from '../store/AppStore';
import { useEffect } from 'react';

const TestComponent: React.FC = () => {
    const { manOppgaver, aktuellArsak, aktuellManOppgave } = useAppStore();

    return <>{JSON.stringify(manOppgaver[0].manOppgId)}</>;
};

export default TestComponent;
