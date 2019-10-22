export const received = [
    {
        manuellOppgaveid: 'c973d170-3db1-4902-a10f-b64b50f9cc7f',
        receivedSykmelding: {
            sykmelding: {
                id: 'c973d170-3db1-4902-a10f-b64b50f9cc7f',
                msgId: '46480341067',
                pasientAktoerId: '1266641714611',
                medisinskVurdering: {
                    hovedDiagnose: { system: '2.16.578.1.12.4.1.1.7170', kode: 'L87' },
                    biDiagnoser: [{ system: '2.16.578.1.12.4.1.1.7170', kode: 'L87' }],
                    svangerskap: false,
                    yrkesskade: false,
                    yrkesskadeDato: '2019-09-27',
                    annenFraversArsak: { beskrivelse: 'Medising årsak i kategorien annet', grunn: [] },
                },
                skjermesForPasient: false,
                arbeidsgiver: {
                    harArbeidsgiver: 'EN_ARBEIDSGIVER',
                    navn: 'LOMMEN BARNEHAVE',
                    yrkesbetegnelse: 'Pedagogisk leder',
                    stillingsprosent: 100,
                },
                perioder: [
                    {
                        fom: '2019-09-27',
                        tom: '2019-10-03',
                        aktivitetIkkeMulig: {
                            medisinskArsak: {
                                beskrivelse: 'andre årsaker til sykefravær',
                                arsak: ['AKTIVITET_FORHINDRER_BEDRING'],
                            },
                            arbeidsrelatertArsak: { beskrivelse: 'andre årsaker til sykefravær', arsak: ['ANNET'] },
                        },
                        avventendeInnspillTilArbeidsgiver: null,
                        behandlingsdager: null,
                        gradert: null,
                        reisetilskudd: false,
                    },
                ],
                prognose: {
                    arbeidsforEtterPeriode: true,
                    hensynArbeidsplassen: 'Må ta det pent',
                    erIArbeid: {
                        egetArbeidPaSikt: true,
                        annetArbeidPaSikt: true,
                        arbeidFOM: '2019-09-27',
                        vurderingsdato: '2019-09-27',
                    },
                    erIkkeIArbeid: null,
                },
                utdypendeOpplysninger: {
                    '6.2': {
                        '6.2.1': {
                            sporsmal: 'Beskriv kort sykehistorie, symptomer og funn i dagens situasjon.',
                            svar: 'Langvarig korsryggsmerter. Ømhet og smerte',
                            restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
                        },
                        '6.2.2': {
                            sporsmal: 'Hvordan påvirker sykdommen arbeidsevnen',
                            svar:
                                'Kan ikke utføre arbeidsoppgaver 100% som kreves fra yrket. Duplikatbuster: c78a00e7-2699-4778-a2e9-55eb6c742588',
                            restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
                        },
                        '6.2.3': {
                            sporsmal: 'Har behandlingen frem til nå bedret arbeidsevnen?',
                            svar: 'Nei',
                            restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
                        },
                        '6.2.4': {
                            sporsmal: 'Beskriv Pågående og planlagt henvisning, utredning og/eller behandling',
                            svar: 'Henvist til fysio',
                            restriksjoner: ['SKJERMET_FOR_ARBEIDSGIVER'],
                        },
                    },
                },
                tiltakArbeidsplassen: 'Fortsett som sist.',
                tiltakNAV:
                    'Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hånd som mulig må opereres. Venter på time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ',
                andreTiltak: null,
                meldingTilNAV: null,
                meldingTilArbeidsgiver: null,
                kontaktMedPasient: { kontaktDato: null, begrunnelseIkkeKontakt: null },
                behandletTidspunkt: '2019-09-26T22:00:00',
                behandler: {
                    fornavn: 'Frida',
                    mellomnavn: 'Perma',
                    etternavn: 'Frost',
                    aktoerId: '1000014797129',
                    fnr: '02125922395',
                    hpr: null,
                    her: null,
                    adresse: {
                        gate: 'Kirkegårdsveien 3',
                        postnummer: 1348,
                        kommune: 'Rykkinn',
                        postboks: null,
                        land: 'Country',
                    },
                    tlf: 'tel:94431152',
                },
                avsenderSystem: { navn: 'System X', versjon: '2015 R1 (4835)' },
                syketilfelleStartDato: '2019-09-27',
                signaturDato: '2019-10-04T12:00:36.199',
                navnFastlege: 'Victor Frankenstein',
            },
            personNrPasient: '12018041748',
            tlfPasient: 'tel:94431152',
            personNrLege: '02125922395',
            navLogId: '73377778833',
            msgId: '46480341067',
            legekontorOrgNr: '223456789',
            legekontorHerId: '1234634567',
            legekontorReshId: null,
            legekontorOrgName: 'Kule helsetjenester AS',
            mottattDato: '2019-09-27T00:00:00',
            rulesetVersion: null,
            fellesformat:
                '<EI_fellesformat xmlns="http://www.trygdeetaten.no/xml/eiff/1/" xmlns:ns5="http://www.kith.no/xmlstds/felleskomponent1" xmlns:ns2="http://www.kith.no/xmlstds/msghead/2006-05-24" xmlns:ns4="http://www.kith.no/xmlstds/HelseOpplysningerArbeidsuforhet/2013-10-01" xmlns:ns3="http://www.w3.org/2000/09/xmldsig#">\n    <ns2:MsgHead>\n        <ns2:MsgInfo>\n            <ns2:Type V="SYKMELD" DN="Medisinsk vurdering av arbeidsmulighet ved sykdom, sykmelding"/>\n            <ns2:MIGversion>v1.2 2006-05-24</ns2:MIGversion>\n            <ns2:GenDate>2019-10-04T14:00:36.199</ns2:GenDate>\n            <ns2:MsgId>46480341067</ns2:MsgId>\n            <ns2:Ack V="J" DN="Ja"/>\n            <ns2:Sender>\n                <ns2:ComMethod V="EDI" DN="EDI"/>\n                <ns2:Organisation>\n                    <ns2:OrganisationName>Kule helsetjenester AS</ns2:OrganisationName>\n                    <ns2:Ident>\n                        <ns2:Id>1234634567</ns2:Id>\n                        <ns2:TypeId V="HER" S="2.16.578.1.12.4.1.1.9051" DN="HER-id"/>\n                    </ns2:Ident>\n                    <ns2:Ident>\n                        <ns2:Id>223456789</ns2:Id>\n                        <ns2:TypeId V="ENH" S="1.16.578.1.12.3.1.1.9051" DN="Organisasjonsnummeret i Enhetsregister (Brønnøysund)"/>\n                    </ns2:Ident>\n                    <ns2:Ident>\n                        <ns2:Id>0123</ns2:Id>\n                        <ns2:TypeId V="HER" S="1.23.456.7.89.1.2.3.4567.8912" DN="Identifikator fra Helsetjenesteenhetsregisteret (HER-id)"/>\n                    </ns2:Ident>\n                    <ns2:Address>\n                        <ns2:Type V="PST" DN="Postadresse"/>\n                        <ns2:StreetAdr>TESTVEIEN 1</ns2:StreetAdr>\n                        <ns2:PostalCode>1337</ns2:PostalCode>\n                        <ns2:City>SANDVIKA</ns2:City>\n                    </ns2:Address>\n                    <ns2:HealthcareProfessional>\n                        <ns2:FamilyName>Sødal</ns2:FamilyName>\n                        <ns2:MiddleName>Fos</ns2:MiddleName>\n                        <ns2:GivenName>Ingvild</ns2:GivenName>\n                        <ns2:Ident>\n                            <ns2:Id>1234356</ns2:Id>\n                            <ns2:TypeId V="HER" S="2.16.578.1.12.4.1.1.8268" DN="HER-id"/>\n                        </ns2:Ident>\n                        <ns2:Ident>\n                            <ns2:Id>02125922395</ns2:Id>\n                            <ns2:TypeId V="FNR" S="2.16.578.1.12.4.1.1.8327" DN="Fødselsnummer"/>\n                        </ns2:Ident>\n                        <ns2:Ident>\n                            <ns2:Id>12343568</ns2:Id>\n                            <ns2:TypeId V="HPR" S="6.87.654.3.21.9.8.7.6543.2198" DN="HPR-nummer"/>\n                        </ns2:Ident>\n                        <ns2:TeleCom>\n                            <ns2:TypeTelecom V="WD" DN="Arbeidsplass, direktenummer"/>\n                            <ns2:TeleAddress V="tel:33333333"/>\n                        </ns2:TeleCom>\n                    </ns2:HealthcareProfessional>\n                </ns2:Organisation>\n            </ns2:Sender>\n            <ns2:Receiver>\n                <ns2:ComMethod V="EDI" DN="EDI"/>\n                <ns2:Organisation>\n                    <ns2:OrganisationName>NAV IKT</ns2:OrganisationName>\n                    <ns2:Ident>\n                        <ns2:Id>1234556</ns2:Id>\n                        <ns2:TypeId V="HER" S="2.16.578.1.12.4.1.1.9051" DN="HER-id"/>\n                    </ns2:Ident>\n                    <ns2:Ident>\n                        <ns2:Id>1234556</ns2:Id>\n                        <ns2:TypeId V="HER" S="1.23.456.7.89.1.2.3.4567.8912" DN="Identifikator fra Helsetjenesteenhetsregisteret"/>\n                    </ns2:Ident>\n                    <ns2:Address>\n                        <ns2:Type V="PST" DN="Postadresse"/>\n                        <ns2:StreetAdr>Postboks 5 St Olavs plass</ns2:StreetAdr>\n                        <ns2:PostalCode>0130</ns2:PostalCode>\n                        <ns2:City>OSLO</ns2:City>\n                    </ns2:Address>\n                </ns2:Organisation>\n            </ns2:Receiver>\n            <ns2:Patient>\n                <ns2:FamilyName>BERGHEIM</ns2:FamilyName>\n                <ns2:MiddleName>YNDESDAL</ns2:MiddleName>\n                <ns2:GivenName>DANIEL</ns2:GivenName>\n                <ns2:DateOfBirth>1989-12-12</ns2:DateOfBirth>\n                <ns2:Ident>\n                    <ns2:Id>12018041748</ns2:Id>\n                    <ns2:TypeId V="FNR" S="2.16.578.1.12.4.1.1.8327" DN="Fødselsnummer"/>\n                </ns2:Ident>\n                <ns2:Address>\n                    <ns2:Type V="PST" DN="Postadresse"/>\n                    <ns2:StreetAdr>Oppdiktet gate 32</ns2:StreetAdr>\n                    <ns2:PostalCode>1349</ns2:PostalCode>\n                    <ns2:City>RYKKINN</ns2:City>\n                </ns2:Address>\n            </ns2:Patient>\n        </ns2:MsgInfo>\n        <ns2:Document>\n            <ns2:RefDoc>\n                <ns2:MsgType V="XML" DN="XML-instans"/>\n                <ns2:Content>\n                    <ns4:HelseOpplysningerArbeidsuforhet>\n                        <ns4:SyketilfelleStartDato>2019-09-27</ns4:SyketilfelleStartDato>\n                        <ns4:Pasient>\n                            <ns4:Navn>\n                                <ns4:Etternavn>Frost</ns4:Etternavn>\n                                <ns4:Mellomnavn>Perma</ns4:Mellomnavn>\n                                <ns4:Fornavn>Frida</ns4:Fornavn>\n                            </ns4:Navn>\n                            <ns4:Fodselsnummer>\n                                <ns5:Id>12018041748</ns5:Id>\n                                <ns5:TypeId V="FNR" S="2.16.578.1.12.4.1.1.8116" DN="Fødselsnummer"/>\n                            </ns4:Fodselsnummer>\n                            <ns4:KontaktInfo>\n                                <ns5:TypeTelecom V="HP" DN="Hovedtelefon"/>\n                                <ns5:TeleAddress V="tel:94431152"/>\n                            </ns4:KontaktInfo>\n                            <ns4:NavnFastlege>Victor Frankenstein</ns4:NavnFastlege>\n                            <ns4:NAVKontor>Bærum</ns4:NAVKontor>\n                        </ns4:Pasient>\n                        <ns4:Arbeidsgiver>\n                            <ns4:HarArbeidsgiver V="1" DN="En arbeidsgiver"/>\n                            <ns4:NavnArbeidsgiver>LOMMEN BARNEHAVE</ns4:NavnArbeidsgiver>\n                            <ns4:Yrkesbetegnelse>Pedagogisk leder</ns4:Yrkesbetegnelse>\n                            <ns4:Stillingsprosent>100</ns4:Stillingsprosent>\n                        </ns4:Arbeidsgiver>\n                        <ns4:MedisinskVurdering>\n                            <ns4:HovedDiagnose>\n                                <ns4:Diagnosekode V="L87" S="2.16.578.1.12.4.1.1.7170" DN="TENDINITT INA"/>\n                            </ns4:HovedDiagnose>\n                            <ns4:BiDiagnoser>\n                                <ns4:Diagnosekode V="L87" S="2.16.578.1.12.4.1.1.7170" DN="GANGLION SENE"/>\n                            </ns4:BiDiagnoser>\n                            <ns4:AnnenFraversArsak>\n                                <ns4:Beskriv>Medising årsak i kategorien annet</ns4:Beskriv>\n                            </ns4:AnnenFraversArsak>\n                            <ns4:Svangerskap>false</ns4:Svangerskap>\n                            <ns4:Yrkesskade>false</ns4:Yrkesskade>\n                            <ns4:YrkesskadeDato>2019-09-27</ns4:YrkesskadeDato>\n                            <ns4:SkjermesForPasient>false</ns4:SkjermesForPasient>\n                        </ns4:MedisinskVurdering>\n                        <ns4:Aktivitet>\n                            <ns4:Periode>\n                                <ns4:PeriodeFOMDato>2019-09-27</ns4:PeriodeFOMDato>\n                                <ns4:PeriodeTOMDato>2019-10-03</ns4:PeriodeTOMDato>\n                                <ns4:AktivitetIkkeMulig>\n                                    <ns4:MedisinskeArsaker>\n                                        <ns4:Arsakskode V="3" DN="Annet"/>\n                                        <ns4:Beskriv>andre årsaker til sykefravær</ns4:Beskriv>\n                                    </ns4:MedisinskeArsaker>\n                                    <ns4:Arbeidsplassen>\n                                        <ns4:Arsakskode V="9" DN="Annet"/>\n                                        <ns4:Beskriv>andre årsaker til sykefravær</ns4:Beskriv>\n                                    </ns4:Arbeidsplassen>\n                                </ns4:AktivitetIkkeMulig>\n                            </ns4:Periode>\n                        </ns4:Aktivitet>\n                        <ns4:Prognose>\n                            <ns4:ArbeidsforEtterEndtPeriode>true</ns4:ArbeidsforEtterEndtPeriode>\n                            <ns4:BeskrivHensynArbeidsplassen>Må ta det pent</ns4:BeskrivHensynArbeidsplassen>\n                            <ns4:ErIArbeid>\n                                <ns4:EgetArbeidPaSikt>true</ns4:EgetArbeidPaSikt>\n                                <ns4:ArbeidFraDato>2019-09-27</ns4:ArbeidFraDato>\n                                <ns4:AnnetArbeidPaSikt>true</ns4:AnnetArbeidPaSikt>\n                                <ns4:VurderingDato>2019-09-27</ns4:VurderingDato>\n                            </ns4:ErIArbeid>\n                        </ns4:Prognose>\n                        <ns4:UtdypendeOpplysninger>\n                            <ns4:SpmGruppe>\n                                <ns4:SpmGruppeId>6.2</ns4:SpmGruppeId>\n                                <ns4:SpmGruppeTekst>Utdypende opplysninger ved 8,17 og 39 uker</ns4:SpmGruppeTekst>\n                                <ns4:SpmSvar>\n                                    <ns4:SpmId>6.2.1</ns4:SpmId>\n                                    <ns4:SpmTekst>Beskriv kort sykehistorie, symptomer og funn i dagens situasjon.</ns4:SpmTekst>\n                                    <ns4:Restriksjon>\n                                        <ns4:Restriksjonskode V="A" DN="Informasjonen skal ikke vises arbeidsgiver"/>\n                                    </ns4:Restriksjon>\n                                    <ns4:SvarTekst>Langvarig korsryggsmerter. Ømhet og smerte</ns4:SvarTekst>\n                                </ns4:SpmSvar>\n                                <ns4:SpmSvar>\n                                    <ns4:SpmId>6.2.4</ns4:SpmId>\n                                    <ns4:SpmTekst>Beskriv Pågående og planlagt henvisning, utredning og/eller behandling</ns4:SpmTekst>\n                                    <ns4:Restriksjon>\n                                        <ns4:Restriksjonskode V="A" DN="Informasjonen skal ikke vises arbeidsgiver"/>\n                                    </ns4:Restriksjon>\n                                    <ns4:SvarTekst>Henvist til fysio</ns4:SvarTekst>\n                                </ns4:SpmSvar>\n                                <ns4:SpmSvar>\n                                    <ns4:SpmId>6.2.2</ns4:SpmId>\n                                    <ns4:SpmTekst>Hvordan påvirker sykdommen arbeidsevnen</ns4:SpmTekst>\n                                    <ns4:Restriksjon>\n                                        <ns4:Restriksjonskode V="A" DN="Informasjonen skal ikke vises arbeidsgiver"/>\n                                    </ns4:Restriksjon>\n                                    <ns4:SvarTekst>Kan ikke utføre arbeidsoppgaver 100% som kreves fra yrket. Duplikatbuster: c78a00e7-2699-4778-a2e9-55eb6c742588</ns4:SvarTekst>\n                                </ns4:SpmSvar>\n                                <ns4:SpmSvar>\n                                    <ns4:SpmId>6.2.3</ns4:SpmId>\n                                    <ns4:SpmTekst>Har behandlingen frem til nå bedret arbeidsevnen?</ns4:SpmTekst>\n                                    <ns4:Restriksjon>\n                                        <ns4:Restriksjonskode V="A" DN="Informasjonen skal ikke vises arbeidsgiver"/>\n                                    </ns4:Restriksjon>\n                                    <ns4:SvarTekst>Nei</ns4:SvarTekst>\n                                </ns4:SpmSvar>\n                            </ns4:SpmGruppe>\n                        </ns4:UtdypendeOpplysninger>\n                        <ns4:Tiltak>\n                            <ns4:TiltakArbeidsplassen>Fortsett som sist.</ns4:TiltakArbeidsplassen>\n                            <ns4:TiltakNAV>Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hånd som mulig må opereres. Venter på time. Det er mulig sykemledingen vil vare utover aktuell sm periode. </ns4:TiltakNAV>\n                        </ns4:Tiltak>\n                        <ns4:KontaktMedPasient>\n                            <ns4:BehandletDato>2019-09-27T00:00:00</ns4:BehandletDato>\n                        </ns4:KontaktMedPasient>\n                        <ns4:Behandler>\n                            <ns4:Navn>\n                                <ns4:Etternavn>Frost</ns4:Etternavn>\n                                <ns4:Mellomnavn>Perma</ns4:Mellomnavn>\n                                <ns4:Fornavn>Frida</ns4:Fornavn>\n                            </ns4:Navn>\n                            <ns4:Id>\n                                <ns5:Id>02125922395</ns5:Id>\n                                <ns5:TypeId V="FNR" S="2.16.578.1.12.4.1.1.8116" DN="Fødselsnummer"/>\n                            </ns4:Id>\n                            <ns4:Adresse>\n                                <ns5:Type V="PST" DN="POSTADRESSE"/>\n                                <ns5:StreetAdr>Kirkegårdsveien 3</ns5:StreetAdr>\n                                <ns5:PostalCode>1348</ns5:PostalCode>\n                                <ns5:City>Rykkinn</ns5:City>\n                                <ns5:Country V="Country" DN="Norge"/>\n                            </ns4:Adresse>\n                            <ns4:KontaktInfo>\n                                <ns5:TypeTelecom V="HP" DN="Hovedtelefon"/>\n                                <ns5:TeleAddress V="tel:94431152"/>\n                            </ns4:KontaktInfo>\n                        </ns4:Behandler>\n                        <ns4:AvsenderSystem>\n                            <ns4:SystemNavn>System X</ns4:SystemNavn>\n                            <ns4:SystemVersjon>2015 R1 (4835)</ns4:SystemVersjon>\n                        </ns4:AvsenderSystem>\n                        <ns4:Strekkode>00170272416462604201615322390000011</ns4:Strekkode>\n                    </ns4:HelseOpplysningerArbeidsuforhet>\n                </ns2:Content>\n            </ns2:RefDoc>\n        </ns2:Document>\n        <ns3:Signature>\n            <ns3:SignedInfo>\n                <ns3:CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315"/>\n                <ns3:SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>\n                <ns3:Reference URI="">\n                    <ns3:Transforms>\n                        <ns3:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>\n                    </ns3:Transforms>\n                    <ns3:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>\n                    <ns3:DigestValue>QlR2pL73ef1VBxa0jRN3ECV6oi+RDGPP+8vETLlKjjU=</ns3:DigestValue>\n                </ns3:Reference>\n            </ns3:SignedInfo>\n            <ns3:SignatureValue/>\n            <ns3:KeyInfo>\n                \n                <ns3:X509Data>\n                    <ns3:X509Certificate>tersjndgfnjknjkdfgnjkdfgkndfsgnjkldfgkjndgfknjnjkfdgnmmxvmfjvcxjknjnkcvxjncvxjnxcvjkncxvjnkjkncvxjkfdgjkdfgjknjn</ns3:X509Certificate>\n                </ns3:X509Data>\n            </ns3:KeyInfo>\n        </ns3:Signature>\n    </ns2:MsgHead>\n    <MottakenhetBlokk ediLoggId="73377778833" avsender="2134125125" ebXMLSamtaleId="deb6d7d1-139c-4885-aa22-b9362de06205" meldingsType="xml" avsenderRef="SERIALNUMBER=2134125125, CN=TEST-Flott, OU=R&amp;D, O=Flott AS, C=NO" avsenderFnrFraDigSignatur="02125922395" mottattDatotid="2019-09-27T00:00:00.000Z" partnerReferanse="16524" herIdentifikator="" ebRole="Sykmelder" ebService="Sykmelding" ebAction="Registrering"/>\n</EI_fellesformat>',
            tssid: '',
        },
        validationResult: {
            status: 'MANUAL_PROCESSING',
            ruleHits: [
                {
                    ruleName: 'BEHANDLER_KI_FT_MT_BENYTTER_ANNEN_DIAGNOSEKODE_ENN_L',
                    messageForSender:
                        'Manuellterapeut/kiropraktor eller fysioterapeut med autorisasjon har angitt annen diagnose enn kapittel L (muskel- og skjelettsykdommer)',
                    messageForUser:
                        'Manuellterapeut/kiropraktor eller fysioterapeut med autorisasjon har angitt annen diagnose enn kapittel L (muskel- og skjelettsykdommer)',
                    ruleStatus: 'MANUAL_PROCESSING',
                },
            ],
        },
    },
];

