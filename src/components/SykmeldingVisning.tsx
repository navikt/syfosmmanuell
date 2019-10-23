import * as React from 'react';
import { RuleNames } from '../types/ValidationresultTypes';
import { Element, Undertittel, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import './SykmeldingVisning.less';
import { useAppStore } from '../store/AppStore';
import dayjs = require('dayjs');

const checkBox = require('../img/check-box.svg');

const SykmeldingVisning: React.FC = () => {
    const {
        aktuellArsak,
        aktuellManOppgave: { sykmelding },
    } = useAppStore();

    const sykmeldingHeader = (): JSX.Element => (
        <>
            <div className="arsak-visning">
                <Element>Årsak til manuell behandling</Element>
                <Normaltekst>{aktuellArsak}.</Normaltekst>
            </div>
            <div className="arbeidsgiver-sykmelder">
                <Element>Arbeidsgiver: {sykmelding.arbeidsgiver.navn}</Element>
                <Element>Sykmelder: {sykmelding.navnFastlege}</Element>
            </div>
        </>
    );
    const tilbakedatertLopendePeriodeBuilder = (): JSX.Element => (
        <>
            <div className="js-grad grid-item">
                <Element>Grad</Element>
                <Normaltekst>{sykmelding.perioder[0].gradert.grad + ' %'}</Normaltekst>
            </div>
            <div className="js-startsykefrv grid-item">
                <Element>Når startet det legemeldte sykefraværet?</Element>
                <Normaltekst>{dayjs(sykmelding.syketilfelleStartDato).format('DD.MM.YYYY')}</Normaltekst>
            </div>
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
            <div className="grid-item">
                <Element>Dato for dokumenterbar kontakt med pasienten</Element>
                <Normaltekst>{dayjs(sykmelding.kontaktMedPasient.kontaktDato).format('DD.MM.YYYY')}</Normaltekst>
            </div>
            <div className="grid-item">
                <Element>Pasienten har ikke kunne ivareta egne interesser. Begrunn</Element>
                <Normaltekst>{sykmelding.kontaktMedPasient.begrunnelseIkkeKontakt}</Normaltekst>
            </div>
            <div className="grid-item grid-item--left">
                <Element>Hoveddiagnose</Element>
                <Normaltekst>{'hvor finner man dette?'}</Normaltekst>
            </div>
            <div className="grid-item grid-item--right">
                <Element>Kode</Element>
                <Normaltekst>{sykmelding.medisinskVurdering.hovedDiagnose.kode}</Normaltekst>
            </div>
            <div className="grid-item grid-item-tittel">
                <Undertittel>Friskmelding/prognose</Undertittel>
            </div>
            <div className="grid-item checkbox">
                <img src={checkBox} alt="Checkbox icon" className="checkbox__ikon" />
                <div className="checkbox__tekst">
                    <Normaltekst>Pasienten er 100% arbeidsfør etter denne perioden</Normaltekst>
                </div>
            </div>
            <div className="grid-item">
                <Element>Beskriv eventuelle hensyn som må tas på arbeidsplassen</Element>
                <Normaltekst>{sykmelding.prognose.hensynArbeidsplassen}</Normaltekst>
            </div>
            <div className="grid-item">
                <Element>Pasient med arbeidsgiver: ...</Element>
                <div className="checkbox">
                    <img src={checkBox} alt="Checkbox icon" className="checkbox__ikon" />
                    <div className="checkbox__tekst">
                        <Normaltekst>
                            Jeg antar at pasienten på sikt kan komme tilbake til samme arbeidsgiver
                        </Normaltekst>
                    </div>
                </div>
            </div>
            <div className="grid-item">
                <Element>Anslå når du tror dette kan skje</Element>
                <Normaltekst>{dayjs(sykmelding.prognose.erIArbeid.arbeidFOM).format('DD.MM.YYYY')}</Normaltekst>
            </div>
            <div className="grid-item checkbox">
                <img src={checkBox} alt="Checkbox icon" className="checkbox__ikon" />
                <div className="checkbox__tekst">
                    <Normaltekst>Jeg antar at pasienten på sikt kan komme i arbeid hos annen arbeidsgiver</Normaltekst>
                </div>
            </div>
            <div className="grid-item">
                <Element>Hvis usikker: Når antar du å kunne gi tilbakemelding på dette?</Element>
                <Normaltekst>{dayjs(sykmelding.prognose.erIArbeid.vurderingsdato).format('DD.MM.YYYY')}</Normaltekst>
            </div>
            {/* SPØR OM DENNE SEKSJONEN */}
            <div className="grid-item grid-item-tittel">
                <Undertittel>Utdypende opplysninger</Undertittel>
                <Element>Helseopplysninger ved vurdering av aktivitetskravet</Element>
            </div>
            <div className="grid-item">
                <Element>Beskriv kort sykehistorie, symptomer og funn i dagens situasjon</Element>
                <Normaltekst>{sykmelding.tiltakNAV}</Normaltekst>
            </div>
            <div className="grid-item">
                <Element>
                    Beskriv pågående og planlagt henvisning, utredning og/eller behandling. Lar dette seg kombinere med
                    delvis arbeid?
                </Element>
                <Normaltekst>{sykmelding.andreTiltak}</Normaltekst>
            </div>
            {/* SPØR OM DENNE SEKSJONEN */}
            <div className="grid-item grid-item-tittel">
                <Undertittel>Hva skal til for å bedre arbeidsevnen?</Undertittel>
            </div>
            <div className="grid-item">
                <Element>
                    Tilrettelegging/hensyn som bør tas på arbeidsplassen. Beskriv (kan leses av arbeidsgiver)
                </Element>
                <Normaltekst>{sykmelding.tiltakArbeidsplassen}</Normaltekst>
            </div>
            <div className="grid-item">
                <Element>Tiltak i regi av NAV. Beskriv. (Hvis der er behov fra NAV nå, bruk felt 8.)</Element>
                <Normaltekst>{sykmelding.tiltakNAV}</Normaltekst>
            </div>
            <div className="grid-item">
                <Element>Eventuelle andre innspill til NAV. Beskriv</Element>
                <Normaltekst>{sykmelding.andreTiltak}</Normaltekst>
            </div>
        </>
    );

    const tilbakedatertBuilder = (): JSX.Element => (
        <>
            <div className="grid-item">
                <Element>Grad</Element>
                <Normaltekst>{sykmelding.perioder[0].gradert.grad + ' %'}</Normaltekst>
            </div>
            <div className="grid-item">
                <Element>Når startet det legemeldte sykefraværet?</Element>
                <Normaltekst>{dayjs(sykmelding.syketilfelleStartDato).format('DD.MM.YYYY')}</Normaltekst>
            </div>
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
            <div className="grid-item">
                <Element>Dato for dokumenterbar kontakt med pasienten</Element>
                <Normaltekst>{dayjs(sykmelding.kontaktMedPasient.kontaktDato).format('DD.MM.YYYY')}</Normaltekst>
            </div>
            <div className="grid-item">
                <Element>Pasienten har ikke kunne ivareta egne interesser. Begrunn</Element>
                <Normaltekst>{sykmelding.kontaktMedPasient.begrunnelseIkkeKontakt}</Normaltekst>
            </div>
            <div className="grid-item grid-item--left">
                <Element>Hoveddiagnose</Element>
                <Normaltekst>{'hvor finner man dette?'}</Normaltekst>
            </div>
            <div className="grid-item grid-item--right">
                <Element>Kode</Element>
                <Normaltekst>{sykmelding.medisinskVurdering.hovedDiagnose.kode}</Normaltekst>
            </div>
            <div className="grid-item grid-item-tittel">
                <Undertittel>Friskmelding/prognose</Undertittel>
            </div>
            <div className="grid-item checkbox">
                <img src={checkBox} alt="Checkbox icon" className="checkbox__ikon" />
                <div className="checkbox__tekst">
                    <Normaltekst>Pasienten er 100% arbeidsfør etter denne perioden</Normaltekst>
                </div>
            </div>
            <div className="grid-item">
                <Element>Beskriv eventuelle hensyn som må tas på arbeidsplassen</Element>
                <Normaltekst>{sykmelding.prognose.hensynArbeidsplassen}</Normaltekst>
            </div>
            <div className="grid-item">
                <Element>Pasient med arbeidsgiver: ...</Element>
                <div className="checkbox">
                    <img src={checkBox} alt="Checkbox icon" className="checkbox__ikon" />
                    <div className="checkbox__tekst">
                        <Normaltekst>
                            Jeg antar at pasienten på sikt kan komme tilbake til samme arbeidsgiver
                        </Normaltekst>
                    </div>
                </div>
            </div>
            <div className="grid-item">
                <Element>Anslå når du tror dette kan skje</Element>
                <Normaltekst>{dayjs(sykmelding.prognose.erIArbeid.arbeidFOM).format('DD.MM.YYYY')}</Normaltekst>
            </div>
            <div className="grid-item checkbox">
                <img src={checkBox} alt="Checkbox icon" className="checkbox__ikon" />
                <div className="checkbox__tekst">
                    <Normaltekst>Jeg antar at pasienten på sikt kan komme i arbeid hos annen arbeidsgiver</Normaltekst>
                </div>
            </div>
            <div className="grid-item">
                <Element>Hvis usikker: Når antar du å kunne gi tilbakemelding på dette?</Element>
                <Normaltekst>{dayjs(sykmelding.prognose.erIArbeid.vurderingsdato).format('DD.MM.YYYY')}</Normaltekst>
            </div>
            <div className="grid-item grid-item-tittel">
                <Undertittel>Hva skal til for å bedre arbeidsevnen?</Undertittel>
            </div>
            <div className="grid-item">
                <Element>
                    Tilrettelegging/hensyn som bør tas på arbeidsplassen. Beskriv (kan leses av arbeidsgiver)
                </Element>
                <Normaltekst>{sykmelding.tiltakArbeidsplassen}</Normaltekst>
            </div>
            <div className="grid-item">
                <Element>Tiltak i regi av NAV. Beskriv. (Hvis der er behov fra NAV nå, bruk felt 8.)</Element>
                <Normaltekst>{sykmelding.tiltakNAV}</Normaltekst>
            </div>
            <div className="grid-item">
                <Element>Eventuelle andre innspill til NAV. Beskriv</Element>
                <Normaltekst>{sykmelding.andreTiltak}</Normaltekst>
            </div>
        </>
    );

    const kiropraktorBuilder = (): JSX.Element => (
        <>
            <div className="grid-item">
                <Element>Grad</Element>
                <Normaltekst>{sykmelding.perioder[0].gradert ? sykmelding.perioder[0].gradert.grad : ''}</Normaltekst>
            </div>
            <div className="grid-item">
                <Element>Når startet det legemeldte sykefraværet?</Element>
                <Normaltekst>{dayjs(sykmelding.syketilfelleStartDato).format('DD.MM.YYYY')}</Normaltekst>
            </div>
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
            <div className="grid-item grid-item--left">
                <Element>Hoveddiagnose</Element>
                <Normaltekst>{'hvor finner man dette?'}</Normaltekst>
            </div>
            <div className="grid-item grid-item--right">
                <Element>Kode</Element>
                <Normaltekst>{sykmelding.medisinskVurdering.hovedDiagnose.kode}</Normaltekst>
            </div>
            <div className="grid-item grid-item--left">
                <Element>Bidiagnose</Element>
                {sykmelding.medisinskVurdering.biDiagnoser.map((diagnose, index) => (
                    <Normaltekst key={index}>{'hvor finner man dette?'}</Normaltekst>
                ))}
            </div>
            <div className="grid-item grid-item--right">
                <Element>Kode</Element>
                {sykmelding.medisinskVurdering.biDiagnoser.map((diagnose, index) => (
                    <Normaltekst key={index}>{diagnose.kode}</Normaltekst>
                ))}
            </div>
        </>
    );

    const flerePerioderBuilder = (): JSX.Element => (
        <>
            <div className="grid-item">
                <Element>Når startet det legemeldte sykefraværet?</Element>
                <Normaltekst>{dayjs(sykmelding.syketilfelleStartDato).format('DD.MM.YYYY')}</Normaltekst>
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
            {sykmeldingHeader()}
            <div className="sykmelding-grid">
                <div className="grid-item grid-item__tittel">
                    <Systemtittel>Sykmelding</Systemtittel>
                </div>
                {aktuellArsak == RuleNames.TILBAKEDATERT_MED_BEGRUNNELSE_FORLENGELSE &&
                    tilbakedatertLopendePeriodeBuilder()}
                {aktuellArsak == RuleNames.TILBAKEDATERT_MED_BEGRUNNELSE_FORSTE_SYKMELDING && tilbakedatertBuilder()}
                {aktuellArsak == RuleNames.AVVENTENDE_SYKMELDING_KOMBINERT && flerePerioderBuilder()}
                {aktuellArsak == RuleNames.BEHANDLER_KI_FT_MT_BENYTTER_ANNEN_DIAGNOSEKODE_ENN_L && kiropraktorBuilder()}
            </div>
        </>
    );
};

export default SykmeldingVisning;
