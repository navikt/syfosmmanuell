import React from 'react';
import EtikettMedTekst from '../layout/EtikettMedTekst';

import { AnnenFraversArsak } from '../../../types/sykmeldingTypes';

interface FraverSeksjonProps {
  annenFraversArsak?: AnnenFraversArsak;
}

const FraverSeksjon = ({ annenFraversArsak }: FraverSeksjonProps) => {
  if (!annenFraversArsak) {
    return null;
  }

  return (
    <>
      <EtikettMedTekst tittel='Annen fraværsgrunn beskrivelse' tekst={annenFraversArsak.beskrivelse} margin />
      {annenFraversArsak.grunn.map((grunn, index) => (
        <EtikettMedTekst key={index} tittel="Lovfestet Fraværsgrunn" tekst={grunn} margin />
      ))}
    </>
  );
};

export default FraverSeksjon;
