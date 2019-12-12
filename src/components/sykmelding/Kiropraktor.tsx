import * as React from 'react';
import { Sykmelding } from '../../types/SykmeldingTypes';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import dayjs = require('dayjs');

interface KiropraktorProps {
    sykmelding: Sykmelding;
}

const Kiropraktor: React.FC<KiropraktorProps> = ({ sykmelding }: KiropraktorProps) => {
    return (
        <>
            {!!sykmelding.perioder[0].gradert && !!sykmelding.perioder[0].gradert.grad && (
                <div className="grid-item">
                    <Element>Grad</Element>
                    <Normaltekst>{sykmelding.perioder[0].gradert.grad + ' %'}</Normaltekst>
                </div>
            )}
            {sykmelding.syketilfelleStartDato && (
                <div className="grid-item">
                    <Element>Når startet det legemeldte sykefraværet?</Element>
                    <Normaltekst>{dayjs(sykmelding.syketilfelleStartDato).format('DD.MM.YYYY')}</Normaltekst>
                </div>
            )}
            <div className="grid-item grid-item--left">
                <Element>Sykmeldingsperiode</Element>
                <Normaltekst>
                    {dayjs(sykmelding.perioder[0].fom).format('DD.MM.YYYY') +
                        ' - ' +
                        dayjs(sykmelding.perioder[0].tom).format('DD.MM.YYYY')}
                </Normaltekst>
            </div>
            <div className="grid-item grid-item--right">
                <Element>Sykmeldingsdato</Element>
                <Normaltekst>{dayjs(sykmelding.signaturDato).format('DD.MM.YYYY')}</Normaltekst>
            </div>
            {!!sykmelding.medisinskVurdering.hovedDiagnose && (
                <div className="grid-item grid-item--left">
                    <Element>Hoveddiagnose</Element>
                    <Normaltekst>{sykmelding.medisinskVurdering.hovedDiagnose.tekst}</Normaltekst>
                </div>
            )}
            {!!sykmelding.medisinskVurdering.hovedDiagnose && (
                <div className="grid-item grid-item--right">
                    <Element>Kode</Element>
                    <Normaltekst>{sykmelding.medisinskVurdering.hovedDiagnose.kode}</Normaltekst>
                </div>
            )}
            {sykmelding.medisinskVurdering.biDiagnoser.length > 0 && (
                <div className="grid-item grid-item--left">
                    <Element>Bidiagnose</Element>
                    {sykmelding.medisinskVurdering.biDiagnoser.map((diagnose, index) => (
                        <Normaltekst key={index}>{diagnose.tekst}</Normaltekst>
                    ))}
                </div>
            )}
            {sykmelding.medisinskVurdering.biDiagnoser.length > 0 && (
                <div className="grid-item grid-item--right">
                    <Element>Kode</Element>
                    {sykmelding.medisinskVurdering.biDiagnoser.map((diagnose, index) => (
                        <Normaltekst key={index}>{diagnose.kode}</Normaltekst>
                    ))}
                </div>
            )}
        </>
    );
};

export default Kiropraktor;
