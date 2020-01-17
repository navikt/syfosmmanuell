import React from 'react';
import { Sykmelding as SykmeldingType } from '../../types/sykmeldingTypes';
import { RuleNames } from '../../types/validationresultTypes';
import './sykmelding.less';
import MuskelOgSkjelett from './sykmeldingvarianter/MuskelOgSkjelett';
import Tilbakedatert from './sykmeldingvarianter/Tilbakedatert';
import TilbakedatertForlengelse from './sykmeldingvarianter/TilbakedatertForlengelse';

interface SykmeldingProps {
    sykmelding: SykmeldingType;
    regel: RuleNames;
}

// Her bestemmes hvilken sykmelding som skal vises basert på regel
const Sykmelding = ({ sykmelding, regel }: SykmeldingProps) => {
    switch (regel) {
        case 'BEHANDLER_KI_FT_MT_BENYTTER_ANNEN_DIAGNOSEKODE_ENN_L': {
            return <MuskelOgSkjelett sykmelding={sykmelding} />;
        }
        case 'TILBAKEDATERT_MER_ENN_8_DAGER_FORSTE_SYKMELDING_MED_BEGRUNNELSE': {
            return <Tilbakedatert sykmelding={sykmelding} />;
        }
        case 'TILBAKEDATERT_MED_BEGRUNNELSE_FORLENGELSE': {
            return <TilbakedatertForlengelse sykmelding={sykmelding} />;
        }
        default: {
            throw new Error('Finner ikke sykmelding som korresponderer til aktuelt regelutslag');
        }
    }
};

export default Sykmelding;
