import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useAppStore } from '../store/AppStore';
import InfoHeader from '../components/InfoHeader';
import { renderHook } from '@testing-library/react-hooks';
import { act } from '@testing-library/react';
import useManOppgBehandling from '../hooks/useManOppgBehandling';
import { mount, shallow } from 'enzyme';
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { sykmeldingFlereRegler } from '../mock/data/sykmelding-flere-regler';
configure({ adapter: new Adapter() });

import constate from 'constate';
import { ManuellOppgave } from '../types/ManuellOppgaveTypes';

jest.mock('nav-frontend-typografi-style', () => ({})); // Mock import av less. Finner ingen annen måte å gjøre det på.

describe('InfoHeader', () => {
    test('Viser: Oppgaven(e) er enten løst, eller så finnes det ikke noen oppgave på denne personen. dersom ikke manOppgaver er satt', () => {
        const useConstate = constate(useManOppgBehandling);
        const App = () => (
            <useConstate.Provider>
                <InfoHeader />
            </useConstate.Provider>
        );
        const { getByText } = render(<App />);
        expect(
            getByText('Oppgaven(e) er enten løst, eller så finnes det ikke noen oppgave på denne personen.'),
        ).toBeDefined();
    });
    test.skip('Viser: "Alle manuelle oppgaver er løst" dersom manOppgaver finnes, aktuellManOppgave ikke er satt, og oppgaverLoest er lik lengden av manOppgaver', () => {
        const useConstate = constate(useManOppgBehandling);
        const SetOppgaver = () => {
            const { setManOppgaver, setAktuellManOppgave } = useConstate();
            setManOppgaver(sykmeldingFlereRegler.map(sm => new ManuellOppgave(sm)));
            return <div></div>;
        };

        const App = () => (
            <useConstate.Provider>
                <SetOppgaver />
                <InfoHeader />
            </useConstate.Provider>
        );
        const { getByText } = render(<App />);
        expect(getByText('Alle manuelle oppgaver er løst')).toBeDefined();
    });
});

test.skip('constate', () => {
    const useConstate = constate(useManOppgBehandling);
    const SetIsLoading = ({ state: boolean }) => {
        const { setIsLoading } = useConstate();
        return <button onClick={setIsLoading(state)}>setIsLoading</button>;
    };
    const Loading = () => {
        const { isLoading } = useConstate();
        return <p>isloading {isLoading ? 'true' : 'false'}</p>;
    };
    const state = false;
    const App = () => (
        <useConstate.Provider>
            <SetIsLoading state={state} />
            <Loading />
        </useConstate.Provider>
    );
    const { getByText } = render(<App />);
    expect(getByText('isloading: true')).toBeDefined();
});

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
    const {} = useAppStore();

    return <p>hello</p>;
};

describe('InfoHeader', () => {
    beforeEach(() => {});

    test.skip('Dersom ingen opppgaver finnes, vis: Oppgavene(e) er enten løst...', () => {
        const store = shallow(<ConstateComp />);

        const { getByText } = render(
            <useAppStore.Provider>
                <InfoHeader />
            </useAppStore.Provider>,
        );
        expect(
            getByText('Oppgaven(e) er enten løst, eller så finnes det ikke noen oppgave på denne personen.'),
        ).toBeInTheDocument();
        act(() => {
            const { setIsLoading } = useAppStore();
            setIsLoading(true);
        });
    });
});

test('test', () => {
    const { getByText } = render(
        <myContext.Provider value={1}>
            <MyComp />
        </myContext.Provider>,
    );

    expect(getByText('hello context 1')).toBeInTheDocument();
});
