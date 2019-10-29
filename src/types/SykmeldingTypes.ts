import * as dayjs from 'dayjs';

class MedisinskVurdering {
    hovedDiagnose?: Diagnose;
    biDiagnoser: Diagnose[];
    svangerskap: boolean;
    yrkesskade: boolean;
    yrkesskadeDato?: Date;
    annenFraversArsak?: AnnenFraversArsak;
    constructor(medisinskVurdering) {
        this.hovedDiagnose = medisinskVurdering.hovedDiagnose ? new Diagnose(medisinskVurdering.hovedDiagnose) : null;
        this.biDiagnoser = medisinskVurdering.biDiagnoser.map(biDiagnose => new Diagnose(biDiagnose));
        this.svangerskap = medisinskVurdering.svangerskap;
        this.yrkesskade = medisinskVurdering.yrkesskade;
        this.yrkesskadeDato = medisinskVurdering.yrkesskadeDato
            ? dayjs(medisinskVurdering.yrkesskadeDato).toDate()
            : null;
        this.annenFraversArsak = medisinskVurdering.annenFraversArsak
            ? new AnnenFraversArsak(medisinskVurdering.annenFraversArsak)
            : null;
    }
}

class Diagnose {
    system: string;
    kode: string;
    tekst: string;
    constructor(diagnose) {
        this.system = diagnose.system;
        this.kode = diagnose.kode;
        this.tekst = diagnose.tekst;
    }
}

class AnnenFraversArsak {
    beskrivelse?: string;
    grunn: AnnenFraverGrunn[];
    constructor(annenFraversArsak) {
        this.beskrivelse = annenFraversArsak.beskrivelse ? annenFraversArsak.beskrivelse : null;
        this.grunn = annenFraversArsak.grunn.map(grunn => AnnenFraverGrunn[grunn as keyof typeof AnnenFraverGrunn]);
    }
}

export enum AnnenFraverGrunn {
    GODKJENT_HELSEINSTITUSJON = 'Når vedkommende er innlagt i en godkjent helseinstitusjon',
    BEHANDLING_FORHINDRER_ARBEID = 'Når vedkommende er under behandling og legen erklærer at behandlingen gjør det nødvendig at vedkommende ikke arbeider',
    ARBEIDSRETTET_TILTAK = 'Når vedkommende deltar på et arbeidsrettet tiltak',
    MOTTAR_TILSKUDD_GRUNNET_HELSETILSTAND = 'Når vedkommende på grunn av sykdom, skade eller lyte får tilskott når vedkommende på grunn av sykdom, skade eller lyte får tilskott',
    NODVENDIG_KONTROLLUNDENRSOKELSE = 'Når vedkommende er til nødvendig kontrollundersøkelse som krever minst 24 timers fravær, reisetid medregnet',
    SMITTEFARE = 'Når vedkommende myndighet har nedlagt forbud mot at han eller hun arbeider på grunn av smittefare',
    ABORT = 'Når vedkommende er arbeidsufør som følge av svangerskapsavbrudd',
    UFOR_GRUNNET_BARNLOSHET = 'Når vedkommende er arbeidsufør som følge av behandling for barnløshet',
    DONOR = 'Når vedkommende er donor eller er under vurdering som donor',
    BEHANDLING_STERILISERING = 'Når vedkommende er arbeidsufør som følge av behandling i forbindelse med sterilisering',
}

class Arbeidsgiver {
    harArbeidsgiver: HarArbeidsgiver;
    navn?: string;
    yrkesbetegnelse?: string;
    stillingsprosent?: number;
    constructor(arbeidsgiver) {
        const harArbeidsgiver = arbeidsgiver.harArbeidsgiver as keyof typeof HarArbeidsgiver;
        this.harArbeidsgiver = HarArbeidsgiver[harArbeidsgiver];
        this.navn = arbeidsgiver.navn ? arbeidsgiver.navn : null;
        this.yrkesbetegnelse = arbeidsgiver.yrkesbetegnelse ? arbeidsgiver.yrkesbetegnelse : null;
        this.stillingsprosent = arbeidsgiver.stillingsprosent ? arbeidsgiver.stillingsprosent : null;
    }
}

export enum HarArbeidsgiver {
    EN_ARBEIDSGIVER = 'Én arbeidsgiver',
    FLERE_ARBEIDSGIVERE = 'Flere arbeidsgivere',
    INGEN_ARBEIDSGIVER = 'Ingen arbeidsgiver',
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
        this.aktivitetIkkeMulig = periode.aktivitetIkkeMulig
            ? new AktivitetIkkeMulig(periode.aktivitetIkkeMulig)
            : null;
        this.avventendeInnspillTilArbeidsgiver = periode.avventendeInnspillTilArbeidsgiver
            ? periode.avventendeInnspillTilArbeidsgiver
            : null;
        this.behandlingsdager = periode.behandlingsdager ? periode.behandlingsdager : null;
        this.gradert = periode.gradert ? new Gradert(periode.gradert) : null;
        this.reisetilskudd = periode.reisetilskudd;
    }
}

