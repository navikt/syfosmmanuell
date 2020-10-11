import React from 'react';
import { tilLesbarDatoMedArstall } from '../../../../../utils/datoUtils';
import ElementMedTekst from '../layout/ElementMedTekst';

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
        tittel="Begrunnelse for tilbakedatering"
        tekst={kanIkkeIvaretaEgneInteresser}
        margin
      />
    </>
  );
};

export default Tilbakedateringsinfo;
