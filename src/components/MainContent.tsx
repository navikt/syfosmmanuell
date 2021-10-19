import React, { useCallback, useState } from 'react';
import { Flatknapp } from 'nav-frontend-knapper';
import { useRouter } from 'next/router';
import { Normaltekst } from 'nav-frontend-typografi';

import { ManuellOppgave } from '../types/manuellOppgave';
import { vurderOppgave } from '../utils/submitUtils';
import { logger } from '../utils/logger';

import Sykmeldingheader from './sykmelding/SykmeldingHeader';
import HeleSykmeldingen from './sykmelding/sykmeldingvarianter/HeleSykmeldingen';
import TilbakedatertForlengelse from './sykmelding/sykmeldingvarianter/TilbakedatertForlengelse';
import Form, { FormShape } from './form/Form';

interface MainContentProps {
  manuellOppgave: ManuellOppgave;
  aktivEnhet: string;
}

const MainContent = ({ manuellOppgave, aktivEnhet }: MainContentProps) => {
  const router = useRouter();
  const [visHeleSykmeldingen, setVisHeleSykmeldingen] = useState(false);
  const { sykmelding, personNrPasient, mottattDato } = manuellOppgave;
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (formState: FormShape) => {
      try {
        setSubmitting(true);
        await vurderOppgave(manuellOppgave.oppgaveid, aktivEnhet, formState);
        await router.push('/kvittering');
      } catch (e) {
        logger.error(e);
        setSubmitting(false);
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('Ukjent feil');
        }
      }
    },
    [aktivEnhet, manuellOppgave.oppgaveid, router],
  );

  return (
    <div className="panel">
      <Sykmeldingheader
        arbeidsgiverNavn={sykmelding.arbeidsgiver.navn}
        sykmelder={sykmelding.navnFastlege}
        mottattDato={mottattDato}
        personNrPasient={personNrPasient}
      />
      <TilbakedatertForlengelse sykmelding={sykmelding} />
      <Form onSubmit={handleSubmit} submitting={submitting} />
      {error && (
        <div className="margin-top--2">
          <Normaltekst>{error}</Normaltekst>
        </div>
      )}
      <div className="hele-sykmeldingen-visning">
        <Flatknapp
          form="kompakt"
          onClick={() => setVisHeleSykmeldingen(!visHeleSykmeldingen)}
          className="hele-sykmeldingen-visning__knapp"
        >
          {visHeleSykmeldingen ? 'Skjul hele sykmeldingen' : 'Vis hele sykmeldingen'}
        </Flatknapp>
      </div>
      {visHeleSykmeldingen && (
        <HeleSykmeldingen sykmelding={sykmelding} setVisHeleSykmeldingen={setVisHeleSykmeldingen} />
      )}
    </div>
  );
};

export default MainContent;