class AktivitetIkkeMulig {
    medisinskArsak?: MedisinskArsak;
    arbeidsrelatertArsak?: ArbeidsrelatertArsak;
    constructor(aktivitetIkkeMulig) {
        this.medisinskArsak = aktivitetIkkeMulig.medisinskArsak
            ? new MedisinskArsak(aktivitetIkkeMulig.medisinskArsak)
            : null;
        this.arbeidsrelatertArsak = aktivitetIkkeMulig.arbeidsrelatertArsak
            ? aktivitetIkkeMulig.arbeidsrelatertArsak
            : null;
    }
}

class MedisinskArsak {
    beskrivelse?: string;
    arsak: MedisinskArsakType[];
    constructor(medisinskArsak) {
        this.beskrivelse = medisinskArsak.beskrivelse ? medisinskArsak.beskrivelse : null;
        const arsakTemp = medisinskArsak.arsak.map(arsak => MedisinskArsak[arsak as keyof typeof MedisinskArsak]);
        this.arsak = arsakTemp;
    }
}

export enum MedisinskArsakType {
    TILSTAND_HINDRER_AKTIVITET = 'Helsetilstanden hindrer pasienten i å være i aktivitet',
    AKTIVITET_FORVERRER_TILSTAND = 'Aktivitet vil forverre helsetilstanden',
    AKTIVITET_FORHINDRER_BEDRING = 'Aktivitet vil hindre/forsinke bedring av helsetilstanden',
    ANNET = 'Annet',
}

class ArbeidsrelatertArsak {
    beskrivelse?: string;
    arsak: ArbeidsrelatertArsakType[];
    constructor(arbeidsrelatertArsak) {
        this.beskrivelse = arbeidsrelatertArsak.beskrivelse ? arbeidsrelatertArsak.beskrivelse : null;
        const arsakTemp = arbeidsrelatertArsak.arsak.map(arsak => MedisinskArsak[arsak as keyof typeof MedisinskArsak]);
        this.arsak = arsakTemp;
    }
}

export enum ArbeidsrelatertArsakType {
    MANGLENDE_TILRETTELEGGING = 'Manglende tilrettelegging på arbeidsplassen',
    ANNET = 'Annet',
}

class Gradert {
    reisetilskudd: boolean;
    grad?: number;
    constructor(gradert) {
        this.reisetilskudd = gradert.reisetilskudd;
        this.grad = gradert.grad;
    }
}

class Prognose {
    arbeidsforEtterPeriode: boolean;
    hensynArbeidsplassen?: string;
    erIArbeid?: ErIArbeid;
    erIkkeIArbeid?: ErIkkeIArbeid;
    constructor(prognose) {
        this.arbeidsforEtterPeriode = prognose.arbeidsforEtterPeriode;
        this.hensynArbeidsplassen = prognose.hensynArbeidsplassen ? prognose.hensynArbeidsplassen : null;
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
        this.arbeidFOM = erIArbeid.arbeidFOM ? dayjs(erIArbeid.arbeidFOM).toDate() : null;
        this.vurderingsdato = erIArbeid.vurderingsdato ? dayjs(erIArbeid.vurderingsdato).toDate() : null;
    }
}

class ErIkkeIArbeid {
    arbeidsforPaSikt: boolean;
    arbeidsforFOM?: Date;
    vurderingsdato?: Date;
    constructor(erIkkeIArbeid) {
        this.arbeidsforPaSikt = erIkkeIArbeid.arbeidsforPaSikt;
        this.arbeidsforFOM = erIkkeIArbeid.arbeidsforFOM ? dayjs(erIkkeIArbeid.arbeidsforFOM).toDate() : null;
        this.vurderingsdato = erIkkeIArbeid.vurderingsdato ? dayjs(erIkkeIArbeid.vurderingsdato).toDate() : null;
    }
}

class MeldingTilNAV {
    bistandUmiddelbart: boolean;
    beskrivBistand?: string;
    constructor(meldingTilNAV) {
        this.bistandUmiddelbart = meldingTilNAV.bistandUmiddelbart;
        this.beskrivBistand = meldingTilNAV.beskrivBistand ? meldingTilNAV.beskrivBistand : null;
    }
}

