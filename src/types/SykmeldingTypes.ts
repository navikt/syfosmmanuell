import * as dayjs from 'dayjs';

class MedisinskVurdering {
    hovedDiagnose?: Diagnose;
    biDiagnoser: Diagnose[];
    svangerskap: boolean;
    yrkesskade: boolean;
    yrkesskadeDato?: Date;
    annenFraversArsak?: AnnenFraversArsak

    constructor(medisinskVurdering) {
        this.hovedDiagnose = medisinskVurdering.hovedDiagnose ? new Diagnose(medisinskVurdering.hovedDiagnose) : null;
        this.biDiagnoser = medisinskVurdering.biDiagnoser.map(biDiagnose => {
            new Diagnose(biDiagnose);
        });
        this.svangerskap = medisinskVurdering.svangerskap;
        this.yrkesskade = medisinskVurdering.yrkesskade;
        this.yrkesskadeDato = dayjs(medisinskVurdering.yrkesskadeDato).toDate();
        this.annenFraversArsak = medisinskVurdering.annenFraversArsak ? new AnnenFraversArsak(medisinskVurdering.annenFraversArsak) : null;
    }
}

class Diagnose {
    system: string;
    kode: string;
    constructor(diagnose) {
        this.system = diagnose.system;
        this.kode = diagnose.kode;
    }
}

class AnnenFraversArsak {
    beskrivelse?: string;
    grunn: AnnenFraverGrunn[]
    constructor(annenFraversArsak) {
        this.beskrivelse = annenFraversArsak.beskrivelse,
        this.grunn = annenFraversArsak.grunn
    }
}

enum AnnenFraverGrunn {
    GODKJENT_HELSEINSTITUSJON = "Når vedkommende er innlagt i en godkjent helseinstitusjon",
    BEHANDLING_FORHINDRER_ARBEID = "Når vedkommende er under behandling og legen erklærer at behandlingen gjør det nødvendig at vedkommende ikke arbeider",
    ARBEIDSRETTET_TILTAK = "Når vedkommende deltar på et arbeidsrettet tiltak",
    MOTTAR_TILSKUDD_GRUNNET_HELSETILSTAND = "Når vedkommende på grunn av sykdom, skade eller lyte får tilskott når vedkommende på grunn av sykdom, skade eller lyte får tilskott",
    NODVENDIG_KONTROLLUNDENRSOKELSE = "Når vedkommende er til nødvendig kontrollundersøkelse som krever minst 24 timers fravær, reisetid medregnet",
    SMITTEFARE = "Når vedkommende myndighet har nedlagt forbud mot at han eller hun arbeider på grunn av smittefare",
    ABORT = "Når vedkommende er arbeidsufør som følge av svangerskapsavbrudd",
    UFOR_GRUNNET_BARNLOSHET = "Når vedkommende er arbeidsufør som følge av behandling for barnløshet",
    DONOR = "Når vedkommende er donor eller er under vurdering som donor",
    BEHANDLING_STERILISERING = "Når vedkommende er arbeidsufør som følge av behandling i forbindelse med sterilisering"
}

class Arbeidsgiver {
    harArbeidsgiver: HarArbeidsgiver;
    navn?: string;
    yrkesbetegnelse?: string;
    stillingsprosent?: number;
    constructor(arbeidsgiver) {
        this.harArbeidsgiver = arbeidsgiver.harArbeidsgiver;
        this.navn = arbeidsgiver.navn;
        this.yrkesbetegnelse = arbeidsgiver.yrkesbetegnelse;
        this.stillingsprosent = arbeidsgiver.stillingsprosent;
    }
}

enum HarArbeidsgiver {
    EN_ARBEIDSGIVER = "Én arbeidsgiver",
    FLERE_ARBEIDSGIVERE = "Flere arbeidsgivere",
    INGEN_ARBEIDSGIVER = "Ingen arbeidsgiver"
}

class Periode {
    fom: Date;
    tom: Date;
    aktivitetIkkeMulig?: AktivitetIkkeMulig;
    avventendeInnspillTilArbeidsgiver?: string;
    behandlingsdager?: number;
    gradert?: Gradert;
    reisetilskudd: boolean;
    constructor(periode) {
        this.fom = dayjs(periode.fom).toDate();
        this.tom = dayjs(periode.tom).toDate();
        this.aktivitetIkkeMulig = periode.aktivitetIkkeMulig ? new AktivitetIkkeMulig(periode.aktivitetIkkeMulig) : null;
        this.avventendeInnspillTilArbeidsgiver = periode.avventendeInnspillTilArbeidsgiver;
        this.behandlingsdager = periode.behandlingsdager;
        this.gradert = periode.gradert ? new Gradert(periode.gradert) : null;
        this.reisetilskudd = periode.reisetilskudd;
    }
}

