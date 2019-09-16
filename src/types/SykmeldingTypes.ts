import * as dayjs from 'dayjs';

export class Sykmelding {
    id: string;
    msgId: string;
    pasientAktoerId: string;
    medisinskVurdering: {
        hovedDiagnose: {
            system: string,
            kode: string
        },
        biDiagnoser: [
            {
                system: string,
                kode: string
            }
        ],
        svangerskap: boolean,
        yrkesskade: boolean,
        yrkesskadeDato: Date | null,
        annenFraversArsak: {
            beskrivelse: string,
            grunn: string[] // se nærmere på denne. trenger enum
        }
    };
    skjermesForPasient: boolean;
    arbeidsgiver: {
        harArbeidsgiver: string, // trenger enum
        navn: string, //enum?
        yrkesbetegnelse: string, //enum
        stillignsprosent: number
    };
    perioder: [
        {
            fom: Date,
            tom: Date,
            aktivitetIkkeMulig: null,
            avventendeInnspillTilArbeidsgiver: null,
            behandlingsdager: null,
            gradert: {
                reisetilskudd: boolean,
                grad: number
            },
            reisetilskudd: boolean
        }
    ];
    prognose: {
        arbeidsforEtterPeriode: boolean,
        hensynArbeidsplassen: string,
        erIArbeid: {
            egetArbeidPaSikt: boolean,
            annetArbeidPaSikt: boolean,
            arbeidFOM: Date,
            vurderingsdato: Date
        },
        erIkkeIArbeid: null
    };
    utdypendeOpplysninger: {
        '6.3': {
            '6.3.1': {
                sporsmal: string,
                svar: string,
                restriksjoner: string[] // trenger enum
            },
            '6.3.2': {
                sporsmal: string,
                svar: string,
                restriksjoner: string[] // trenger enum
            }
        }
    };
    tiltakArbeidsplassen: string;
    tiltakNAV: string;
    andreTiltak: string;
    meldingTilNAV: {
        bistandUmiddelbart: boolean,
        beskrivBistand: null
    };
    meldingTilArbeidsgiver: null;
    kontaktMedPasient: {
        kontaktDato: Date,
        begrunnelseIkkeKontakt: string
    };
    behandletTidspunkt: Date;
    behandler: {
        fornavn: string,
        mellomnavn: string,
        etternavn: string,
        aktoerId: string,
        fnr: string,
        hpr: string,
        her: string,
        adresse: {
            gate: string,
            postnummer: number,
            kommune: string,
            postboks: string,
            land: string //enum ?
        },
        telf: string,
    };
    avsenderSystem: {
        navn: string,
        versjon: string
    };
    syketilfelleStartDato: Date;
    signaturDato: Date;
    navnFastlege: string;


    constructor( sykmelding ) {
        this.id = sykmelding.id;
        this.msgId = sykmelding.msgId;
        this.pasientAktoerId = sykmelding.pasientAktoerId,
        this.medisinskVurdering = {
            hovedDiagnose: sykmelding.medisinskVurdering.hovedDiagnose,
            biDiagnoser: sykmelding.medisinskVurdering.biDiagnoser,
            svangerskap: sykmelding.medisinskVurdering.svangerskap,
            yrkesskade: sykmelding.medisinskVurdering.yrkesskade,
            yrkesskadeDato: sykmelding.medisinskVurdering.yrkesskadeDato == null ? null : dayjs(sykmelding.medisinskVurdering.yrkesskadeDato).toDate(),
            annenFraversArsak: sykmelding.medisinskVurdering.annenFraversArsak
        },
        this.skjermesForPasient = sykmelding.skjermesForPasient,
        this.arbeidsgiver = sykmelding.arbeidsgiver,
        this.perioder = [
            {
                fom: dayjs(sykmelding.perioder[0].fom).toDate(),
                tom: dayjs(sykmelding.perioder[0].tom).toDate(),
                aktivitetIkkeMulig: sykmelding.perioder[0].aktivitetIkkeMulig,
                avventendeInnspillTilArbeidsgiver: sykmelding.perioder[0].avventendeInnspillTilArbeidsgiver,
                behandlingsdager: sykmelding.perioder[0].behandlingsdager,
                gradert: sykmelding.perioder[0].gradert,
                reisetilskudd: sykmelding.perioder[0].reisetilskudd
            }
        ];
        this.prognose = {
            arbeidsforEtterPeriode: sykmelding.prognose.arbeidsforEtterPeriode,
            hensynArbeidsplassen: sykmelding.prognose.hensynArbeidsplassen,
            erIArbeid: {
                egetArbeidPaSikt: sykmelding.prognose.erIArbeid.egetArbeidPaSikt,
                annetArbeidPaSikt: sykmelding.prognose.erIArbeid.annetArbeidPaSikt,
                arbeidFOM: dayjs(sykmelding.prognose.erIArbeid.arbeidFOM).toDate(),
                vurderingsdato: dayjs(sykmelding.prognose.erIArbeid.vurderingsdato).toDate(),
            },
            erIkkeIArbeid: sykmelding.prognose.erIkkeIArbeid
        };
        this.utdypendeOpplysninger = {
            '6.3': sykmelding.utdypendeOpplysninger['6.3']
        };
        this.tiltakArbeidsplassen = sykmelding.tiltakArbeidsplassen;
        this.tiltakNAV = sykmelding.tiltakNAV;
        this.andreTiltak = sykmelding.andreTiltak;
        this.meldingTilNAV = sykmelding.meldingTilNAV;
        this.meldingTilArbeidsgiver = sykmelding.meldingTilArbeidsgiver;
        this.kontaktMedPasient = {
            kontaktDato: dayjs(sykmelding.kontaktMedPasient.kontaktDato).toDate(),
            begrunnelseIkkeKontakt: sykmelding.kontaktMedPasient.begrunnelseIkkeKontakt
        };
        this.behandletTidspunkt = dayjs(sykmelding.behandletTidspunkt).toDate();
        this.behandler = sykmelding.behandler;
        this.avsenderSystem = sykmelding.avsenderSystem;
        this.syketilfelleStartDato = dayjs(sykmelding.syketilfelleStartDato).toDate();
        this.signaturDato = dayjs(sykmelding.signaturDato).toDate();
        this.navnFastlege = sykmelding.navnFastlege;
    }
}
