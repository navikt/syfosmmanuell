import React from 'react';
import { Sykmelding as SykmeldingType } from '../../types/sykmeldingTypes';
import { RuleNames } from '../../types/validationresultTypes';
import Tilbakedatert from './sykmeldingvarianter/Tilbakedatert';
import TilbakedatertForlengelse from './sykmeldingvarianter/TilbakedatertForlengelse';

interface SykmeldingProps {
  sykmelding: SykmeldingType;
  personNrPasient: string;
  regel: RuleNames;
}

// Her bestemmes hvilken sykmelding som skal vises basert på regel
const Sykmelding = ({ sykmelding, personNrPasient, regel }: SykmeldingProps) => {
  switch (regel) {
    case 'TILBAKEDATERT_MER_ENN_8_DAGER_FORSTE_SYKMELDING_MED_BEGRUNNELSE': {
      return <Tilbakedatert sykmelding={sykmelding} personNrPasient={personNrPasient} />;
    }
    case 'TILBAKEDATERT_MED_BEGRUNNELSE_FORLENGELSE': {
      return <TilbakedatertForlengelse sykmelding={sykmelding} personNrPasient={personNrPasient} />;
    }
    default: {
      throw new Error('Finner ikke sykmelding som korresponderer til aktuelt regelutslag');
    }
  }
};

export default Sykmelding;
