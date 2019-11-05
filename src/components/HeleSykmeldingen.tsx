import * as React from 'react';
import { useAppStore } from '../store/AppStore';
import { Element, Undertittel, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import dayjs = require('dayjs');
import { useState, useEffect, useRef } from 'react';
import './SykmeldingVisning.less';
import './HeleSykmeldingen.less';

const checkBox = require('../img/check-box-2.svg');
const crossBox = require('../img/cross-box.svg');

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

            <div className="grid-item">
                <Element>Periode</Element>
                {sykmelding.perioder.map((periode, index) => (
                    <div key={index}>
                        <Normaltekst>
                            {dayjs(periode.fom).format('DD.MM.YYYY') + ' - ' + dayjs(periode.tom).format('DD.MM.YYYY')}
                        </Normaltekst>
                        <Normaltekst>{dayjs(periode.tom).diff(dayjs(periode.fom), 'day')} dager</Normaltekst>
                        <Normaltekst>{!!periode.gradert ? periode.gradert.grad : '100'}% sykmeldt</Normaltekst>
                    </div>
                ))}
            </div>
            {!!sykmelding.medisinskVurdering.annenFraversArsak &&
                !!sykmelding.medisinskVurdering.annenFraversArsak.beskrivelse && (
                    <div className="grid-item">
                        <Element>Beskriv fraværet</Element>
                        <Normaltekst>{sykmelding.medisinskVurdering.annenFraversArsak.beskrivelse}</Normaltekst>
                    </div>
                )}
            {sykmelding.medisinskVurdering.svangerskap && (
                <div className="grid-item checkbox">
                    <img src={checkBox} alt="Checkbox icon" className="checkbox__ikon" />
                    <div className="checkbox__tekst">
                        <Normaltekst>Sykdommen er svangerskapsrelatert</Normaltekst>
                    </div>
                </div>
            )}
            {sykmelding.medisinskVurdering.yrkesskade && (
                <div className="grid-item checkbox">
                    <img src={checkBox} alt="Checkbox icon" className="checkbox__ikon" />
                    <div className="checkbox__tekst">
                        <Normaltekst>Sykdommen kan skyldes en skade/yrkessykdom</Normaltekst>
                    </div>
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
            {!!sykmelding.skjermesForPasient && (
                <div className="grid-item checkbox">
                    <img src={checkBox} alt="Checkbox icon" className="checkbox__ikon" />
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

            {!!sykmelding.syketilfelleStartDato && (
                <div className="grid-item">
                    <Element>Når startet det legemeldte sykefraværet?</Element>
                    <Normaltekst>{dayjs(sykmelding.syketilfelleStartDato).format('DD.MM.YYYY')}</Normaltekst>
                </div>
            )}
            {!!sykmelding.perioder.some(
                periode => !!periode.aktivitetIkkeMulig && !!periode.aktivitetIkkeMulig.medisinskArsak,
            ) && (
                <>
                    <div className="grid-item checkbox">
                        <img src={checkBox} alt="Checkbox icon" className="checkbox__ikon" />
                        <div className="checkbox__tekst">
                            <Normaltekst>
                                Det er medisinske årsaker som hindrer arbeidsrelatert aktivitet.
                                <br />
                                Hvis ja:
                            </Normaltekst>
                        </div>
                    </div>
                    {/* mangler årsaker. */}
                </>
            )}

            <div className="grid-item linje-vannrett"></div>

            <div className="grid-item grid-item-tittel">
                <Undertittel>Mulighet for arbeid</Undertittel>
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
            {sykmelding.medisinskVurdering.svangerskap && (
                <div className="grid-item checkbox">
                    <img src={checkBox} alt="Checkbox icon" className="checkbox__ikon" />
                    <div className="checkbox__tekst">
                        <Normaltekst>Pasienten er i svangerskap</Normaltekst>
                    </div>
                </div>
            )}
            {sykmelding.medisinskVurdering.yrkesskade && (
                <div className="grid-item checkbox grid-item--left">
                    <img src={checkBox} alt="Checkbox icon" className="checkbox__ikon" />
                    <div className="checkbox__tekst">
                        <Normaltekst>Pasienten har yrkesskade</Normaltekst>
                    </div>
                </div>
            )}
            {sykmelding.medisinskVurdering.yrkesskade && !!sykmelding.medisinskVurdering.yrkesskadeDato && (
                <div className="grid-item grid-item--right">
                    <Element>Yrkesskadedato</Element>
                    <Normaltekst>
                        {dayjs(sykmelding.medisinskVurdering.yrkesskadeDato).format('DD.MM.YYYY')}
                    </Normaltekst>
                </div>
            )}
            {!!sykmelding.medisinskVurdering.annenFraversArsak &&
                !!sykmelding.medisinskVurdering.annenFraversArsak.beskrivelse && (
                    <div className="grid-item grid-item--left">
                        <Element>Annen fraværsårsak</Element>
                        <Normaltekst>{sykmelding.medisinskVurdering.annenFraversArsak.beskrivelse}</Normaltekst>
                    </div>
                )}
            {!!sykmelding.medisinskVurdering.annenFraversArsak &&
                !!sykmelding.medisinskVurdering.annenFraversArsak.beskrivelse &&
                sykmelding.medisinskVurdering.annenFraversArsak.grunn.length > 0 && (
                    <div className="grid-item grid-item--right">
                        <Element>Grunn</Element>
                        {sykmelding.medisinskVurdering.annenFraversArsak.grunn.map((grunn, index) => (
                            <Normaltekst key={index}>- {grunn}.</Normaltekst>
                        ))}
                    </div>
                )}
            {sykmelding.skjermesForPasient && (
                <div className="grid-item checkbox">
                    <img src={checkBox} alt="Checkbox icon" className="checkbox__ikon" />
                    <div className="checkbox__tekst">
                        <Normaltekst>Enkelte sykmeldingsopplysninger skjermes for pasienten.</Normaltekst>
                    </div>
                </div>
            )}
            <div className="grid-item grid-item-tittel">
                <Undertittel>Aribeidsgiver</Undertittel>
            </div>
            <div className="grid-item">
                <Element>Antall</Element>
                <Normaltekst>{sykmelding.arbeidsgiver.harArbeidsgiver}</Normaltekst>
            </div>
            {!!sykmelding.arbeidsgiver.navn && (
                <div className="grid-item">
                    <Element>Navn</Element>
                    <Normaltekst>{sykmelding.arbeidsgiver.navn}</Normaltekst>
                </div>
            )}
            {!!sykmelding.arbeidsgiver.yrkesbetegnelse && (
                <div className="grid-item grid-item--left">
                    <Element>Yrkesbetegnelse</Element>
                    <Normaltekst>{sykmelding.arbeidsgiver.yrkesbetegnelse}</Normaltekst>
                </div>
            )}
            {!!sykmelding.arbeidsgiver.stillingsprosent && (
                <div className="grid-item grid-item--right">
                    <Element>Stillingsprosent</Element>
                    <Normaltekst>{sykmelding.arbeidsgiver.stillingsprosent}</Normaltekst>
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
            {sykmelding.utdypendeOpplysninger.has('6.3') && (
                <div className="grid-item grid-item-tittel">
                    <Undertittel>Utdypende opplysninger</Undertittel>
                    <Element>Helseopplysninger ved vurdering av aktivitetskravet</Element>
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

    return (
        <>
            <p className="lenke vis-hele-sykmeldingen" onClick={(): void => setVisHeleSm(vises => !vises)}>
                {visHeleSm ? 'Vis komprimert sykmelding' : 'Vis hele sykmeldingingen'}
            </p>
            {visHeleSm && (
                <div ref={sykmeldingRef} className="hele-sykmeldingen">
                    {heleSykmeldingenBuilder()}
                </div>
            )}
        </>
    );
};

export default HeleSykmeldingen;
