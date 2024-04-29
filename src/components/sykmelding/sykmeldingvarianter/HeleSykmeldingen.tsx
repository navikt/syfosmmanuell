import React from 'react'
import { Button } from '@navikt/ds-react'

import MulighetForArbeid from '../../infopanel/utdypendeelementer/MulighetForArbeid'
import Friskmelding from '../../infopanel/utdypendeelementer/Friskmelding'
import UtdypendeOpplysninger from '../../infopanel/utdypendeelementer/UtdypendeOpplysninger'
import Arbeidsevne from '../../infopanel/utdypendeelementer/Arbeidsevne'
import Annet from '../../infopanel/utdypendeelementer/Annet'
import { tilLesbarDatoMedArstall } from '../../../utils/datoUtils'
import ElementMedTekst from '../../infopanel/layout/ElementMedTekst'
import MeldingTilNAVSection from '../../infopanel/utdypendeelementer/MeldingTilNAVSection'
import MeldingTilArbeidsgiverSection from '../../infopanel/utdypendeelementer/MeldingTilArbeidsgiverSection'
import Diagnoser from '../../infopanel/utdypendeelementer/Diagnoser'
import TilbakedateringsSeksjon from '../../infopanel/utdypendeelementer/TilbakedateringsSeksjon'
import ArbeidsgiverSection from '../../infopanel/utdypendeelementer/ArbeidsgiverSection'
import { Sykmelding } from '../../../types/sykmelding'
import { tilLesbarSykmelder } from '../../../utils/tekstUtils'

interface HeleSykmeldingenProps {
    sykmelding: Sykmelding
    setVisHeleSykmeldingen: (value: boolean) => void
}

const HeleSykmeldingen = ({ sykmelding, setVisHeleSykmeldingen }: HeleSykmeldingenProps) => {
    return (
        <div className="p-4">
            <div className="border-b border-border-divider">
                <ElementMedTekst
                    vis={!!sykmelding.signaturDato}
                    tittel="Datoen sykmeldingen ble skrevet"
                    tekst={tilLesbarDatoMedArstall(sykmelding.signaturDato)}
                    margin
                />
                <ElementMedTekst
                    vis={!!sykmelding.kontaktMedPasient.kontaktDato}
                    tittel="Datoen for dokumenterbar kontakt med pasienten"
                    tekst={tilLesbarDatoMedArstall(sykmelding.kontaktMedPasient.kontaktDato)}
                    margin
                />
                <ElementMedTekst
                    vis={!!sykmelding.behandler}
                    tittel="Sykmelder"
                    tekst={tilLesbarSykmelder(sykmelding.behandler)}
                    margin
                />
            </div>
            <ArbeidsgiverSection arbeidsgiver={sykmelding.arbeidsgiver} />
            <Diagnoser
                medisinskVurdering={sykmelding.medisinskVurdering}
                skjermesForPasient={sykmelding.skjermesForPasient}
            />
            <MulighetForArbeid perioder={sykmelding.perioder} />
            {sykmelding.prognose && <Friskmelding prognose={sykmelding.prognose} />}
            <UtdypendeOpplysninger opplysninger={sykmelding.utdypendeOpplysninger} />
            <Arbeidsevne
                tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen}
                tiltakNAV={sykmelding.tiltakNAV}
                andreTiltak={sykmelding.andreTiltak}
            />
            {sykmelding.meldingTilNAV && <MeldingTilNAVSection meldingTilNAV={sykmelding.meldingTilNAV} />}
            {sykmelding.meldingTilArbeidsgiver && (
                <MeldingTilArbeidsgiverSection meldingTilArbeidsgiver={sykmelding.meldingTilArbeidsgiver} />
            )}
            <TilbakedateringsSeksjon
                kontaktDato={sykmelding.kontaktMedPasient.kontaktDato}
                begrunnelseIkkeKontakt={sykmelding.kontaktMedPasient.begrunnelseIkkeKontakt}
            />
            <Annet behandlerTelefon={sykmelding.behandler.tlf} />
            <div style={{ textAlign: 'center' }}>
                <Button size="small" variant="tertiary" onClick={() => setVisHeleSykmeldingen(false)} className="my-4">
                    Skjul hele sykmeldingen
                </Button>
            </div>
        </div>
    )
}

export default HeleSykmeldingen
