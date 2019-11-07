import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useAppStore } from '../store/AppStore';
import InfoHeader from '../components/InfoHeader';

jest.mock('nav-frontend-typografi-style', () => ({})); // Mock import av less. Finner ingen annen måte å gjøre det på.

const myContext = React.createContext(null);

const MyComp = () => {
    const context = React.useContext(myContext);
    return (
        <p>
            {context === 1 && 'hello context 1'}
            {context === 2 && 'hello context 2'}
        </p>
    );
};

const ConstateComp = () => {
    const { manOppgaver } = useAppStore();
    return (
        <div>
            {!!manOppgaver && 'hello constate'}
            {!!!manOppgaver && 'no constate'}
        </div>
    );
};

test('test', () => {
    const { getByText } = render(
        <myContext.Provider value={1}>
            <MyComp />
        </myContext.Provider>,
    );

    expect(getByText('hello context 1')).toBeInTheDocument();
});

test.skip('Dersom ingen opppgaver finnes, vis: Oppgavene(e) er enten løst...', () => {
    const { getByText } = render(
        <useAppStore.Provider>
            <InfoHeader />
        </useAppStore.Provider>,
    );

    expect(getByText('no constate')).toBeInTheDocument();
});
