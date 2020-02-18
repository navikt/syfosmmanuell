import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, act, wait } from '@testing-library/react';
import FlereReglerController from '../components/FlereReglerController';
import { oppgaveFlereRegler } from '../mock/data/sykmelding';
import { ManuellOppgave } from '../types/manuellOppgaveTypes';
import { RuleNamesDescription } from '../types/validationresultTypes';

const setManOppgave = jest.fn();
let flereRegler = new ManuellOppgave(oppgaveFlereRegler[0]);

describe('flereReglerController', () => {
  afterEach(() => {
    setManOppgave.mockReset();
    flereRegler = new ManuellOppgave(oppgaveFlereRegler[0]);
  });

  it('Rendrer alle årsaker til manuell vurdering', () => {
    const { getByText, getAllByText } = render(
      <FlereReglerController manOppgave={flereRegler} setManOppgave={setManOppgave} />,
    );
    expect(
      getByText(RuleNamesDescription[flereRegler.validationResult.ruleHits[0].ruleName], { exact: false }),
    ).toBeInTheDocument();
    expect(
      getByText(RuleNamesDescription[flereRegler.validationResult.ruleHits[1].ruleName], { exact: false }),
    ).toBeInTheDocument();
    expect(getAllByText('Vurder').length).toBe(2);
  });

  it('Rendrer sykmelding når "vurder" trykkes', () => {
    const { getAllByText, getByText } = render(
      <FlereReglerController manOppgave={flereRegler} setManOppgave={setManOppgave} />,
    );
    const vurderknapp = getAllByText('Vurder')[0];
    fireEvent.click(vurderknapp);
    expect(getByText('Årsak til manuell vurdering:')).toBeInTheDocument();
    expect(
      getByText(RuleNamesDescription[flereRegler.validationResult.ruleHits[0].ruleName], { exact: false }),
    ).toBeInTheDocument();
  });

  it('Ferdigstill er grået ut frem til alle regler er vurdert.', async () => {
    const { getByText, getAllByText, getByLabelText } = render(
      <FlereReglerController manOppgave={flereRegler} setManOppgave={setManOppgave} />,
    );
    expect(getByText('Ferdigstill')).toHaveAttribute('disabled');
    let vurderingsknapper = getAllByText('Vurder');
    expect(vurderingsknapper).toHaveLength(2);
    await act(async () => {
      fireEvent.click(vurderingsknapper[0]);
      await wait(() => getByLabelText('Godkjenn', { exact: false }));
      fireEvent.click(getByLabelText('Godkjenn', { exact: false }));
      await wait(() => getByText('Lagre'));
      fireEvent.click(getByText('Lagre'));
    });
    expect(getByText('Ferdigstill')).toHaveAttribute('disabled');
    await act(async () => {
      vurderingsknapper = getAllByText('Vurder');
      expect(vurderingsknapper).toHaveLength(1);
      fireEvent.click(vurderingsknapper[0]);
      await wait(() => getByLabelText('Godkjenn', { exact: false }));
      fireEvent.click(getByLabelText('Godkjenn', { exact: false }));
      await wait(() => getByText('Lagre'));
      fireEvent.click(getByText('Lagre'));
    });
    expect(getByText('Ferdigstill')).not.toHaveAttribute('disabled');
  });

  it('setManOppgave kalles med true når alle regler er vurdert til godkjent', async () => {
    const { getByText, getAllByText, getByLabelText } = render(
      <FlereReglerController manOppgave={flereRegler} setManOppgave={setManOppgave} />,
    );

    const valideringsresultat = {
      antallBehandlet: 2,
      behandlet: {},
      ruleHits: [
        {
          messageForSender:
            'Sykmeldingen er tilbakedatert uten at det kommer tydelig nok frem hvorfor dette var nødvendig. Sykmeldingen er derfor avvist. Pasienten har fått beskjed.',
          messageForUser: 'Sykmeldingen er tilbakedatert uten at det kommer tydelig frem hvorfor dette var nødvendig.',
          ruleName: 'TILBAKEDATERT_MER_ENN_8_DAGER_FORSTE_SYKMELDING_MED_BEGRUNNELSE',
          ruleStatus: 'OK',
        },
        {
          messageForSender:
            'Sykmeldingen er tilbakedatert uten at det kommer tydelig nok frem hvorfor dette var nødvendig. Sykmeldingen er derfor avvist. Pasienten har fått beskjed.',
          messageForUser: 'Sykmeldingen er tilbakedatert uten at det kommer tydelig frem hvorfor dette var nødvendig.',
          ruleName: 'TILBAKEDATERT_MED_BEGRUNNELSE_FORLENGELSE',
          ruleStatus: 'OK',
        },
      ],
      status: 'OK',
      totalVurdering: true,
    };

    expect(getByText('Ferdigstill')).toHaveAttribute('disabled');
    let vurderingsknapper = getAllByText('Vurder');
    expect(vurderingsknapper).toHaveLength(2);
    await act(async () => {
      fireEvent.click(vurderingsknapper[0]);
      await wait(() => getByLabelText('Godkjenn', { exact: false }));
      fireEvent.click(getByLabelText('Godkjenn', { exact: false }));
      await wait(() => getByText('Lagre'));
      fireEvent.click(getByText('Lagre'));
    });
    expect(getByText('Ferdigstill')).toHaveAttribute('disabled');
    await act(async () => {
      vurderingsknapper = getAllByText('Vurder');
      expect(vurderingsknapper).toHaveLength(1);
      fireEvent.click(vurderingsknapper[0]);
      await wait(() => getByLabelText('Godkjenn', { exact: false }));
      fireEvent.click(getByLabelText('Godkjenn', { exact: false }));
      await wait(() => getByText('Lagre'));
      fireEvent.click(getByText('Lagre'));
    });
    expect(getByText('Ferdigstill')).not.toHaveAttribute('disabled');
    act(() => {
      fireEvent.click(getByText('Ferdigstill'));
    });
    expect(setManOppgave).toHaveBeenCalledTimes(1);
    const argumentTilMockFunksjon = setManOppgave.mock.calls[0];
    expect(JSON.parse(JSON.stringify(argumentTilMockFunksjon[0].validationResult))).toEqual(valideringsresultat);
  });

  it('setManOppgave kalles med false når én regel er vurdert til avvist', async () => {
    const { getByText, getAllByText, getByLabelText } = render(
      <FlereReglerController manOppgave={flereRegler} setManOppgave={setManOppgave} />,
    );

    const valideringsresultat = {
      antallBehandlet: 2,
      behandlet: {},
      ruleHits: [
        {
          messageForSender:
            'Sykmeldingen er tilbakedatert uten at det kommer tydelig nok frem hvorfor dette var nødvendig. Sykmeldingen er derfor avvist. Pasienten har fått beskjed.',
          messageForUser: 'Sykmeldingen er tilbakedatert uten at det kommer tydelig frem hvorfor dette var nødvendig.',
          ruleName: 'TILBAKEDATERT_MER_ENN_8_DAGER_FORSTE_SYKMELDING_MED_BEGRUNNELSE',
          ruleStatus: 'INVALID',
        },
        {
          messageForSender:
            'Sykmeldingen er tilbakedatert uten at det kommer tydelig nok frem hvorfor dette var nødvendig. Sykmeldingen er derfor avvist. Pasienten har fått beskjed.',
          messageForUser: 'Sykmeldingen er tilbakedatert uten at det kommer tydelig frem hvorfor dette var nødvendig.',
          ruleName: 'TILBAKEDATERT_MED_BEGRUNNELSE_FORLENGELSE',
          ruleStatus: 'OK',
        },
      ],
      status: 'INVALID',
      totalVurdering: false,
    };

    expect(getByText('Ferdigstill')).toHaveAttribute('disabled');
    let vurderingsknapper = getAllByText('Vurder');
    expect(vurderingsknapper).toHaveLength(2);
    await act(async () => {
      fireEvent.click(vurderingsknapper[0]);
      await wait(() => getByLabelText('Avvis', { exact: false }));
      fireEvent.click(getByLabelText('Avvis', { exact: false }));
      await wait(() => getByText('Lagre'));
      fireEvent.click(getByText('Lagre'));
    });
    expect(getByText('Ferdigstill')).toHaveAttribute('disabled');
    await act(async () => {
      vurderingsknapper = getAllByText('Vurder');
      expect(vurderingsknapper).toHaveLength(1);
      fireEvent.click(vurderingsknapper[0]);
      await wait(() => getByLabelText('Godkjenn', { exact: false }));
      fireEvent.click(getByLabelText('Godkjenn', { exact: false }));
      await wait(() => getByText('Lagre'));
      fireEvent.click(getByText('Lagre'));
    });
    expect(getByText('Ferdigstill')).not.toHaveAttribute('disabled');
    act(() => {
      fireEvent.click(getByText('Ferdigstill'));
    });

    expect(setManOppgave).toHaveBeenCalledTimes(1);
    const argumentTilMockFunksjon = setManOppgave.mock.calls[0];
    expect(JSON.parse(JSON.stringify(argumentTilMockFunksjon[0].validationResult))).toEqual(valideringsresultat);
  });

  it('Nullstill vurderinger gjør at vurderknapper kommer tilbake', async () => {
    const { getByText, getAllByText, getByLabelText } = render(
      <FlereReglerController manOppgave={flereRegler} setManOppgave={setManOppgave} />,
    );
    expect(getByText('Ferdigstill')).toHaveAttribute('disabled');
    let vurderingsknapper = getAllByText('Vurder');
    expect(vurderingsknapper).toHaveLength(2);
    await act(async () => {
      fireEvent.click(vurderingsknapper[0]);
      await wait(() => getByLabelText('Avvis', { exact: false }));
      fireEvent.click(getByLabelText('Avvis', { exact: false }));
      await wait(() => getByText('Lagre'));
      fireEvent.click(getByText('Lagre'));
    });
    expect(getByText('Ferdigstill')).toHaveAttribute('disabled');
    await act(async () => {
      vurderingsknapper = getAllByText('Vurder');
      expect(vurderingsknapper).toHaveLength(1);
      fireEvent.click(vurderingsknapper[0]);
      await wait(() => getByLabelText('Godkjenn', { exact: false }));
      fireEvent.click(getByLabelText('Godkjenn', { exact: false }));
      await wait(() => getByText('Lagre'));
      fireEvent.click(getByText('Lagre'));
    });
    act(() => {
      fireEvent.click(getByText('Nullstill vurderinger'));
    });
    expect(getAllByText('Vurder')).toHaveLength(2);
  });
});