class AktivitetIkkeMulig {
    medisinskArsak?: MedisinskArsak;
    arbeidsrelatertArsak?: ArbeidsrelatertArsak;
    constructor(aktivitetIkkeMulig) {
        this.medisinskArsak = aktivitetIkkeMulig.medisinskArsak ? new MedisinskArsak(aktivitetIkkeMulig.medisinskArsak) : null;
        this.arbeidsrelatertArsak = aktivitetIkkeMulig.arbeidsrelatertArsak ? aktivitetIkkeMulig.arbeidsrelatertArsak : null;
    }
}

class MedisinskArsak {
    beskrivelse?: string;
    arsak: MedisinskArsakType[];
    constructor(medisinskArsak) {
        this.beskrivelse = medisinskArsak.beskrivelse;
        this.arsak = medisinskArsak.arsak;
    }
}

enum MedisinskArsakType {
    TILSTAND_HINDRER_AKTIVITET = "Helsetilstanden hindrer pasienten i å være i aktivitet",
    AKTIVITET_FORVERRER_TILSTAND = "Aktivitet vil forverre helsetilstanden",
    AKTIVITET_FORHINDRER_BEDRING = "Aktivitet vil hindre/forsinke bedring av helsetilstanden",
    ANNET = "Annet"
}

class ArbeidsrelatertArsak {
    beskrivelse?: string;
    arsak: ArbeidsrelatertArsakType[];
    constructor(medisinskArsak) {
        this.beskrivelse = medisinskArsak.beskrivelse;
        this.arsak = medisinskArsak.arsak;
    }
}

enum ArbeidsrelatertArsakType {
    MANGLENDE_TILRETTELEGGING = "Manglende tilrettelegging på arbeidsplassen",
    ANNET = "Annet"
}

class Gradert {
    reisetilskudd: boolean;
    grad: number;
    constructor(gradert) {
        this.reisetilskudd = gradert.reisetilskudd;
        this.grad = gradert.grad
    }
}

class Prognose {
    arbeidsforEtterPeriode: boolean;
    hensynArbeidsplassen?: string;
    erIArbeid?: ErIArbeid;
    erIkkeIArbeid?: ErIkkeIArbeid;
    constructor(prognose) {
        this.arbeidsforEtterPeriode = prognose.arbeidsforEtterPeriode;
        this.hensynArbeidsplassen = prognose.hensynArbeidsplassen;
        this.erIArbeid = prognose.erIArbeid ? new ErIArbeid(prognose.erIArbeid) : null;
        this.erIkkeIArbeid = prognose.erIkkeIArbeid ? new ErIkkeIArbeid(prognose.erIkkeIArbeid) : null;
    }
}

class ErIArbeid {
    egetArbeidPaSikt: boolean;
    annetArbeidPaSikt: boolean;
    arbeidFOM?: Date;
    vurderingsdato?: Date;
    constructor(erIArbeid) {
        this.egetArbeidPaSikt = erIArbeid.egetArbeidPaSikt;
        this.annetArbeidPaSikt = erIArbeid.annetArbeidPaSikt;
        this.arbeidFOM = dayjs(erIArbeid.arbeidFOM).toDate();
        this.vurderingsdato = dayjs(erIArbeid.vurderingsdato).toDate();
    }
}

class ErIkkeIArbeid {
    arbeidsforPaSikt: boolean;
    arbeidsforFOM?: Date;
    vurderingsdato?: Date;
    constructor(erIkkeIArbeid) {
        this.arbeidsforPaSikt = erIkkeIArbeid.arbeidsforPaSikt;
        this.arbeidsforFOM = dayjs(erIkkeIArbeid.arbeidsforFOM).toDate();
        this.vurderingsdato = dayjs(erIkkeIArbeid.vurderingsdato).toDate();
    }
}

class MeldingTilNAV {
    bistandUmiddelbart: boolean;
    beskrivBistand?: string;
    constructor(meldingTilNAV) {
        this.bistandUmiddelbart = meldingTilNAV.bistandUmiddelbart;
        this.beskrivBistand = meldingTilNAV.beskrivBistand;
    }
}

class KontaktMedPasient {
    kontaktDato?: Date;
    begrunnelseIkkeKontakt?: string;
    constructor(kontaktMedPasient) {
        this.kontaktDato = dayjs(kontaktMedPasient.kontaktDato).toDate();
        this.begrunnelseIkkeKontakt = kontaktMedPasient.begrunnelseIkkeKontakt;
    }
}

