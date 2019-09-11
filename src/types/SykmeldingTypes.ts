interface BaseSykmelding {
    property: string
}

export class Sykmelding_t implements BaseSykmelding {
    property: string;
    constructor( parsedJson ) {
        this.property = parsedJson.property;
    }    
}
