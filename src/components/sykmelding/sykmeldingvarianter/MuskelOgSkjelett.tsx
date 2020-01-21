import React from 'react';
import { Sykmelding } from '../../../types/sykmeldingTypes';
import DiagnoseSeksjon from '../../infopanel/panelelementer/diagnose/DiagnoseSeksjon';
import InfoPanel from '../../infopanel/InfoPanel';
import SykmeldingPerioder from '../../infopanel/panelelementer/periode/SykmeldingPerioder';
import BehandlingsDatoer from '../../infopanel/utdypendeelementer/BehandlingsDatoer';

interface MuskelOgSkjelettProps {
  sykmelding: Sykmelding;
}

const MuskelOgSkjelett = ({ sykmelding }: MuskelOgSkjelettProps) => {
  return (
    <InfoPanel tittel="Utdrag fra sykmeldingen" fargetema="advarsel">
      <BehandlingsDatoer
        syketilfelleStartDato={sykmelding.syketilfelleStartDato}
      />
      <SykmeldingPerioder perioder={sykmelding.perioder} />
      <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering.hovedDiagnose} />
      {sykmelding.medisinskVurdering.biDiagnoser.map((biDiagnose, index) => (
        <DiagnoseSeksjon key={index} diagnose={biDiagnose} bidiagnose />
      ))}
    </InfoPanel>
  );
};

export default MuskelOgSkjelett;
