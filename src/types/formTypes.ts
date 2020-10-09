export type Arsak = 'TILBAKEDATERT_FORSTE' | 'TILBAKEDATERT_FORLENGELSE';
interface ArsakTekster<T> {
  key: T;
  label: string;
  messageForSender: string;
  messageForUser: string;
}
export type Arsaker = Record<Arsak, ArsakTekster<Arsak>>;
export const arsaker: Arsaker = {
  TILBAKEDATERT_FORLENGELSE: {
    key: 'TILBAKEDATERT_FORLENGELSE',
    label: 'Sykmeldingen er tilbakedatert uten at det kommer tydelig nok hvorfor dette var nødvendig.',
    messageForSender: 'Dett er en melding til behandler ved tilbakedatert forlengelse',
    messageForUser: 'Dett er en melding til bruker ved tilbakedatert forlengelse',
  },
  TILBAKEDATERT_FORSTE: {
    key: 'TILBAKEDATERT_FORSTE',
    label:
      'NAV kan ikke godta tilbakedateringen. Det må skrives ny der f.o.m-dato er datoen for den første kontakten med pasienten.',
    messageForSender: 'Dett er en melding til behandler ved tilbakedatert første sykmelding',
    messageForUser: 'Dett er en melding til bruker ved tilbakedatert første sykmelding',
  },
};

export interface FormShape {
  godkjent: string;
  avvisningstekst?: Arsak;
}
