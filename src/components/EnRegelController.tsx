import React from 'react';
import { ManuellOppgave } from '../types/manuellOppgaveTypes';
import { ValidationResult } from '../types/validationresultTypes';
import EnRegel from './EnRegel';

interface EnRegelControllerProps {
  manuellOppgave: ManuellOppgave;
  ferdigstillOppgave: (validationsResult: ValidationResult, oppgaveid: number) => void;
}

const EnRegelController = ({ manuellOppgave, ferdigstillOppgave }: EnRegelControllerProps) => {
  const { receivedSykmelding, validationResult } = manuellOppgave;
  const regelUtslag = validationResult.ruleHits;

  const handterAvgjorelse = (avgjorelse: boolean): void => {
    const validationResult = new ValidationResult(manuellOppgave.validationResult);
    validationResult.setStatus(avgjorelse);

    ferdigstillOppgave(validationResult, manuellOppgave.oppgaveid);
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
