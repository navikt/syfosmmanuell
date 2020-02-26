import React, { useState } from 'react';
import { ManuellOppgave } from '../types/manuellOppgaveTypes';
import { RuleNames, ValidationResultWithStatus, RuleNamesDescription } from '../types/validationresultTypes';
import EnRegel from './EnRegel';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Panel } from 'nav-frontend-paneler';
import './FlereReglerController.less';
import { Knapp } from 'nav-frontend-knapper';
import checkCircle from '../svg/check-circle.svg';
import crossCircle from '../svg/cross-circle.svg';

interface FlereReglerControllerProps {
  manOppgave: ManuellOppgave;
  setManOppgave: (value: React.SetStateAction<ManuellOppgave | null | undefined>) => void;
}

const FlereReglerController = ({ manOppgave, setManOppgave }: FlereReglerControllerProps) => {
  const [aktuellRegel, setAktuellRegel] = useState<RuleNames | undefined>();
  const [valideringsresultat, setValideringsresultat] = useState<ValidationResultWithStatus>(
    new ValidationResultWithStatus(manOppgave.validationResult),
  );

  const handterVurdering = (vurdering: boolean) => {
    if (aktuellRegel) {
      const vurdertRegel = new ValidationResultWithStatus(valideringsresultat);
      vurdertRegel.setBehandlet(aktuellRegel, vurdering);
      vurdertRegel.setRuleHitStatus(aktuellRegel, vurdering);
      //console.log(vurdertRegel)
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
      throw new Error('Oppgaven ble forsøkt ferdigstilt uten totalvurdering');
    }
  };

  const handterAvbryt = () => {
    setValideringsresultat(new ValidationResultWithStatus(manOppgave.validationResult));
  };

  if (!aktuellRegel) {
    return (
      <Panel border className="panel">
        <Element>Årsaker til manuell vurdering</Element>
        {valideringsresultat.ruleHits.map((regel, index) => (
          <div key={index} className="panel__element">
            <Normaltekst>
              {index + 1}. {RuleNamesDescription[regel.ruleName]}
            </Normaltekst>
            {valideringsresultat.behandlet.get(regel.ruleName) === undefined ? (
              <Knapp form="kompakt" className="knapp--margin-left" onClick={() => setAktuellRegel(regel.ruleName)}>
                Vurder
              </Knapp>
            ) : (
              <img
                src={valideringsresultat.behandlet.get(regel.ruleName) === false ? crossCircle : checkCircle}
                className="validert-bilde"
                alt={`${valideringsresultat.behandlet.get(regel.ruleName) ? 'checkmark' : 'cross'}`}
              />
            )}
          </div>
        ))}
        <div className="knapper">
          <Knapp
            disabled={valideringsresultat.totalVurdering === undefined}
            className="knapp--margin-right"
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
      </Panel>
    );
  }

  return (
    <EnRegel
      receivedSykmelding={manOppgave.receivedSykmelding}
      regel={aktuellRegel}
      finnesFlereRegler
      handterAvgjorelse={handterVurdering}
      handterAvbryt={() => setAktuellRegel(undefined)}
    />
  );
};

export default FlereReglerController;
