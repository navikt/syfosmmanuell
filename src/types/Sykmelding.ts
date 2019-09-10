import { TILBAKEDATERT_MED_BEGRUNNELSE } from './begrunnelser';

interface BaseSykmelding {
    property: string
}

interface Tilbakedatert extends BaseSykmelding {
    property1: number
}

interface TilbakedatertLopendeSF extends BaseSykmelding {

}

// legg til resterende sykemeldingskategorier





export class Sykmelding_t implements BaseSykmelding {
    property: string;
    constructor( parsedJson ) {
        this.property = parsedJson.property;
    }    
}


export class Tilbakedatert_t extends Sykmelding_t implements Tilbakedatert {
    property1;
    constructor( parsedJson ) {
        super( parsedJson);
        this.property1 = parsedJson.property1
    }
}