import React from 'react';
import ElementMedTekst from '../layout/ElementMedTekst';
import {
  getFirstFomInPeriod,
  countDaysBetweenTwoDatesIncludingFom,
  tilLesbarDatoMedArstall,
} from '../../../utils/datoUtils';

import './Tilbakedateringsinfo.less';
import { Periode } from '../../../types/sykmeldingTypes';

interface TilbakedateringsinfoProps {
  perioder?: Periode[];
  kontaktDato?: Date;
  behandletTidspunkt?: Date;
  begrunnelseIkkeKontakt?: string;
}

const Tilbakedateringsinfo = ({
  perioder,
  kontaktDato,
  behandletTidspunkt,
  begrunnelseIkkeKontakt,
}: TilbakedateringsinfoProps) => {
  const fom = getFirstFomInPeriod(perioder);
  const tilbakedatertDuration = countDaysBetweenTwoDatesIncludingFom(fom, behandletTidspunkt);
  return (
    <div className="tilbakedateringsinfo">
      <ElementMedTekst
        vis={!!kontaktDato}
        tittel="Datoen pasienten oppsøkte behandleren"
        tekst={tilLesbarDatoMedArstall(kontaktDato)}
        margin
      />
      {tilbakedatertDuration && (
        <ElementMedTekst
          vis={!!behandletTidspunkt}
          tittel="Datoen behandleren oppgir som første dag med sykmelding"
          tekst={`${tilLesbarDatoMedArstall(behandletTidspunkt)} • tilbakedatert ${tilbakedatertDuration} dag${
            tilbakedatertDuration > 1 ? 'er' : ''
          }`}
          margin
        />
      )}
      <ElementMedTekst
        vis={!!begrunnelseIkkeKontakt}
        tittel="Begrunnelse for tilbakedateringen"
        tekst={begrunnelseIkkeKontakt}
      />
    </div>
  );
};

export default Tilbakedateringsinfo;
