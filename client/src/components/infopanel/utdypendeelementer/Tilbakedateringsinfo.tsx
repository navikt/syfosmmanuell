import React from 'react';
import ElementMedTekst from '../layout/ElementMedTekst';
import { tilLesbarDatoMedArstall, daysBetweenDates, getSykmeldingStartDate } from '../../../utils/datoUtils';

import './Tilbakedateringsinfo.less';
import { Periode } from '../../../types/sykmeldingTypes';

interface TilbakedateringsinfoProps {
  perioder: Periode[];
  kontaktDato?: Date;
  behandletTidspunkt: Date;
  begrunnelseIkkeKontakt?: string;
}

const Tilbakedateringsinfo = ({
  perioder,
  kontaktDato,
  behandletTidspunkt,
  begrunnelseIkkeKontakt,
}: TilbakedateringsinfoProps) => {
  const fom = getSykmeldingStartDate(perioder);
  const tilbakedatertDuration = daysBetweenDates(fom, behandletTidspunkt);

  return (
    <div className="tilbakedateringsinfo">
      <div className="tilbakedateringsinfo__kontaktMedPasient">
        <ElementMedTekst
          vis={!!kontaktDato}
          tittel="Datoen pasienten oppsøkte behandleren"
          tekst={tilLesbarDatoMedArstall(kontaktDato)}
          margin
        />
        <ElementMedTekst
          vis={!!begrunnelseIkkeKontakt}
          tittel="Begrunnelse for tilbakedateringen"
          tekst={begrunnelseIkkeKontakt}
        />
      </div>

      <ElementMedTekst
        vis={!!behandletTidspunkt}
        tittel="Dato pasienten ble behandlet"
        tekst={tilLesbarDatoMedArstall(behandletTidspunkt)}
        margin
      />
      <ElementMedTekst
        vis={!!behandletTidspunkt}
        tittel="Startdato for sykmeldingen"
        tekst={`${tilLesbarDatoMedArstall(fom)}`}
        margin
      />
      {tilbakedatertDuration && (
        <ElementMedTekst
          vis
          tittel="Antall dager tilbakedatert"
          tekst={`${tilbakedatertDuration} dag${tilbakedatertDuration > 1 ? 'er' : ''}`}
          margin
        />
      )}
    </div>
  );
};

export default Tilbakedateringsinfo;
