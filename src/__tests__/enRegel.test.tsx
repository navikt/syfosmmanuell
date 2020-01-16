import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EnRegel from '../components/EnRegel';
import { oppgaveEnRegel } from '../mock/data/sykmelding';
import { ManuellOppgave } from '../types/manuellOppgaveTypes';

const handterAvgjorelse = jest.fn();
const handterAvbryt = jest.fn();

const enRegel = new ManuellOppgave(oppgaveEnRegel[0]);

beforeEach(() => {
    jest.clearAllMocks();
});

describe('enRegel', () => {
    it('Rendrer riktig årsak', () => {
        const { getByText } = render(
            <EnRegel
                sykmelding={enRegel.sykmelding}
                regel={enRegel.validationResult.ruleHits[0].ruleName}
                handterAvgjorelse={handterAvgjorelse}
                handterAvbryt={handterAvbryt}
            />,
        );
        expect(getByText('Årsak til manuell vurdering:')).toBeInTheDocument();
        expect(getByText(enRegel.validationResult.ruleHits[0].ruleName, { exact: false })).toBeInTheDocument();
    });

    it('Kaller handterAvbryt når "avbryt" trykkes', () => {
        const { getByText } = render(
            <EnRegel
                sykmelding={enRegel.sykmelding}
                regel={enRegel.validationResult.ruleHits[0].ruleName}
                handterAvgjorelse={handterAvgjorelse}
                handterAvbryt={handterAvbryt}
            />,
        );
        const avbrytknapp = getByText('Avbryt');
        fireEvent.click(avbrytknapp);
        expect(handterAvbryt).toHaveBeenCalledTimes(1);
    });

    it('Kaller handterAvgjorelse med argument "true" når oppgaven godkjennes', () => {
        const { getByText, getByLabelText } = render(
            <EnRegel
                sykmelding={enRegel.sykmelding}
                regel={enRegel.validationResult.ruleHits[0].ruleName}
                handterAvgjorelse={handterAvgjorelse}
                handterAvbryt={handterAvbryt}
            />,
        );
        const godkjennRadioknapp = getByLabelText('Godkjenn', { exact: false });
        fireEvent.click(godkjennRadioknapp);
        const lagreknapp = getByText('Ferdigstill');
        fireEvent.click(lagreknapp);
        expect(handterAvgjorelse).toHaveBeenCalledTimes(1);
        expect(handterAvgjorelse).toHaveBeenCalledWith(true);
    });

    it('Kaller handterAvgjorelse med argument "false" når oppgaven avvises', () => {
        const { getByText, getByLabelText } = render(
            <EnRegel
                sykmelding={enRegel.sykmelding}
                regel={enRegel.validationResult.ruleHits[0].ruleName}
                handterAvgjorelse={handterAvgjorelse}
                handterAvbryt={handterAvbryt}
            />,
        );
        const godkjennRadioknapp = getByLabelText('Avvis', { exact: false });
        fireEvent.click(godkjennRadioknapp);
        const lagreknapp = getByText('Ferdigstill');
        fireEvent.click(lagreknapp);
        expect(handterAvgjorelse).toHaveBeenCalledTimes(1);
        expect(handterAvgjorelse).toHaveBeenCalledWith(false);
    });

    it('Viser hele sykmeldingen når "vis hele sykmeldingen" trykkes', () => {
        const { getByText, getAllByText } = render(
            <EnRegel
                sykmelding={enRegel.sykmelding}
                regel={enRegel.validationResult.ruleHits[0].ruleName}
                handterAvgjorelse={handterAvgjorelse}
                handterAvbryt={handterAvbryt}
            />,
        );
        const visHeleKnapp = getByText('Vis hele sykmeldingen');
        fireEvent.click(visHeleKnapp);
        const skjulHeleKnapper = getAllByText('Skjul hele sykmeldingen');
        expect(skjulHeleKnapper.length).toBe(2);
    });
});
