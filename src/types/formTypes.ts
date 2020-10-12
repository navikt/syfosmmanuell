export type Arsak = 'TILBAKEDATERT_MANGLER_BEGRUNNELSE' | 'TILBAKEDATERT_IKKE_GODTATT';
interface ArsakTekster<T> {
  key: T;
  label: string;
  messageForSender: string;
  messageForUser: string;
}
export type Arsaker = Record<Arsak, ArsakTekster<Arsak>>;
export const arsaker: Arsaker = {
  TILBAKEDATERT_MANGLER_BEGRUNNELSE: {
    key: 'TILBAKEDATERT_MANGLER_BEGRUNNELSE',
    label: 'Sykmeldingen er tilbakedatert uten at det kommer tydelig nok hvorfor dette var nødvendig.',
    messageForSender:
      'Sykmelding gjelder som hovedregel fra den dagen pasienten oppsøker behandler. Sykmeldingen er tilbakedatert uten at det kommer tydelig nok fram hvorfor dette var nødvendig. Sykmeldingen er derfor avvist, og det må skrives en ny hvis sykmelding fortsatt er aktuelt. Pasienten har fått beskjed.',
    messageForUser:
      'Sykmelding gjelder som hovedregel fra den dagen du oppsøker behandler. Sykmeldingen din er tilbakedatert uten at det er gitt en god nok begrunnelse for dette. Behandleren din må skrive ut en ny sykmelding og begrunne bedre hvorfor den er tilbakedatert. Din behandler har mottatt melding fra NAV om dette.',
  },
  TILBAKEDATERT_IKKE_GODTATT: {
    key: 'TILBAKEDATERT_IKKE_GODTATT',
    label:
      'NAV kan ikke godta tilbakedateringen. Det må skrives ny der f.o.m-dato er datoen for den første kontakten med pasienten.',
    messageForSender:
      'NAV kan ikke godta tilbakedateringen. Sykmeldingen er derfor avvist. Hvis sykmelding fortsatt er aktuelt, må det skrives ny sykmelding der f.o.m.-dato er dagen du var i kontakt med pasienten. Pasienten har fått beskjed.',
    messageForUser:
      'NAV kan ikke godta sykmeldingen din fordi den starter før dagen du tok kontakt med behandleren. Trenger du fortsatt sykmelding, må behandleren din skrive en ny som gjelder fra den dagen dere var i kontakt. Behandleren din har fått beskjed fra NAV om dette.',
  },
};

export interface FormShape {
  godkjent: string;
  avvisningstekst?: Arsak;
}
