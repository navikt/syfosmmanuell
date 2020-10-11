import React from 'react';
import { Prognose } from '../../../../../types/sykmeldingTypes';

import tekster from '../infopanel-tekster';
import EtikettMedTekst from '../layout/EtikettMedTekst';

interface PrognoseSeksjonProps {
    prognose?: Prognose;
}

const PrognoseSeksjon = ({ prognose }: PrognoseSeksjonProps) => {
    if (!prognose?.hensynArbeidsplassen) {
        return null;
    }
    return <EtikettMedTekst tittel={tekster['prognose.hensyn.tittel']} tekst={prognose.hensynArbeidsplassen} margin />;
};

export default PrognoseSeksjon;