class KontaktMedPasient {
    kontaktDato?: Date;
    begrunnelseIkkeKontakt?: string;
    constructor(kontaktMedPasient) {
        this.kontaktDato = kontaktMedPasient.kontaktDato ? dayjs(kontaktMedPasient.kontaktDato).toDate() : null;
        this.begrunnelseIkkeKontakt = kontaktMedPasient.begrunnelseIkkeKontakt
            ? kontaktMedPasient.begrunnelseIkkeKontakt
            : null;
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
        this.mellomnavn = behandler.mellomnavn ? behandler.mellomnavn : null;
        this.etternavn = behandler.etternavn;
        this.aktoerId = behandler.aktoerId;
        this.fnr = behandler.fnr;
        this.hpr = behandler.hpr ? behandler.hpr : null;
        this.her = behandler.her ? behandler.her : null;
        this.adresse = behandler.adresse;
        this.tlf = behandler.tlf ? behandler.tlf : null;
    }
}

class Adresse {
    gate?: string;
    postnummer?: number;
    kommune?: string;
    postboks?: string;
    land?: string;
    constructor(adresse) {
        this.gate = adresse.gate ? adresse.gate : null;
        this.postnummer = adresse.postnummer ? adresse.postnummer : null;
        this.kommune = adresse.kommune ? adresse.kommune : null;
        this.postboks = adresse.postboks ? adresse.postboks : null;
        this.land = adresse.land ? adresse.land : null;
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
        const restriksjonerTemp = sporsmalSvar.restriksjoner.map(
            restriksjon => SvarRestriksjon[restriksjon as keyof typeof SvarRestriksjon],
        );
        this.restriksjoner = restriksjonerTemp;
    }
}

export enum SvarRestriksjon {
    SKJERMET_FOR_ARBEIDSGIVER = 'Informasjonen skal ikke vises arbeidsgiver',
    SKJERMET_FOR_PASIENT = 'Informasjonen skal ikke vises pasient',
    SKJERMET_FOR_NAV = 'Informasjonen skal ikke vises NAV',
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

    constructor(sykmelding) {
        this.id = sykmelding.id;
        this.msgId = sykmelding.msgId;
        this.pasientAktoerId = sykmelding.pasientAktoerId;
        this.medisinskVurdering = new MedisinskVurdering(sykmelding.medisinskVurdering);
        this.skjermesForPasient = sykmelding.skjermesForPasient;
        this.arbeidsgiver = new Arbeidsgiver(sykmelding.arbeidsgiver);
        this.perioder = new Array<Periode>();
        sykmelding.perioder.forEach(periode => {
            this.perioder.push(new Periode(periode));
        });
        this.prognose = sykmelding.prognose ? new Prognose(sykmelding.prognose) : null;
        this.utdypendeOpplysninger = new Map<string, Map<string, SporsmalSvar>>();
        Object.keys(sykmelding.utdypendeOpplysninger).forEach(key => {
            const opplysning = new Map<string, SporsmalSvar>();
            Object.keys(sykmelding.utdypendeOpplysninger[key]).forEach(key2 => {
                opplysning.set(key2, new SporsmalSvar(sykmelding.utdypendeOpplysninger[key][key2]));
            });
            this.utdypendeOpplysninger.set(key, opplysning);
        });
        this.tiltakArbeidsplassen = sykmelding.tiltakArbeidsplassen ? sykmelding.tiltakArbeidsplassen : null;
        this.tiltakNAV = sykmelding.tiltakNAV ? sykmelding.tiltakNAV : null;
        this.andreTiltak = sykmelding.andreTiltak ? sykmelding.andreTiltak : null;
        this.meldingTilNAV = sykmelding.meldingTilNAV ? new MeldingTilNAV(sykmelding.meldingTilNAV) : null;
        this.meldingTilArbeidsgiver = sykmelding.meldingTilArbeidsgiver ? sykmelding.meldingTilArbeidsgiver : null;
        this.kontaktMedPasient = new KontaktMedPasient(sykmelding.kontaktMedPasient);
        this.behandletTidspunkt = dayjs(sykmelding.behandletTidspunkt).toDate();
        this.behandler = new Behandler(sykmelding.behandler);
        this.avsenderSystem = new AvsenderSystem(sykmelding.avsenderSystem);
        this.syketilfelleStartDato = sykmelding.syketilfelleStartDato
            ? dayjs(sykmelding.syketilfelleStartDato).toDate()
            : null;
        this.signaturDato = dayjs(sykmelding.signaturDato).toDate();
        this.navnFastlege = sykmelding.navnFastlege;
    }
}
