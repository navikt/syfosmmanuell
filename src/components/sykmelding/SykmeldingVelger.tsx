import React from 'react';
import { Sykmelding as SykmeldingType } from '../../types/sykmeldingTypes';
import TilbakedatertForlengelse from './sykmeldingvarianter/TilbakedatertForlengelse';

interface SykmeldingProps {
  sykmelding: SykmeldingType;
  personNrPasient: string;
}

// Her bestemmes hvilken sykmelding som skal vises basert på regel
const Sykmelding = ({ sykmelding, personNrPasient }: SykmeldingProps) => {
  return <TilbakedatertForlengelse sykmelding={sykmelding} personNrPasient={personNrPasient} />;
};

export default Sykmelding;
