import React, { useEffect } from 'react';

import { logger } from '@navikt/next-logger';

const ErrorFallback: React.FC = () => {
  useEffect(() => {
    logger.error('An unknown error occurred while trying to render oppgave');
  }, []);

  return (
    <p>
      Det oppsto dessverre en ukjent feil. Vi jobber sannsynligvis med å rette feilen. Ta kontakt dersom det ikke er
      løst innen noen timer.
    </p>
  );
};

export default ErrorFallback;
