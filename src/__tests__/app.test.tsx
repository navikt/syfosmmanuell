import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, wait, act, fireEvent } from '@testing-library/react';
import { oppgaveEnRegel, oppgaveFlereRegler } from '../mock/data/sykmelding';
import App from '../components/App';
import FetchMock, { SpyMiddleware } from 'yet-another-fetch-mock';

describe.skip('app', () => {
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

  it('Kaller endepunkt for henting av manuell oppgave kun én gang dersom man får 403', async () => {
    mock.get('https://syfosmmanuell.nais.preprod.local/backend/api/v1/hentManuellOppgave/', () =>
      Promise.resolve({ status: 403 }),
    );
    const { getByText } = render(<App />);

    await wait(() => getByText('Feil ved henting av oppgave. Feilkode: 403', { exact: false }));
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
    it('Sender riktig HTTP request når valideringsresultat skal være OK', async () => {
      mock.get('https://syfosmmanuell.nais.preprod.local/backend/api/v1/hentManuellOppgave/', oppgaveEnRegel);
      mock.put('https://syfosmmanuell.nais.preprod.local/backend/api/v1/vurderingmanuelloppgave/', {});

      const valideringsresultat = {
        ruleHits: [
          {
            messageForSender:
              'Sykmeldingen er tilbakedatert uten at det kommer tydelig nok frem hvorfor dette var nødvendig. Sykmeldingen er derfor avvist. Pasienten har fått beskjed.',
            messageForUser:
              'Sykmeldingen er tilbakedatert uten at det kommer tydelig frem hvorfor dette var nødvendig.',
            ruleName: 'TILBAKEDATERT_MER_ENN_8_DAGER_FORSTE_SYKMELDING_MED_BEGRUNNELSE',
            ruleStatus: 'MANUAL_PROCESSING',
          },
        ],
        status: 'OK',
      };

      const { getByLabelText, getByText } = render(<App />);

      await wait(() => getByLabelText('Godkjenn', { exact: false }));
      act(() => {
        fireEvent.click(getByLabelText('Godkjenn', { exact: false }));
      });
      await wait(() => getByText('Ferdigstill'));
      act(() => {
        fireEvent.click(getByText('Ferdigstill'));
      });
      await wait(() => getByText('Oppgaven ble ferdigstilt', { exact: false }));
      expect(spy.size()).toBe(2);
      expect(spy.lastUrl()).toBe('https://syfosmmanuell.nais.preprod.local/backend/api/v1/vurderingmanuelloppgave/');
      expect(spy.lastCall()?.request.body).toEqual(valideringsresultat);
    });

    it('Sender riktig HTTP request når valideringsresultat skal være INVALID', async () => {
      mock.get('https://syfosmmanuell.nais.preprod.local/backend/api/v1/hentManuellOppgave/', oppgaveEnRegel);
      mock.put('https://syfosmmanuell.nais.preprod.local/backend/api/v1/vurderingmanuelloppgave/', {});

      const valideringsresultat = {
        ruleHits: [
          {
            messageForSender:
              'Sykmeldingen er tilbakedatert uten at det kommer tydelig nok frem hvorfor dette var nødvendig. Sykmeldingen er derfor avvist. Pasienten har fått beskjed.',
            messageForUser:
              'Sykmeldingen er tilbakedatert uten at det kommer tydelig frem hvorfor dette var nødvendig.',
            ruleName: 'TILBAKEDATERT_MER_ENN_8_DAGER_FORSTE_SYKMELDING_MED_BEGRUNNELSE',
            ruleStatus: 'MANUAL_PROCESSING',
          },
        ],
        status: 'INVALID',
      };

      const { getByLabelText, getByText } = render(<App />);

      await wait(() => getByLabelText('Avvis', { exact: false }));
      act(() => {
        fireEvent.click(getByLabelText('Avvis', { exact: false }));
      });
      await wait(() => getByText('Ferdigstill'));
      act(() => {
        fireEvent.click(getByText('Ferdigstill'));
      });
      await wait(() => getByText('Oppgaven ble ferdigstilt', { exact: false }));
      expect(spy.size()).toBe(2);
      expect(spy.lastUrl()).toBe('https://syfosmmanuell.nais.preprod.local/backend/api/v1/vurderingmanuelloppgave/');
      expect(spy.lastCall()?.request.body).toEqual(valideringsresultat);
    });

    it('Prøver kun å ferdigstille oppgaven én gang dersom man får 403', async () => {
      mock.get('https://syfosmmanuell.nais.preprod.local/backend/api/v1/hentManuellOppgave/', oppgaveEnRegel);
      mock.put('https://syfosmmanuell.nais.preprod.local/backend/api/v1/vurderingmanuelloppgave/', () =>
        Promise.resolve({ status: 403 }),
      );

      const valideringsresultat = {
        ruleHits: [
          {
            messageForSender:
              'Sykmeldingen er tilbakedatert uten at det kommer tydelig nok frem hvorfor dette var nødvendig. Sykmeldingen er derfor avvist. Pasienten har fått beskjed.',
            messageForUser:
              'Sykmeldingen er tilbakedatert uten at det kommer tydelig frem hvorfor dette var nødvendig.',
            ruleName: 'TILBAKEDATERT_MER_ENN_8_DAGER_FORSTE_SYKMELDING_MED_BEGRUNNELSE',
            ruleStatus: 'MANUAL_PROCESSING',
          },
        ],
        status: 'OK',
      };

      const { getByLabelText, getByText } = render(<App />);

      await wait(() => getByLabelText('Godkjenn', { exact: false }));
      act(() => {
        fireEvent.click(getByLabelText('Godkjenn', { exact: false }));
      });
      await wait(() => getByText('Ferdigstill'));
      act(() => {
        fireEvent.click(getByText('Ferdigstill'));
      });
      await wait(() => getByText('Feil ved ferdigstilling av oppgaven. Feilkode: 403', { exact: false }));
      expect(spy.size()).toBe(2);
      expect(spy.lastUrl()).toBe('https://syfosmmanuell.nais.preprod.local/backend/api/v1/vurderingmanuelloppgave/');
      expect(spy.lastCall()?.request.body).toEqual(valideringsresultat);
    });
  });
});
