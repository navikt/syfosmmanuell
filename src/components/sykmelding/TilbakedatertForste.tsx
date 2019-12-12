import * as React from 'react';
import { Sykmelding } from '../../types/SykmeldingTypes';
import { Normaltekst, Element, Undertittel } from 'nav-frontend-typografi';
import dayjs = require('dayjs');
import '../Sykmeldingen.less';

import Checkbox from '../../img/check-box-2.svg';

interface TilbakedatertForsteProps {
    sykmelding: Sykmelding;
}

const TilbakedatertForste: React.FC<TilbakedatertForsteProps> = ({ sykmelding }: TilbakedatertForsteProps) => {
    return (
        <>
            {!!sykmelding.perioder[0].gradert && !!sykmelding.perioder[0].gradert.grad && (
                <div className="grid-item">
                    <Element>Grad</Element>
                    <Normaltekst>{sykmelding.perioder[0].gradert.grad + ' %'}</Normaltekst>
                </div>
            )}
            {!!sykmelding.syketilfelleStartDato && (
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
            {!!sykmelding.kontaktMedPasient.kontaktDato && (
                <div className="grid-item">
                    <Element>Dato for dokumenterbar kontakt med pasienten</Element>
                    <Normaltekst>{dayjs(sykmelding.kontaktMedPasient.kontaktDato).format('DD.MM.YYYY')}</Normaltekst>
                </div>
            )}
            {!!sykmelding.kontaktMedPasient.begrunnelseIkkeKontakt && (
                <div className="grid-item">
                    <Element>Pasienten har ikke kunne ivareta egne interesser. Begrunn</Element>
                    <Normaltekst>{sykmelding.kontaktMedPasient.begrunnelseIkkeKontakt}</Normaltekst>
                </div>
            )}
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
            {!!sykmelding.prognose && (
                <div className="grid-item grid-item-tittel">
                    <Undertittel>Friskmelding/prognose</Undertittel>
                </div>
            )}
            {!!sykmelding.prognose && !!sykmelding.prognose.arbeidsforEtterPeriode && (
                <div className="grid-item checkbox">
                    <Checkbox className="checkbox__ikon" />
                    <div className="checkbox__tekst">
                        <Normaltekst>Pasienten er 100% arbeidsfør etter denne perioden</Normaltekst>
                    </div>
                </div>
            )}
            {!!sykmelding.prognose && sykmelding.prognose.hensynArbeidsplassen && (
                <div className="grid-item">
                    <Element>Beskriv eventuelle hensyn som må tas på arbeidsplassen</Element>
                    <Normaltekst>{sykmelding.prognose.hensynArbeidsplassen}</Normaltekst>
                </div>
            )}
            {!!sykmelding.prognose &&
                !!sykmelding.prognose.erIArbeid &&
                sykmelding.prognose.erIArbeid.egetArbeidPaSikt && (
                    <div className="grid-item">
                        <Element>Pasient med arbeidsgiver: Utdypende opplysninger</Element>
                        <div className="checkbox">
                            <Checkbox className="checkbox__ikon" />
                            <div className="checkbox__tekst">
                                <Normaltekst>
                                    Jeg antar at pasienten på sikt kan komme tilbake til samme arbeidsgiver
                                </Normaltekst>
                            </div>
                        </div>
                    </div>
                )}
            {!!sykmelding.prognose &&
                !!sykmelding.prognose.erIArbeid &&
                sykmelding.prognose.erIArbeid.egetArbeidPaSikt &&
                !!sykmelding.prognose.erIArbeid.arbeidFOM && (
                    <div className="grid-item">
                        <Element>Anslå når du tror dette kan skje</Element>
                        <Normaltekst>{dayjs(sykmelding.prognose.erIArbeid.arbeidFOM).format('DD.MM.YYYY')}</Normaltekst>
                    </div>
                )}
            {!!sykmelding.prognose &&
                !!sykmelding.prognose.erIArbeid &&
                sykmelding.prognose.erIArbeid.annetArbeidPaSikt && (
                    <div className="grid-item checkbox">
                        <Checkbox className="checkbox__ikon" />
                        <div className="checkbox__tekst">
                            <Normaltekst>
                                Jeg antar at pasienten på sikt kan komme i arbeid hos annen arbeidsgiver
                            </Normaltekst>
                        </div>
                    </div>
                )}
            {!!sykmelding.prognose && sykmelding.prognose.erIArbeid && !!sykmelding.prognose.erIArbeid.vurderingsdato && (
                <div className="grid-item">
                    <Element>Hvis usikker: Når antar du å kunne gi tilbakemelding på dette?</Element>
                    <Normaltekst>
                        {dayjs(sykmelding.prognose.erIArbeid.vurderingsdato).format('DD.MM.YYYY')}
                    </Normaltekst>
                </div>
            )}
            {(!!sykmelding.tiltakArbeidsplassen || !!sykmelding.tiltakNAV || !!sykmelding.andreTiltak) && (
                <div className="grid-item grid-item-tittel">
                    <Undertittel>Hva skal til for å bedre arbeidsevnen?</Undertittel>
                </div>
            )}
            {!!sykmelding.tiltakArbeidsplassen && (
                <div className="grid-item">
                    <Element>
                        Tilrettelegging/hensyn som bør tas på arbeidsplassen. Beskriv (kan leses av arbeidsgiver)
                    </Element>
                    <Normaltekst>{sykmelding.tiltakArbeidsplassen}</Normaltekst>
                </div>
            )}
            {!!sykmelding.tiltakNAV && (
                <div className="grid-item">
                    <Element>Tiltak i regi av NAV. Beskriv. (Hvis det er behov fra NAV nå, bruk felt 8.)</Element>
                    <Normaltekst>{sykmelding.tiltakNAV}</Normaltekst>
                </div>
            )}
            {!!sykmelding.andreTiltak && (
                <div className="grid-item">
                    <Element>Eventuelle andre innspill til NAV. Beskriv</Element>
                    <Normaltekst>{sykmelding.andreTiltak}</Normaltekst>
                </div>
            )}
        </>
    );
};

export default TilbakedatertForste;