export const receivedParsed = [
    {
        manuellOppgaveid: 'c973d170-3db1-4902-a10f-b64b50f9cc7f',
        validationResult: {
            status: 'MANUAL_PROCESSING',
            ruleHits: [
                {
                    ruleName: 'Sykmeldingen er tilbakedatert med begrunnelse',
                    messageForSender: 'message for sender',
                    messageForUser: 'message for user',
                    ruleStatus: 'MANUAL_PROCESSING',
                },
                {
                    ruleName: 'Sykmelding i løpende sykefravær er tilbakedatert med begrunnelse',
                    messageForSender: 'message for sender',
                    messageForUser: 'message for user',
                    ruleStatus: 'MANUAL_PROCESSING',
                },
            ],
            behandlet: {},
            antallBehandlet: 0,
            totalVurdering: null,
        },
        sykmelding: {
            id: 'detteerensykmeldingid',
            msgId: '123124334',
            pasientAktoerId: '41234123',
            medisinskVurdering: {
                hovedDiagnose: { system: '2.16.578.1.12.4.1.1.7170', kode: 'K24' },
                biDiagnoser: [{ system: '2.16.578.1.12.4.1.1.7170', kode: '-57' }],
                svangerskap: true,
                yrkesskade: false,
                yrkesskadeDato: null,
                annenFraversArsak: {
                    beskrivelse:
                        'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                    grunn: [
                        'Når vedkommende er til nødvendig kontrollundersøkelse som krever minst 24 timers fravær, reisetid medregnet',
                    ],
                },
            },
            skjermesForPasient: false,
            arbeidsgiver: {
                harArbeidsgiver: 'Én arbeidsgiver',
                navn: 'Selskap AS',
                yrkesbetegnelse: 'TODO',
                stillingsprosent: 100,
            },
            perioder: [
                {
                    fom: '2018-10-17T22:00:00.000Z',
                    tom: '2018-11-11T23:00:00.000Z',
                    aktivitetIkkeMulig: null,
                    avventendeInnspillTilArbeidsgiver: null,
                    behandlingsdager: null,
                    gradert: { reisetilskudd: true, grad: 56 },
                    reisetilskudd: false,
                },
            ],
            prognose: {
                arbeidsforEtterPeriode: false,
                hensynArbeidsplassen:
                    'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                erIArbeid: {
                    egetArbeidPaSikt: false,
                    annetArbeidPaSikt: true,
                    arbeidFOM: '2018-11-20T23:00:00.000Z',
                    vurderingsdato: '2018-10-29T23:00:00.000Z',
                },
                erIkkeIArbeid: null,
            },
            utdypendeOpplysninger: {},
            tiltakArbeidsplassen:
                'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
            tiltakNAV:
                'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
            andreTiltak:
                'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
            meldingTilNAV: { bistandUmiddelbart: false, beskrivBistand: null },
            meldingTilArbeidsgiver: null,
            kontaktMedPasient: {
                kontaktDato: '2018-10-03T22:00:00.000Z',
                begrunnelseIkkeKontakt:
                    'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
            },
            behandletTidspunkt: '2018-10-14T12:52:35.000Z',
            behandler: {
                fornavn: 'Fornavn',
                mellomnavn: null,
                etternavn: 'Etternavn',
                aktoerId: '1234',
                fnr: '99999999999',
                hpr: '321',
                her: '123',
                adresse: {
                    gate: 'Gateveien 4',
                    postnummer: 1001,
                    kommune: 'Oslo',
                    postboks: '1212 Gateveien',
                    land: 'NO',
                },
                tlf: '900 00 000',
            },
            avsenderSystem: { navn: 'NAV Test generator', versjon: '1.0' },
            syketilfelleStartDato: '2018-10-09T22:00:00.000Z',
            signaturDato: '2019-04-29T06:34:16.861Z',
            navnFastlege: 'Doktor Legesen',
        },
        sendInnValidering: false,
    },
];
