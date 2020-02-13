import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, fireEvent, act, wait } from '@testing-library/react';
import FlereRegler from '../components/FlereRegler';
import { oppgaveFlereRegler } from '../mock/data/sykmelding';
import { ManuellOppgave } from '../types/manuellOppgaveTypes';
import { RuleNamesDescription } from '../types/validationresultTypes';

const setManOppgave = jest.fn();
let flereRegler = new ManuellOppgave(oppgaveFlereRegler[0]);

describe('flereRegler', () => {
  afterEach(() => {
    setManOppgave.mockReset();
    flereRegler = new ManuellOppgave(oppgaveFlereRegler[0]);
  });

  it('Rendrer alle årsaker til manuell vurdering', () => {
    const { getByText, getAllByText } = render(<FlereRegler manOppgave={flereRegler} setManOppgave={setManOppgave} />);
    expect(
      getByText(RuleNamesDescription[flereRegler.validationResult.ruleHits[0].ruleName], { exact: false }),
    ).toBeInTheDocument();
    expect(
      getByText(RuleNamesDescription[flereRegler.validationResult.ruleHits[1].ruleName], { exact: false }),
    ).toBeInTheDocument();
    expect(getAllByText('Vurder').length).toBe(2);
  });

  it('Rendrer sykmelding når "vurder" trykkes', () => {
    const { getAllByText, getByText } = render(<FlereRegler manOppgave={flereRegler} setManOppgave={setManOppgave} />);
    const vurderknapp = getAllByText('Vurder')[0];
    fireEvent.click(vurderknapp);
    expect(getByText('Årsak til manuell vurdering:')).toBeInTheDocument();
    expect(
      getByText(RuleNamesDescription[flereRegler.validationResult.ruleHits[0].ruleName], { exact: false }),
    ).toBeInTheDocument();
  });

  it('Ferdigstill er grået ut frem til alle regler er vurdert.', async () => {
    const { getByText, getAllByText, getByLabelText } = render(
      <FlereRegler manOppgave={flereRegler} setManOppgave={setManOppgave} />,
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
      <FlereRegler manOppgave={flereRegler} setManOppgave={setManOppgave} />,
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
    act(() => {
      fireEvent.click(getByText('Ferdigstill'));
    });
    expect(setManOppgave).toHaveBeenCalledTimes(1);
  });

  it('setManOppgave kalles med false når én regel er vurdert til avvist', async () => {
    const { getByText, getAllByText, getByLabelText } = render(
      <FlereRegler manOppgave={flereRegler} setManOppgave={setManOppgave} />,
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
    expect(getByText('Ferdigstill')).not.toHaveAttribute('disabled');
    act(() => {
      fireEvent.click(getByText('Ferdigstill'));
    });

    expect(setManOppgave).toHaveBeenCalledTimes(1);
  });

  it('Nullstill vurderinger gjør at vurderknapper kommer tilbake', async () => {
    const { getByText, getAllByText, getByLabelText } = render(
      <FlereRegler manOppgave={flereRegler} setManOppgave={setManOppgave} />,
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
