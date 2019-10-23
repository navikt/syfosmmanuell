class Environment {
    get nodeEnv() {
        return process.env.NODE_ENV;
    }

    get isProduction() {
        return this.nodeEnv === 'production';
    }

    get isPreprod() {
        return this.nodeEnv === 'preprod';
    }

    get isDevelopment() {
        return this.nodeEnv === 'development';
    }

    get hentManuelleOppgaverUrl() {
        return this.isProduction || this.isPreprod
            ? process.env.REACT_APP_GET_MANUELLE_OPPGAVER_URL
            : 'https://syfosmmanuell-backend.nais.preprod.local/api/v1/hentManuellOppgave/?fnr=';
    }

    get putManuellVurderingUrl() {
        return this.isProduction || this.isPreprod
            ? process.env.REACT_APP_PUT_MANUELL_VURDERING_URL
            : 'https://syfosmmanuell-backend.nais.preprod.local/api/v1/vurderingmanuelloppgave/';
    }
}

const env = new Environment();

export default env;
