import React, { useState } from 'react';
import { ManuellOppgave } from '../types/manuellOppgaveTypes';
import { RuleNames, ValidationResultWithStatus, RuleNamesDescription } from '../types/validationresultTypes';
import EnRegel from './EnRegel';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Panel } from 'nav-frontend-paneler';
import './regel.less';
import { Knapp } from 'nav-frontend-knapper';
import checkCircle from '../svg/check-circle.svg';
import crossCircle from '../svg/cross-circle.svg';

interface FlereReglerProps {
  manOppgave: ManuellOppgave;
  setManOppgave: (value: React.SetStateAction<ManuellOppgave | null | undefined>) => void;
}

const FlereRegler = ({ manOppgave, setManOppgave }: FlereReglerProps) => {
  const [aktuellRegel, setAktuellRegel] = useState<RuleNames | undefined>();
  const [valideringsresultat, setValideringsresultat] = useState<ValidationResultWithStatus>(
    new ValidationResultWithStatus(manOppgave.validationResult),
  );

  const handterVurdering = (vurdering: boolean) => {
    if (aktuellRegel) {
      const vurdertRegel = new ValidationResultWithStatus(valideringsresultat);
      vurdertRegel.setBehandlet(aktuellRegel, vurdering);
      vurdertRegel.setRuleHitStatus(aktuellRegel, vurdering);
      setValideringsresultat(vurdertRegel);
      setAktuellRegel(undefined);
    }
  };

  const handterFerdigstill = () => {
    if (valideringsresultat.totalVurdering !== undefined) {
      const vurdertOppgave = new ManuellOppgave(manOppgave);
      vurdertOppgave.validationResult = valideringsresultat;
      vurdertOppgave.validationResult.setStatus(valideringsresultat.totalVurdering);
      setManOppgave(vurdertOppgave);
    } else {
      throw new Error('Oppgaven ble forsøkt ferdigstillt uten totalvurdering');
    }
  };

  const handterAvbryt = () => {
    setValideringsresultat(new ValidationResultWithStatus(manOppgave.validationResult));
  };

  if (!aktuellRegel) {
    return (
      <Panel tittel="En sykmelding må vurderes manuelt" border className="panel">
        <div className="arsak-wrapper" style={{ padding: '1rem' }}>
          <Systemtittel style={{ textAlign: 'center', marginBottom: '3rem' }}>
            En sykmelding må vurderes manuelt
          </Systemtittel>
          <Element>Årsaker til manuell vurdering</Element>
          {valideringsresultat.ruleHits.map((regel, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
              }}
            >
              <Normaltekst>
                {index + 1}. {RuleNamesDescription[regel.ruleName]}
              </Normaltekst>
              {valideringsresultat.behandlet.get(regel.ruleName) === undefined ? (
                <Knapp form="kompakt" style={{ marginLeft: '2rem' }} onClick={() => setAktuellRegel(regel.ruleName)}>
                  Vurder
                </Knapp>
              ) : (
                <img
                  src={valideringsresultat.behandlet.get(regel.ruleName) === false ? crossCircle : checkCircle}
                  style={{ marginLeft: '4rem', marginRight: '2rem' }}
                  alt={`${valideringsresultat.behandlet.get(regel.ruleName) ? 'checkmark' : 'cross'}`}
                />
              )}
            </div>
          ))}
          <div>
            <Knapp
              disabled={valideringsresultat.totalVurdering === undefined}
              style={{ marginRight: '1rem' }}
              onClick={() => handterFerdigstill()}
            >
              Ferdigstill
            </Knapp>
            <Knapp
              onClick={() => {
                handterAvbryt();
              }}
            >
              Nullstill vurderinger
            </Knapp>
          </div>
        </div>
      </Panel>
    );
  }

  return (
    <EnRegel
      sykmelding={manOppgave.sykmelding}
      regel={aktuellRegel}
      finnesFlereRegler
      handterAvgjorelse={handterVurdering}
      handterAvbryt={() => setAktuellRegel(undefined)}
    />
  );
};

export default FlereRegler;
