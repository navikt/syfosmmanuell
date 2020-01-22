import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, wait } from '@testing-library/react';
import { oppgaveEnRegel, oppgaveFlereRegler } from '../mock/data/sykmelding';
import App from '../components/App';
import FetchMock, { SpyMiddleware } from 'yet-another-fetch-mock';

describe('app', () => {
  let mock: FetchMock;
  let spy: SpyMiddleware;

  beforeEach(() => {
    spy = new SpyMiddleware();
    mock = FetchMock.configure({
      middleware: spy.middleware,
    });
    expect(spy.size()).toBe(0);
  });

  afterEach(() => {
    mock.restore();
  });

  it('Rendrer app', () => {
    render(<App />);
  });

  it('Kaller endepunkt for henting av manuell oppgave', async () => {
    mock.get('https://syfosmmanuell.nais.preprod.local/backend/api/v1/hentManuellOppgave/', oppgaveEnRegel);
    const { getByText } = render(<App />);

    await wait(() => getByText('Årsak til manuell vurdering:', { exact: false }));
    expect(spy.size()).toBe(1);
    expect(spy.lastUrl()).toBe('https://syfosmmanuell.nais.preprod.local/backend/api/v1/hentManuellOppgave/');
  });

  it('Rendrer visning for én regel dersom oppgaven har ett regelutfall', async () => {
    mock.get('https://syfosmmanuell.nais.preprod.local/backend/api/v1/hentManuellOppgave/', oppgaveEnRegel);
    const { getByText } = render(<App />);

    await wait(() => getByText('Årsak til manuell vurdering:', { exact: false }));
    expect(getByText('Årsak til manuell vurdering:', { exact: false })).toBeInTheDocument();
  });

  it('Rendrer visning for flere regler dersom oppgaven har to eller flere regelutfall', async () => {
    mock.get('https://syfosmmanuell.nais.preprod.local/backend/api/v1/hentManuellOppgave/', oppgaveFlereRegler);
    const { getByText } = render(<App />);

    await wait(() => getByText('Årsaker til manuell vurdering', { exact: false }));
    expect(getByText('Årsaker til manuell vurdering', { exact: false })).toBeInTheDocument();
  });

  // TODO: Lag test for å sjekke hva som skjer når handterAvgjorlse kalles
  /* 
    const valideringsresultat = new ValidationResult(flereRegler.validationResult);
    valideringsresultat.setStatus(true);
    valideringsresultat.setTilbakemeldinger(); 
  */
});
