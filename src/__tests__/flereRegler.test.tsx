import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FlereRegler from '../components/FlereRegler';

import { oppgaveFlereRegler } from '../mock/data/sykmelding';
import { ManuellOppgave } from '../types/manuellOppgaveTypes';

const handterAvgjorelse = jest.fn();
const flereRegler = new ManuellOppgave(oppgaveFlereRegler);

describe('flereRegler', () => {
    it('Rendrer alle årsaker til manuell vurdering', () => {
        const { getByText, getAllByText } = render(
            <FlereRegler manOppgave={flereRegler} handterAvgjorelse={handterAvgjorelse} />,
        );
        expect(getByText(flereRegler.validationResult.ruleHits[0].ruleName, { exact: false })).toBeInTheDocument();
        expect(getByText(flereRegler.validationResult.ruleHits[1].ruleName, { exact: false })).toBeInTheDocument();
        expect(getByText(flereRegler.validationResult.ruleHits[2].ruleName, { exact: false })).toBeInTheDocument();
        expect(getAllByText('Vurder').length).toBe(3);
    });

    it('Rendrer sykmelding når "vurder" trykkes', () => {
        const { getAllByText, getByText } = render(
            <FlereRegler manOppgave={flereRegler} handterAvgjorelse={handterAvgjorelse} />,
        );
        const vurderknapp = getAllByText('Vurder')[0];
        fireEvent.click(vurderknapp);
        expect(getByText('Årsak til manuell vurdering:')).toBeInTheDocument();
        expect(getByText(flereRegler.validationResult.ruleHits[0].ruleName, { exact: false })).toBeInTheDocument();
    });
});
