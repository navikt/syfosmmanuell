import * as React from 'react';
import { RuleNames } from '../types/ValidationresultTypes';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import 'nav-frontend-lenker-style';
import './Sykmeldingen.less';
import { useAppStore } from '../store/AppStore';
import Radiogruppe from './Radiogruppe';

import Header from './sykmelding/Header';
import TilbakedatertForlengelse from './sykmelding/TilbakedatertForlengelse';
import TilbakedatertForste from './sykmelding/TilbakedatertForste';
import Kiropraktor from './sykmelding/Kiropraktor';

const Sykmeldingen: React.FC = () => {
    const {
        aktuellArsak,
        aktuellManOppgave: { sykmelding },
    } = useAppStore();

    if (!Object.values(RuleNames).includes(aktuellArsak)) {
        return <Normaltekst>Ugyldig regel: {`"` + aktuellArsak + `"`}</Normaltekst>;
    }

    return (
        <>
            <Header aktuellArsak={aktuellArsak} sykmelding={sykmelding} />
            <div className="sykmelding">
                <div className="sykmelding-grid">
                    <div className="grid-item grid-item__tittel">
                        <Systemtittel>Sykmelding</Systemtittel>
                    </div>
                    {aktuellArsak === RuleNames.TILBAKEDATERT_MED_BEGRUNNELSE_FORLENGELSE && (
                        <TilbakedatertForlengelse sykmelding={sykmelding} />
                    )}
                    {aktuellArsak === RuleNames.TILBAKEDATERT_MER_ENN_8_DAGER_FORSTE_SYKMELDING_MED_BEGRUNNELSE && (
                        <TilbakedatertForste sykmelding={sykmelding} />
                    )}
                    {aktuellArsak === RuleNames.BEHANDLER_KI_FT_MT_BENYTTER_ANNEN_DIAGNOSEKODE_ENN_L && (
                        <Kiropraktor sykmelding={sykmelding} />
                    )}
                    {aktuellArsak === RuleNames.UGYLDIG_KODEVERK_FOR_BIDIAGNOSE && <p>Ugyldig kodeverk</p>}
                    {aktuellArsak === RuleNames.PASIENTEN_HAR_KODE_6 && <p>Kode 6</p>}
                </div>
                <div className="linje-vannrett"></div>
                <Radiogruppe radioNavn="sykmelding-visning" />
            </div>
        </>
    );
};

export default Sykmeldingen;
