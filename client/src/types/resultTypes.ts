export interface Merknad {
  type: string;
  beskrivelse: string;
}

export interface Result {
  godkjent: boolean;
  merknad?: Merknad;
  avvisnigstekst?: string;
}
