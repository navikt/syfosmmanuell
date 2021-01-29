import React from 'react';
import ElementMedTekst from '../layout/ElementMedTekst';
import { getFirstFomInPeriod, hentDagerMellomDatoer, tilLesbarDatoMedArstall } from '../../../utils/datoUtils';

import './Tilbakedateringsinfo.less';
import { Periode } from '../../../types/sykmeldingTypes';

interface TilbakedateringsinfoProps {
  perioder?: Periode[];
  behandletTidspunkt?: Date;
  begrunnelseIkkeKontakt?: string;
}

const Tilbakedateringsinfo = ({ perioder, behandletTidspunkt, begrunnelseIkkeKontakt }: TilbakedateringsinfoProps) => {
  const fom = getFirstFomInPeriod(perioder);
  const tilbakedatertDuration = hentDagerMellomDatoer(behandletTidspunkt, fom);
  return (
    <div className="tilbakedateringsinfo">
      <ElementMedTekst
        vis={!!fom}
        tittel="Dato pasienten oppsøkte behandler"
        tekst={tilLesbarDatoMedArstall(fom)}
        margin
      />
      {tilbakedatertDuration && (
        <ElementMedTekst
          vis={!!behandletTidspunkt}
          tittel="Dato sykmeldingen ble skrevet fra"
          tekst={`${tilLesbarDatoMedArstall(behandletTidspunkt)} • tilbakedatert ${tilbakedatertDuration} dag${
            tilbakedatertDuration > 1 ? 'er' : ''
          }`}
          margin
        />
      )}
      <ElementMedTekst
        vis={!!begrunnelseIkkeKontakt}
        tittel="Begrunnelse for tilbakedatering"
        tekst={begrunnelseIkkeKontakt}
      />
    </div>
  );
};

export default Tilbakedateringsinfo;
