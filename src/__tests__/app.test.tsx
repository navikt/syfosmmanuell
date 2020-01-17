import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EnRegel from '../components/EnRegel';
import { oppgaveEnRegel } from '../mock/data/sykmelding';
import { ManuellOppgave } from '../types/manuellOppgaveTypes';
import { RuleNamesDescription } from '../types/validationresultTypes';
import App from '../components/App';

const handterAvgjorelse = jest.fn();
const handterAvbryt = jest.fn();

const enRegel = new ManuellOppgave(oppgaveEnRegel[0]);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('app', () => {
  it('Rendrer app', () => {
    const { getByText } = render(<App />);
  });
});
