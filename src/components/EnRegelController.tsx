import React from 'react';
import { ManuellOppgave } from '../types/manuellOppgaveTypes';
import EnRegel from './EnRegel';

interface EnRegelControllerProps {
  manuellOppgave: ManuellOppgave;
  setManOppgave: (value: React.SetStateAction<ManuellOppgave | null | undefined>) => void;
}

const EnRegelController = ({ manuellOppgave, setManOppgave }: EnRegelControllerProps) => {
  const { receivedSykmelding, validationResult } = manuellOppgave;
  const regel = validationResult.ruleHits[0].ruleName;

  const handterAvgjorelse = (avgjorelse: boolean): void => {
    const vurdertOppgave = new ManuellOppgave(manuellOppgave);
    vurdertOppgave.validationResult.setBehandlet(regel, avgjorelse);
    vurdertOppgave.validationResult.setStatus(avgjorelse);
    vurdertOppgave.validationResult.setRuleHitStatus(regel, avgjorelse);
    setManOppgave(vurdertOppgave);
  };

  const handterAvbryt = (): void => {
    console.log('avbryt trykket');
  };

  return (
    <EnRegel
      receivedSykmelding={receivedSykmelding}
      regel={regel}
      handterAvgjorelse={handterAvgjorelse}
      handterAvbryt={handterAvbryt}
    />
  );
};

export default EnRegelController;
