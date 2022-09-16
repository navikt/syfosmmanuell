import React from 'react';

import EtikettMedTekst from '../../layout/EtikettMedTekst';
import { Diagnose } from '../../../../types/sykmelding';

import DiagnoseKodeSeksjon from './DiagnoseKodeSeksjon';

interface DiagnoseSeksjonProps {
    diagnose: Diagnose | null;
    bidiagnose?: boolean;
    withPrefix?: boolean;
}

const DiagnoseSeksjon = ({ diagnose, bidiagnose, withPrefix = false }: DiagnoseSeksjonProps) => {
    if (!diagnose) {
        return null;
    }

    const { tekst, kode, system } = diagnose;

    const setTitle = () => {
        if (bidiagnose) {
            if (withPrefix) {
                return '3.2. Bidiagnose';
            }
            return 'Bidiagnose';
        }

        if (withPrefix) {
            return '3.1. Diagnose';
        }

        return 'Diagnose';
    };

    return (
        <div className="diagnose-container">
            <div className="diagnose-seksjon">
                <EtikettMedTekst
                    tittel={setTitle()}
                    tekst={tekst}
                    undertekst="Diagnosen vises ikke til arbeidsgiveren"
                />
            </div>
            <div className="diagnose-seksjon-kode">
                <DiagnoseKodeSeksjon kode={kode} system={system} visHjelp={!bidiagnose} />
            </div>
        </div>
    );
};

export default DiagnoseSeksjon;
