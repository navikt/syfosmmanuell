import * as React from 'react';
import { RuleNames } from '../types/ValidationresultTypes';
import { Element, Undertittel, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import 'nav-frontend-lenker-style';
import './Sykmeldingen.less';
import { useAppStore } from '../store/AppStore';
import dayjs = require('dayjs');
import Radiogruppe from './Radiogruppe';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const checkBox = require('../img/check-box.svg');

const Sykmeldingen: React.FC = () => {
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
                <Element>
                    Arbeidsgiver:{' '}
                    {!!sykmelding.arbeidsgiver.navn ? sykmelding.arbeidsgiver.navn : <em>ikke spesifisert</em>}
                </Element>
                <Element>Sykmelder: {sykmelding.navnFastlege}</Element>
            </div>
        </>
    );

    const tilbakedatertLopendePeriodeBuilder = (): JSX.Element => (
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
            {sykmelding.kontaktMedPasient.kontaktDato && (
                <div className="grid-item">
                    <Element>Dato for dokumenterbar kontakt med pasienten</Element>
                    <Normaltekst>{dayjs(sykmelding.kontaktMedPasient.kontaktDato).format('DD.MM.YYYY')}</Normaltekst>
                </div>
            )}
            {sykmelding.kontaktMedPasient.begrunnelseIkkeKontakt && (
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
                    <img src={checkBox} alt="Checkbox icon" className="checkbox__ikon" />
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
                            <img src={checkBox} alt="Checkbox icon" className="checkbox__ikon" />
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
                        <img src={checkBox} alt="Checkbox icon" className="checkbox__ikon" />
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
            {!!sykmelding.utdypendeOpplysninger.size && (
                <div className="grid-item grid-item-tittel">
                    <Undertittel>Utdypende opplysninger</Undertittel>
                    <Element>Helseopplysninger ved vurdering av aktivitetskravet</Element>
                </div>
            )}
            {sykmelding.utdypendeOpplysninger.has('6.1') && sykmelding.utdypendeOpplysninger.get('6.1').has('6.1.1') && (
                <div className="grid-item">
                    <Element>
                        Er det sykdommen, utredningen og/eller behandlingen som hindrer økt aktivitet? Beskriv.
                    </Element>
                    <Normaltekst>{sykmelding.utdypendeOpplysninger.get('6.1').get('6.1.1').svar}</Normaltekst>
                </div>
            )}
            {sykmelding.utdypendeOpplysninger.has('6.1') && sykmelding.utdypendeOpplysninger.get('6.1').has('6.1.2') && (
                <div className="grid-item">
                    <Element>Har behandlingen frem til nå bedret arbeidsevnen?</Element>
                    <Normaltekst>{sykmelding.utdypendeOpplysninger.get('6.1').get('6.1.2').svar}</Normaltekst>
                </div>
            )}
            {sykmelding.utdypendeOpplysninger.has('6.1') && sykmelding.utdypendeOpplysninger.get('6.1').has('6.1.3') && (
                <div className="grid-item">
                    <Element>Hva er videre plan for behandling?</Element>
                    <Normaltekst>{sykmelding.utdypendeOpplysninger.get('6.1').get('6.1.3').svar}</Normaltekst>
                </div>
            )}
            {sykmelding.utdypendeOpplysninger.has('6.1') && sykmelding.utdypendeOpplysninger.get('6.1').has('6.1.4') && (
                <div className="grid-item">
                    <Element>Er det arbeidsforholdet som hindrer (økt) aktivitet? Beskriv.</Element>
                    <Normaltekst>{sykmelding.utdypendeOpplysninger.get('6.1').get('6.1.4').svar}</Normaltekst>
                </div>
            )}
            {sykmelding.utdypendeOpplysninger.has('6.1') && sykmelding.utdypendeOpplysninger.get('6.1').has('6.1.5') && (
                <div className="grid-item">
                    <Element>Er det andre forhold som hindrer (økt) aktivitet?</Element>
                    <Normaltekst>{sykmelding.utdypendeOpplysninger.get('6.1').get('6.1.5').svar}</Normaltekst>
                </div>
            )}
            {sykmelding.utdypendeOpplysninger.has('6.2') && sykmelding.utdypendeOpplysninger.get('6.2').has('6.2.1') && (
                <div className="grid-item">
                    <Element>Beskriv kort sykehistorie, symptomer og funn i dagens situasjon.</Element>
                    <Normaltekst>{sykmelding.utdypendeOpplysninger.get('6.2').get('6.2.1').svar}</Normaltekst>
                </div>
            )}
            {sykmelding.utdypendeOpplysninger.has('6.2') && sykmelding.utdypendeOpplysninger.get('6.2').has('6.2.2') && (
                <div className="grid-item">
                    <Element>Hvordan påvirker sykdommen arbeidsevnen?</Element>
                    <Normaltekst>{sykmelding.utdypendeOpplysninger.get('6.2').get('6.2.2').svar}</Normaltekst>
                </div>
            )}
            {sykmelding.utdypendeOpplysninger.has('6.2') && sykmelding.utdypendeOpplysninger.get('6.2').has('6.2.3') && (
                <div className="grid-item">
                    <Element>Har behandlingen frem til nå bedret arbeidsevnen?</Element>
                    <Normaltekst>{sykmelding.utdypendeOpplysninger.get('6.2').get('6.2.3').svar}</Normaltekst>
                </div>
            )}
            {sykmelding.utdypendeOpplysninger.has('6.2') && sykmelding.utdypendeOpplysninger.get('6.2').has('6.2.4') && (
                <div className="grid-item">
                    <Element>Beskriv pågående og planlagt henvisning,utredning og/eller behandling.</Element>
                    <Normaltekst>{sykmelding.utdypendeOpplysninger.get('6.2').get('6.2.4').svar}</Normaltekst>
                </div>
            )}
            {sykmelding.utdypendeOpplysninger.has('6.3') && sykmelding.utdypendeOpplysninger.get('6.3').has('6.3.1') && (
                <div className="grid-item">
                    <Element>Beskriv kort sykehistorie, symptomer og funn i dagens situasjon</Element>
                    <Normaltekst>{sykmelding.utdypendeOpplysninger.get('6.3').get('6.3.1').svar}</Normaltekst>
                </div>
            )}
            {sykmelding.utdypendeOpplysninger.has('6.3') && sykmelding.utdypendeOpplysninger.get('6.3').has('6.3.2') && (
                <div className="grid-item">
                    <Element>
                        Beskriv pågående og planlagt henvisning, utredning og/eller behandling. Lar dette seg kombinere
                        med delvis arbeid?
                    </Element>
                    <Normaltekst>{sykmelding.utdypendeOpplysninger.get('6.3').get('6.3.2').svar}</Normaltekst>
                </div>
            )}
            {sykmelding.utdypendeOpplysninger.has('6.4') && sykmelding.utdypendeOpplysninger.get('6.4').has('6.4.1') && (
                <div className="grid-item">
                    <Element>Beskriv kort sykehistorie, symptomer og funn i dagens situasjon</Element>
                    <Normaltekst>{sykmelding.utdypendeOpplysninger.get('6.4').get('6.4.1').svar}</Normaltekst>
                </div>
            )}
            {sykmelding.utdypendeOpplysninger.has('6.4') && sykmelding.utdypendeOpplysninger.get('6.4').has('6.4.2') && (
                <div className="grid-item">
                    <Element>Beskriv pågående og planlagt henvisning, utredning og/eller behandling</Element>
                    <Normaltekst>{sykmelding.utdypendeOpplysninger.get('6.4').get('6.4.2').svar}</Normaltekst>
                </div>
            )}
            {sykmelding.utdypendeOpplysninger.has('6.4') && sykmelding.utdypendeOpplysninger.get('6.4').has('6.4.3') && (
                <div className="grid-item">
                    <Element>
                        Hva mener du skal til for at pasienten kan komme tilbake i eget eller annet arbeid?
                    </Element>
                    <Normaltekst>{sykmelding.utdypendeOpplysninger.get('6.4').get('6.4.3').svar}</Normaltekst>
                </div>
            )}
            {sykmelding.utdypendeOpplysninger.has('6.5') && sykmelding.utdypendeOpplysninger.get('6.5').has('6.5.1') && (
                <div className="grid-item">
                    <Element>Beskriv kort sykehistorie, symptomer og funn i dagens situasjon.</Element>
                    <Normaltekst>{sykmelding.utdypendeOpplysninger.get('6.5').get('6.5.1').svar}</Normaltekst>
                </div>
            )}
            {sykmelding.utdypendeOpplysninger.has('6.5') && sykmelding.utdypendeOpplysninger.get('6.5').has('6.5.2') && (
                <div className="grid-item">
                    <Element>Hvordan påvirker dette funksjons-/arbeidsevnen?</Element>
                    <Normaltekst>{sykmelding.utdypendeOpplysninger.get('6.5').get('6.5.2').svar}</Normaltekst>
                </div>
            )}
            {sykmelding.utdypendeOpplysninger.has('6.5') && sykmelding.utdypendeOpplysninger.get('6.5').has('6.5.3') && (
                <div className="grid-item">
                    <Element>Beskriv pågående og planlagt henvisning, utredning og/eller medisinsk behandling</Element>
                    <Normaltekst>{sykmelding.utdypendeOpplysninger.get('6.5').get('6.5.3').svar}</Normaltekst>
                </div>
            )}
            {sykmelding.utdypendeOpplysninger.has('6.5') && sykmelding.utdypendeOpplysninger.get('6.5').has('6.5.4') && (
                <div className="grid-item">
                    <Element>
                        Kan arbeidsevnen bedres gjennom medisinsk behandling og/eller arbeidsrelatert aktivitet? I så
                        fall hvordan? Angi tidsperspektiv
                    </Element>
                    <Normaltekst>{sykmelding.utdypendeOpplysninger.get('6.5').get('6.5.4').svar}</Normaltekst>
                </div>
            )}
            {sykmelding.utdypendeOpplysninger.has('6.6') && sykmelding.utdypendeOpplysninger.get('6.6').has('6.6.1') && (
                <div className="grid-item">
                    <Element>
                        Hva antar du at pasienten kan utføre av eget arbeid/arbeidsoppgaver i dag eller i nær framtid?
                    </Element>
                    <Normaltekst>{sykmelding.utdypendeOpplysninger.get('6.6').get('6.6.1').svar}</Normaltekst>
                </div>
            )}
            {sykmelding.utdypendeOpplysninger.has('6.6') && sykmelding.utdypendeOpplysninger.get('6.6').has('6.6.2') && (
                <div className="grid-item">
                    <Element>
                        Hvis pasienten ikke kan gå tilbake til eget arbeid, hva antar du at pasienten kan utføre av
                        annet arbeid/arbeidsoppgaver?
                    </Element>
                    <Normaltekst>{sykmelding.utdypendeOpplysninger.get('6.6').get('6.6.2').svar}</Normaltekst>
                </div>
            )}
            {sykmelding.utdypendeOpplysninger.has('6.6') && sykmelding.utdypendeOpplysninger.get('6.6').has('6.6.3') && (
                <div className="grid-item">
                    <Element>Hvilken betydning har denne sykdommen for den nedsatte arbeidsevnen?</Element>
                    <Normaltekst>{sykmelding.utdypendeOpplysninger.get('6.6').get('6.6.3').svar}</Normaltekst>
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

    const tilbakedatertBuilder = (): JSX.Element => (
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
                    <img src={checkBox} alt="Checkbox icon" className="checkbox__ikon" />
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
                            <img src={checkBox} alt="Checkbox icon" className="checkbox__ikon" />
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
                        <img src={checkBox} alt="Checkbox icon" className="checkbox__ikon" />
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

    const kiropraktorBuilder = (): JSX.Element => (
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

    const flerePerioderBuilder = (): JSX.Element => (
        <>
            {!!sykmelding.syketilfelleStartDato && (
                <div className="grid-item">
                    <Element>Når startet det legemeldte sykefraværet?</Element>
                    <Normaltekst>{dayjs(sykmelding.syketilfelleStartDato).format('DD.MM.YYYY')}</Normaltekst>
                </div>
            )}
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
                {sykmelding.perioder.map((periode, index) =>
                    !!periode.gradert && !!periode.gradert.grad ? (
                        <Normaltekst key={index}>{periode.gradert.grad + ' %'}</Normaltekst>
                    ) : (
                        <Normaltekst key={index}>100 %</Normaltekst>
                    ),
                )}
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
        </>
    );

    return (
        <>
            {sykmeldingHeader()}
            <div className="sykmelding">
                <div className="sykmelding-grid">
                    <div className="grid-item grid-item__tittel">
                        <Systemtittel>Sykmelding</Systemtittel>
                    </div>
                    {aktuellArsak == RuleNames.TILBAKEDATERT_MED_BEGRUNNELSE_FORLENGELSE &&
                        tilbakedatertLopendePeriodeBuilder()}
                    {aktuellArsak == RuleNames.TILBAKEDATERT_MED_BEGRUNNELSE_FORSTE_SYKMELDING &&
                        tilbakedatertBuilder()}
                    {aktuellArsak == RuleNames.AVVENTENDE_SYKMELDING_KOMBINERT && flerePerioderBuilder()}
                    {aktuellArsak == RuleNames.BEHANDLER_KI_FT_MT_BENYTTER_ANNEN_DIAGNOSEKODE_ENN_L &&
                        kiropraktorBuilder()}
                </div>
                <div className="linje-vannrett"></div>
                <Radiogruppe radioNavn="sykmelding-visning" />
            </div>
        </>
    );
};

export default Sykmeldingen;
