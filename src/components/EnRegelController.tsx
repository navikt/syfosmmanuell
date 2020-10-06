import React from 'react';
import { ManuellOppgave } from '../types/manuellOppgaveTypes';
import EnRegel from './EnRegel';

interface EnRegelControllerProps {
  manuellOppgave: ManuellOppgave;
  setManOppgave: (value: React.SetStateAction<ManuellOppgave | null | undefined>) => void;
}

const EnRegelController = ({ manuellOppgave, setManOppgave }: EnRegelControllerProps) => {
  const { receivedSykmelding, validationResult } = manuellOppgave;
  const regelUtslag = validationResult.ruleHits;
  const handterAvgjorelse = (avgjorelse: boolean): void => {
    const vurdertOppgave = new ManuellOppgave(manuellOppgave);
    regelUtslag.forEach((regel) => {
      vurdertOppgave.validationResult.setBehandlet(regel.ruleName, avgjorelse);
      vurdertOppgave.validationResult.setStatus(avgjorelse);
      vurdertOppgave.validationResult.setRuleHitStatus(regel.ruleName, avgjorelse);
    });
    setManOppgave(vurdertOppgave);
  };

  const handterAvbryt = (): void => {
    console.log('avbryt trykket');
  };

  return (
    <EnRegel
      receivedSykmelding={receivedSykmelding}
      regelUtslag={regelUtslag}
      handterAvgjorelse={handterAvgjorelse}
      handterAvbryt={handterAvbryt}
    />
  );
};

export default EnRegelController;
