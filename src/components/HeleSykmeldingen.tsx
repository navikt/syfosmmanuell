import * as React from 'react';
import { useAppStore } from '../store/AppStore';
import { Element, Undertittel, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import dayjs = require('dayjs');
import { useState, useEffect, useRef } from 'react';
import './Sykmeldingen.less';
import './HeleSykmeldingen.less';
import Radiogruppe from './Radiogruppe';

import Checkbox from '../img/check-box-2.svg';

const HeleSykmeldingen: React.FC = () => {
    const {
        aktuellManOppgave: { sykmelding },
    } = useAppStore();

    const [visHeleSm, setVisHeleSm] = useState(false);
    const sykmeldingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (visHeleSm) {
            setTimeout(() => {
                window.scrollTo({ top: sykmeldingRef.current.offsetTop, behavior: 'smooth' });
            }, 300);
        }
    }, [visHeleSm]);

    const heleSykmeldingenBuilder = (): JSX.Element => (
        <>
            <div className="grid-item linje-vannrett"></div>

            <div className="grid-item grid-item-tittel">
                <Systemtittel>Hele Sykmeldingen</Systemtittel>
            </div>

            <div className="grid-item grid-item-tittel">
                <Element>Perioder</Element>
            </div>
            {sykmelding.perioder.map((periode, index) => (
                <div key={index} className="grid-item">
                    <Normaltekst>
                        {dayjs(periode.fom).format('DD.MM.YYYY') + ' - ' + dayjs(periode.tom).format('DD.MM.YYYY')}
                    </Normaltekst>
                    <Normaltekst>{dayjs(periode.tom).diff(dayjs(periode.fom), 'day')} dager</Normaltekst>
                    <Normaltekst>{!!periode.gradert ? periode.gradert.grad : '100'}% sykmeldt</Normaltekst>
                </div>
            ))}
            {!!sykmelding.medisinskVurdering.annenFraversArsak &&
                !!sykmelding.medisinskVurdering.annenFraversArsak.beskrivelse && (
                    <div className="grid-item">
                        <Element>Beskriv fraværet</Element>
                        <Normaltekst>{sykmelding.medisinskVurdering.annenFraversArsak.beskrivelse}</Normaltekst>
                    </div>
                )}
            {sykmelding.medisinskVurdering.svangerskap && (
                <div className="grid-item checkbox">
                    <Checkbox className="checkbox__ikon" />
                    <div className="checkbox__tekst">
                        <Normaltekst>Sykdommen er svangerskapsrelatert</Normaltekst>
                    </div>
                </div>
            )}
            {sykmelding.medisinskVurdering.yrkesskade && (
                <div className="grid-item checkbox">
                    <Checkbox className="checkbox__ikon" />
                    <div className="checkbox__tekst">
                        <Normaltekst>Sykdommen kan skyldes en skade/yrkessykdom</Normaltekst>
                    </div>
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
            {!!sykmelding.skjermesForPasient && (
                <div className="grid-item checkbox">
                    <Checkbox className="checkbox__ikon" />
                    <div className="checkbox__tekst">
                        <Normaltekst>
                            Det er påtrengende nødvendig å skjerme pasienten for medisinske opplysninger, jf. pasient-
                            og brukerretighetsloven paragraf 3-2 og 5-1
                        </Normaltekst>
                    </div>
                </div>
            )}
            {!!sykmelding.prognose && sykmelding.prognose.hensynArbeidsplassen && (
                <div className="grid-item">
                    <Element>Beskriv eventuelle hensyn som må tas på arbeidsplassen</Element>
                    <Normaltekst>{sykmelding.prognose.hensynArbeidsplassen}</Normaltekst>
                </div>
            )}
            {!!sykmelding.arbeidsgiver.navn && (
                <div className="grid-item">
                    <Element>Arbeidsgiver som legen har skrevet inn</Element>
                    <Normaltekst>{sykmelding.arbeidsgiver.navn}</Normaltekst>
                    {!!sykmelding.arbeidsgiver.yrkesbetegnelse && (
                        <Normaltekst>{sykmelding.arbeidsgiver.stillingsprosent}% stilling</Normaltekst>
                    )}
                </div>
            )}
            <div className="grid-item">
                <Element>Lege/Sykmelder</Element>
                <Normaltekst>
                    {sykmelding.behandler.fornavn} {sykmelding.behandler.mellomnavn} {sykmelding.behandler.etternavn}
                </Normaltekst>
            </div>

            <div className="grid-item linje-vannrett"></div>
            <div className="grid-item grid-item-tittel">
                <Undertittel>Mulighet for arbeid</Undertittel>
            </div>

            {sykmelding.perioder.map((periode, index) => {
                return (
                    <div key={index}>
                        {!!periode.aktivitetIkkeMulig && (
                            <>
                                <div className="grid-item">
                                    <Element>Periode</Element>
                                    <Normaltekst>
                                        {dayjs(periode.fom).format('DD.MM.YYYY')} -{' '}
                                        {dayjs(periode.tom).format('DD.MM.YYYY')}
                                    </Normaltekst>
                                </div>
                                {!!periode.aktivitetIkkeMulig.medisinskArsak && (
                                    <>
                                        <div className="grid-item checkbox">
                                            <Checkbox className="checkbox__ikon" />
                                            <div className="checkbox__tekst">
                                                <Normaltekst>
                                                    Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet.
                                                </Normaltekst>
                                            </div>
                                        </div>
                                        {!!periode.aktivitetIkkeMulig.medisinskArsak.arsak.length && (
                                            <div className="grid-item grid-item--shift-hoyre">
                                                <Element>Angi hva som er årsaken</Element>
                                                {periode.aktivitetIkkeMulig.medisinskArsak.arsak.map((arsak, index) => (
                                                    <Normaltekst key={index}>- {arsak}</Normaltekst>
                                                ))}
                                            </div>
                                        )}
                                        {!!periode.aktivitetIkkeMulig.medisinskArsak.beskrivelse && (
                                            <div className="grid-item grid-item--shift-hoyre">
                                                <Element>Beskriv nærmere</Element>
                                                <Normaltekst>
                                                    {periode.aktivitetIkkeMulig.medisinskArsak.beskrivelse}
                                                </Normaltekst>
                                            </div>
                                        )}
                                    </>
                                )}
                                {!!periode.aktivitetIkkeMulig.arbeidsrelatertArsak && (
                                    <>
                                        <div className="grid-item checkbox">
                                            <Checkbox className="checkbox__ikon" />
                                            <div className="checkbox__tekst">
                                                <Normaltekst>
                                                    Forhold på arbeidsplassen vanskeliggjør arbeidsrelatert aktivitet
                                                </Normaltekst>
                                            </div>
                                        </div>
                                        {!!periode.aktivitetIkkeMulig.arbeidsrelatertArsak.arsak.length && (
                                            <div className="grid-item grid-item--shift-hoyre">
                                                <Element>Angi hva som er årsaken</Element>
                                                {periode.aktivitetIkkeMulig.arbeidsrelatertArsak.arsak.map(
                                                    (arsak, index) => (
                                                        <Normaltekst key={index}>- {arsak}</Normaltekst>
                                                    ),
                                                )}
                                            </div>
                                        )}
                                        {!!periode.aktivitetIkkeMulig.arbeidsrelatertArsak.beskrivelse && (
                                            <div className="grid-item grid-item--shift-hoyre">
                                                <Element>Beskriv nærmere</Element>
                                                <Normaltekst>
                                                    {periode.aktivitetIkkeMulig.arbeidsrelatertArsak.beskrivelse}
                                                </Normaltekst>
                                            </div>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                );
            })}

            <div className="grid-item linje-vannrett"></div>
            <div className="grid-item grid-item-tittel">
                <Undertittel>Friskmelding/prognose</Undertittel>
            </div>

            {!!sykmelding.prognose &&
                !!sykmelding.prognose.erIArbeid &&
                sykmelding.prognose.erIArbeid.egetArbeidPaSikt && (
                    <div className="grid-item checkbox">
                        <Checkbox className="checkbox__ikon" />
                        <div className="checkbox__tekst">
                            <Element>Jeg antar at pasienten på sikt kan komme tilbake til samme arbeidsgiver</Element>
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
                            <Element>Jeg antar at pasienten på sikt kan komme i arbeid hos annen arbeidsgiver</Element>
                        </div>
                    </div>
                )}
            {!!sykmelding.prognose &&
                !!sykmelding.prognose.erIArbeid &&
                (!sykmelding.prognose.erIArbeid.annetArbeidPaSikt ||
                    !sykmelding.prognose.erIArbeid.egetArbeidPaSikt) && (
                    <div className="grid-item checkbox">
                        <Checkbox className="checkbox__ikon" />
                        <div className="checkbox__tekst">
                            <Element>
                                Jeg er usikker på om pasienten kan komme tilbake i arbeid hos egen eller annen
                                arbeidsgiver
                            </Element>
                        </div>
                    </div>
                )}
            {!!sykmelding.prognose &&
                !!sykmelding.prognose.erIkkeIArbeid &&
                sykmelding.prognose.erIkkeIArbeid.arbeidsforPaSikt && (
                    <div className="grid-item checkbox">
                        <Checkbox className="checkbox__ikon" />
                        <div className="checkbox__tekst">
                            <Element>Jeg antar at pasienten på sikt kan komme tilbake i arbeid</Element>
                        </div>
                    </div>
                )}
            {!!sykmelding.prognose &&
                !!sykmelding.prognose.erIkkeIArbeid &&
                !!sykmelding.prognose.erIkkeIArbeid.arbeidsforFOM && (
                    <div className="grid-item">
                        <Element>Anslå når du tror dette kan skje</Element>
                        <Normaltekst>
                            {dayjs(sykmelding.prognose.erIkkeIArbeid.arbeidsforFOM).format('DD.MM.YYYY')}
                        </Normaltekst>
                    </div>
                )}
            {!!sykmelding.prognose &&
                !!sykmelding.prognose.erIkkeIArbeid &&
                sykmelding.prognose.erIkkeIArbeid.vurderingsdato && (
                    <div className="grid-item checkbox">
                        <Checkbox className="checkbox__ikon" />
                        <div className="checkbox__tekst">
                            <Element>Jeg er usikker på om pasienten kan komme tilbake i arbeid</Element>
                        </div>
                    </div>
                )}
            {!!sykmelding.prognose &&
                !!sykmelding.prognose.erIkkeIArbeid &&
                !!sykmelding.prognose.erIkkeIArbeid.vurderingsdato && (
                    <div className="grid-item">
                        <Element>Når antar du å kunne gi tilbakemelding på dette?</Element>
                        <Normaltekst>
                            {dayjs(sykmelding.prognose.erIkkeIArbeid.vurderingsdato).format('DD.MM.YYYY')}
                        </Normaltekst>
                    </div>
                )}

            {!!sykmelding.utdypendeOpplysninger.size && (
                <>
                    <div className="grid-item linje-vannrett"></div>
                    <div className="grid-item grid-item-tittel">
                        <Undertittel>Utdypende opplysninger</Undertittel>
                        <Element>Helseopplysninger ved vurdering av aktivitetskravet</Element>
                    </div>
                </>
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

            <div className="grid-item linje-vannrett"></div>
            <div className="grid-item grid-item-tittel">
                <Undertittel>Hva skal til for å bedre arbeidsevnen?</Undertittel>
            </div>

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

            {!!sykmelding.meldingTilNAV && (
                <>
                    <div className="grid-item linje-vannrett"></div>
                    <div className="grid-item grid-item-tittel">
                        <Undertittel>Melding til NAV</Undertittel>
                    </div>
                </>
            )}

            {!!sykmelding.meldingTilNAV && sykmelding.meldingTilNAV.bistandUmiddelbart && (
                <div className="grid-item checkbox">
                    <Checkbox className="checkbox__ikon" />
                    <div className="checkbox__tekst">
                        <Normaltekst>Ønskes bistand fra NAV nå?</Normaltekst>
                    </div>
                </div>
            )}
            {!!sykmelding.meldingTilNAV && !!sykmelding.meldingTilNAV.beskrivBistand && (
                <div className="grid-item grid-item--shift-hoyre">
                    <Element>Begrunn nærmere</Element>
                    <Normaltekst>{sykmelding.meldingTilNAV.beskrivBistand}</Normaltekst>
                </div>
            )}

            {!!sykmelding.meldingTilArbeidsgiver && (
                <>
                    <div className="grid-item linje-vannrett"></div>
                    <div className="grid-item grid-item-tittel">
                        <Undertittel>Melding til arbeidsgiver</Undertittel>
                    </div>
                </>
            )}

            {!!sykmelding.meldingTilArbeidsgiver && (
                <div className="grid-item">
                    <Element>Andre innspill til arbeidsgiver</Element>
                    <Normaltekst>{sykmelding.meldingTilArbeidsgiver}</Normaltekst>
                </div>
            )}

            {(!!sykmelding.kontaktMedPasient.kontaktDato || !!sykmelding.kontaktMedPasient.begrunnelseIkkeKontakt) && (
                <>
                    <div className="grid-item linje-vannrett"></div>
                    <div className="grid-item grid-item-tittel">
                        <Undertittel>Melding til arbeidsgiver</Undertittel>
                    </div>
                </>
            )}

            {!!sykmelding.kontaktMedPasient.kontaktDato && (
                <div className="grid-item">
                    <Element>Oppgi dato for dokumenterbar kontakt med pasienten</Element>
                    <Normaltekst>{dayjs(sykmelding.kontaktMedPasient.kontaktDato).format('DD.MM.YYYY')}</Normaltekst>
                </div>
            )}
            {!!sykmelding.kontaktMedPasient.begrunnelseIkkeKontakt && (
                <div className="grid-item">
                    <Element>Pasienten har ikke kunnet ivareta egne interesser. Begrunn</Element>
                    <Normaltekst>{sykmelding.kontaktMedPasient.begrunnelseIkkeKontakt}</Normaltekst>
                </div>
            )}

            <div className="grid-item linje-vannrett"></div>
            <div className="grid-item grid-item-tittel">
                <Undertittel>Annet</Undertittel>
            </div>

            {!!sykmelding.behandler.tlf && (
                <div className="grid-item">
                    <Element>Telefon til lege/sykmelder</Element>
                    <Normaltekst>{sykmelding.behandler.tlf}</Normaltekst>
                </div>
            )}

            <div className="grid-item">
                <Element>Dato sykmeldingen ble skrevet</Element>
                <Normaltekst>{dayjs(sykmelding.signaturDato).format('DD.MM.YYYY')}</Normaltekst>
            </div>

            <div className="grid-item linje-vannrett"></div>
        </>
    );

    return (
        <>
            <p className="lenke vis-hele-sykmeldingen" onClick={(): void => setVisHeleSm(vises => !vises)}>
                {visHeleSm ? 'Vis komprimert sykmelding' : 'Vis hele sykmeldingingen'}
            </p>
            {visHeleSm && (
                <div ref={sykmeldingRef} className="hele-sykmeldingen">
                    {heleSykmeldingenBuilder()}
                    <Radiogruppe radioNavn="hele-sykmeldingen" />
                </div>
            )}
        </>
    );
};

export default HeleSykmeldingen;
