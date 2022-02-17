import { Feiloppsummering, FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { useEffect, useRef } from 'react';
import { FormState } from 'react-hook-form';

import { FormShape } from './Form';

interface FeiloppsummeringContainerProps {
  className?: string;
  formState: FormState<FormShape>; // Must pass in whole state object to be able to react to changes
}

function FeiloppsummeringContainer({ className, formState }: FeiloppsummeringContainerProps): JSX.Element | null {
  const { errors } = formState;
  const feiloppsummeringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    feiloppsummeringRef.current?.focus();
  }, [formState]);

  const feiloppsummeringsfeil: FeiloppsummeringFeil[] = Object.entries(errors)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => ({ skjemaelementId: `b-${key}`, feilmelding: value.message ?? '' }));

  if (feiloppsummeringsfeil.length === 0) {
    return null;
  }

  return (
    <Feiloppsummering
      id="feiloppsummering"
      className={className}
      innerRef={feiloppsummeringRef}
      tittel="For å gå videre må du rette opp følgende"
      feil={feiloppsummeringsfeil}
    />
  );
}

export default FeiloppsummeringContainer;
