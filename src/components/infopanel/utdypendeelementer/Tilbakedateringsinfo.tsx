import React from 'react';
import ElementMedTekst from '../layout/ElementMedTekst';
import { tilLesbarDatoMedArstall } from '../../../utils/datoUtils';

interface TilbakedateringsinfoProps {
  dokumenterbarKontaktDato?: Date;
  kanIkkeIvaretaEgneInteresser?: string;
}

const Tilbakedateringsinfo = ({
  dokumenterbarKontaktDato,
  kanIkkeIvaretaEgneInteresser,
}: TilbakedateringsinfoProps) => {
  return (
    <>
      <ElementMedTekst
        vis={!!dokumenterbarKontaktDato}
        tittel="Dato for dokumenterbar kontakt med pasienten"
        tekst={tilLesbarDatoMedArstall(dokumenterbarKontaktDato)}
        margin
      />
      <ElementMedTekst
        vis={!!kanIkkeIvaretaEgneInteresser}
        tittel="Pasienten har ikke kunnet ivareta egne interesser. Begrunn"
        tekst={kanIkkeIvaretaEgneInteresser}
        margin
      />
    </>
  );
};

export default Tilbakedateringsinfo;
