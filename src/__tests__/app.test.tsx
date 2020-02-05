import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, wait, act, fireEvent } from '@testing-library/react';
import { oppgaveEnRegel, oppgaveFlereRegler } from '../mock/data/sykmelding';
import App from '../components/App';
import FetchMock, { SpyMiddleware } from 'yet-another-fetch-mock';
import { ValidationResult } from '../types/validationresultTypes';

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

  describe('Innsending av vurdering', () => {
    it('Handteravgjorelse sender riktig HTTP request når valideringsresultat skal være OK', async () => {
      mock.get('https://syfosmmanuell.nais.preprod.local/backend/api/v1/hentManuellOppgave/', oppgaveEnRegel);
      mock.put('https://syfosmmanuell.nais.preprod.local/backend/api/v1/vurderingmanuelloppgave/', {});

      const valideringsresultat = new ValidationResult(oppgaveEnRegel[0].validationResult);
      valideringsresultat.setStatus(true);
      valideringsresultat.setTilbakemeldinger();
      const { getByLabelText, getByText } = render(<App />);

      await wait(() => getByLabelText('Godkjenn', { exact: false }));
      act(() => {
        fireEvent.click(getByLabelText('Godkjenn', { exact: false }));
      });
      await wait(() => getByText('Ferdigstill'));
      act(() => {
        fireEvent.click(getByText('Ferdigstill'));
      });
      await wait(() => getByText('Oppagven ble ferdigstillt', { exact: false }));
      expect(spy.size()).toBe(2);
      expect(spy.lastUrl()).toBe('https://syfosmmanuell.nais.preprod.local/backend/api/v1/vurderingmanuelloppgave/');
      expect(spy.lastCall()?.request.body).toEqual(JSON.parse(JSON.stringify(valideringsresultat))); // Må parses slik for at det ikke skal klages på typescript-typer
    });

    it('Handteravgjorelse sender riktig HTTP request når valideringsresultat skal være INVALID', async () => {
      mock.get('https://syfosmmanuell.nais.preprod.local/backend/api/v1/hentManuellOppgave/', oppgaveEnRegel);
      mock.put('https://syfosmmanuell.nais.preprod.local/backend/api/v1/vurderingmanuelloppgave/', {});

      const valideringsresultat = new ValidationResult(oppgaveEnRegel[0].validationResult);
      valideringsresultat.setStatus(false);
      valideringsresultat.setTilbakemeldinger();
      const { getByLabelText, getByText } = render(<App />);

      await wait(() => getByLabelText('Avvis', { exact: false }));
      act(() => {
        fireEvent.click(getByLabelText('Avvis', { exact: false }));
      });
      await wait(() => getByText('Ferdigstill'));
      act(() => {
        fireEvent.click(getByText('Ferdigstill'));
      });
      await wait(() => getByText('Oppagven ble ferdigstillt', { exact: false }));
      expect(spy.size()).toBe(2);
      expect(spy.lastUrl()).toBe('https://syfosmmanuell.nais.preprod.local/backend/api/v1/vurderingmanuelloppgave/');
      expect(spy.lastCall()?.request.body).toEqual(JSON.parse(JSON.stringify(valideringsresultat))); // Må parses slik for at det ikke skal klages på typescript-typer
    });
  });
});
