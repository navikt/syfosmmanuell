import '../basic.less'
import '../index.less'
import '../components/MainContent.less';
import '../components/expandable/Expandable.less';
import '../components/form/Form.less';
import '../components/form/InfoTilBehandlerOgPasient.less';
import '../components/hjelpetekst/hjelpetekstwrapper.less';
import '../components/infopanel/infopanel.less';
import '../components/infopanel/panelelementer/diagnose/diagnoseseksjon.less';
import '../components/infopanel/panelelementer/periode/periodeseksjon.less';
import '../components/infopanel/utdypendeelementer/Tilbakedateringsinfo.less';
import '../components/sykmelding/SykmeldingHeader.less';
import '../components/sykmelding/sykmeldingvarianter/HeleSykmeldingen.less';
import StoreProvider from "../data/store";
import { useLayoutEffect } from "react";

export default function MyApp({Component, pageProps}: any) {
    // Replace with non-hacky data mocking
    useLayoutEffect(() => {
        if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_DEMO === 'true') {
            require('../mock');
        }
    }, [])

    return <StoreProvider><Component {...pageProps} /></StoreProvider>
}
