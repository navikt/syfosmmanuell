import React from 'react';
import { Diagnose } from '../../../../types/sykmeldingTypes';
import DiagnoseKodeSeksjon from './DiagnoseKodeSeksjon';

import EtikettMedTekst from '../../layout/EtikettMedTekst';

import './diagnoseseksjon.less';

interface DiagnoseSeksjonProps {
  diagnose?: Diagnose;
  bidiagnose?: boolean;
}

const DiagnoseSeksjon = ({ diagnose, bidiagnose }: DiagnoseSeksjonProps) => {
  if (!diagnose) {
    return null;
  }

  const { tekst, kode, system } = diagnose;

  const tittel = bidiagnose ? '3.2. Bidiagnose' : '3.1. Diagnose';

  return (
    <div className="diagnose-container">
      <div className="diagnose-seksjon">
        <EtikettMedTekst tittel={tittel} tekst={tekst} undertekst="Diagnosen vises ikke til arbeidsgiveren" />
      </div>
      <div className="diagnose-seksjon-kode">
        <DiagnoseKodeSeksjon kode={kode} system={system} visHjelp={!bidiagnose} />
      </div>
    </div>
  );
};

export default DiagnoseSeksjon;
