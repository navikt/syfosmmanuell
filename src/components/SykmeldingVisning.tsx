import * as React from 'react';
import { Element, Undertittel, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './SykmeldingVisning.less';
import { useAppStore } from '../store/AppStore';
import dayjs = require('dayjs');

const SykmeldingVisning: React.FC = () => {
    const {
        aktuellArsak,
        aktuellManOppgave: { sykmelding },
    } = useAppStore();

    const flerePerioderBuilder = (): JSX.Element => (
        <>
            <div className="grid-item grid-item__tittel">
                <Element>Når startet det legemeldte sykefraværet?</Element>
                <Normaltekst>{sykmelding.id}</Normaltekst>
            </div>
            <div className="grid-item grid-item--left">
                <Element>Sykmeldingsperiode</Element>
                {sykmelding.perioder.map((periode, index) => (
                    <Normaltekst key={index}>
                        {dayjs(periode.fom).format('DD.MM.YYYY') + ' - ' + dayjs(periode.tom).format('DD.MM.YYYY')}
                    </Normaltekst>
                ))}
            </div>
            <div className="grid-item grid-item--right">
                <Element>Grad</Element>
                {sykmelding.perioder.map((periode, index) => (
                    <Normaltekst key={index}>{periode.gradert.grad + ' %'}</Normaltekst>
                ))}
            </div>
            <div className="grid-item grid-item--left">
                <Element>Hoveddiagnose</Element>
                <Normaltekst>{'hvor finner man dette?'}</Normaltekst>
            </div>
            <div className="grid-item grid-item--right">
                <Element>Kode</Element>
                <Normaltekst>{sykmelding.medisinskVurdering.hovedDiagnose.kode}</Normaltekst>
            </div>
        </>
    );

    return (
        <>
            <div className="arsak-visning">
                <Element>Årsak til manuell behandling</Element>
                <Normaltekst>{aktuellArsak}.</Normaltekst>
            </div>
            <div className="arbeidsgiver-sykmelder">
                <Element>Arbeidsgiver: {sykmelding.arbeidsgiver.navn}</Element>
                <Element>Sykmelder: {sykmelding.navnFastlege}</Element>
            </div>
            <div className="sykmelding-grid">
                <div className="grid-item grid-item__tittel">
                    <Systemtittel>Sykmelding</Systemtittel>
                </div>
                {flerePerioderBuilder()}
            </div>
        </>
    );
};

export default SykmeldingVisning;