class Behandler {
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    aktoerId: string;
    fnr: string;
    hpr?: string;
    her?: string;
    adresse: Adresse;
    tlf?: string;
    constructor(behandler) {
        this.fornavn = behandler.fornavn;
        this.mellomnavn = behandler.mellomnavn;
        this.etternavn = behandler.etternavn;
        this.aktoerId = behandler.aktoerId;
        this.fnr = behandler.fnr;
        this.hpr = behandler.hpr;
        this.her = behandler.her;
        this.adresse = behandler.adresse;
        this.tlf = behandler.tlf;
    }
}

class Adresse {
    gate?: string;
    postnummer?: number;
    kommune?: string;
    postboks?: string;
    land?: string;
    constructor(adresse) {
        this.gate = adresse.gate;
        this.postnummer = adresse.postnummer;
        this.kommune = adresse.kommune;
        this.postboks = adresse.postboks;
        this.land = adresse.land;
    }
}

class AvsenderSystem {
    navn: string;
    versjon: string;
    constructor(avsenderSystem) {
        this.navn = avsenderSystem.navn;
        this.versjon = avsenderSystem.versjon;
    }
}

class SporsmalSvar {
    sporsmal: string;
    svar: string;
    restriksjoner: SvarRestriksjon[];
    constructor(sporsmalSvar) {
        this.sporsmal = sporsmalSvar.sporsmal;
        this.svar = sporsmalSvar.svar;
        this.restriksjoner = sporsmalSvar.restriksjoner
    }
}

enum SvarRestriksjon {
    SKJERMET_FOR_ARBEIDSGIVER = "Informasjonen skal ikke vises arbeidsgiver",
    SKJERMET_FOR_PASIENT = "Informasjonen skal ikke vises pasient",
    SKJERMET_FOR_NAV = "Informasjonen skal ikke vises NAV"
}

export class Sykmelding {
    id: string;
    msgId: string;
    pasientAktoerId: string;
    medisinskVurdering: MedisinskVurdering;
    skjermesForPasient: boolean;
    arbeidsgiver: Arbeidsgiver;
    perioder: Periode[];
    prognose?: Prognose;
    utdypendeOpplysninger: Map<string, Map<string, SporsmalSvar>>;
    tiltakArbeidsplassen?: string;
    tiltakNAV?: string;
    andreTiltak?: string;
    meldingTilNAV?: MeldingTilNAV;
    meldingTilArbeidsgiver?: string;
    kontaktMedPasient: KontaktMedPasient;
    behandletTidspunkt: Date;
    behandler: Behandler;
    avsenderSystem: AvsenderSystem;
    syketilfelleStartDato?: Date;
    signaturDato: Date;
    navnFastlege: string;

    constructor( sykmelding ) {
        this.id = sykmelding.id;
        this.msgId = sykmelding.msgId;
        this.pasientAktoerId = sykmelding.pasientAktoerId,
        this.medisinskVurdering = new MedisinskVurdering(sykmelding.medisinskVurdering);
        this.skjermesForPasient = sykmelding.skjermesForPasient,
        this.arbeidsgiver = new Arbeidsgiver(sykmelding.arbeidsgiver);
        this.perioder = new Array<Periode>();
        sykmelding.perioder.forEach( periode => {
            this.perioder.push(new Periode(periode))
        })
        this.prognose = sykmelding.prognose ? new Prognose(sykmelding.prognose) : null;
        this.utdypendeOpplysninger = new Map<string, Map<string, SporsmalSvar>>();
        Object.keys(sykmelding.utdypendeOpplysninger).forEach( key => {
            Object.keys(sykmelding.utdypendeOpplysninger[key]).forEach( key2 => {
                const opplysning = new Map<string, SporsmalSvar>().set(key2, sykmelding.utdypendeOpplysninger[key]);
                this.utdypendeOpplysninger.set(key, opplysning);
            })
        })
        this.tiltakArbeidsplassen = sykmelding.tiltakArbeidsplassen;
        this.tiltakNAV = sykmelding.tiltakNAV;
        this.andreTiltak = sykmelding.andreTiltak;
        this.meldingTilNAV = sykmelding.meldingTilNAV ? new MeldingTilNAV(sykmelding.meldingTilNAV) : null;
        this.meldingTilArbeidsgiver = sykmelding.meldingTilArbeidsgiver;
        this.kontaktMedPasient = new KontaktMedPasient(sykmelding.kontaktMedPasient);
        this.behandletTidspunkt = dayjs(sykmelding.behandletTidspunkt).toDate();
        this.behandler = new Behandler(sykmelding.behandler);
        this.avsenderSystem = new AvsenderSystem(sykmelding.avsenderSystem);
        this.syketilfelleStartDato = dayjs(sykmelding.syketilfelleStartDato).toDate();
        this.signaturDato = dayjs(sykmelding.signaturDato).toDate();
        this.navnFastlege = sykmelding.navnFastlege;
    }
}
