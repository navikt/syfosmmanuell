import { AppProps } from 'next/app';
import React from 'react';

import styles from '../index.module.css';
import StoreProvider from '../data/store';
import { ModiaContext, ModiaContextError } from '../services/modiaService';
import ModiaHeader from '../components/modiaheader/ModiaHeader';
import '../basic.less';
import '../components/MainContent.less';
import '../components/expandable/Expandable.less';
import '../components/form/InfoTilBehandlerOgPasient.less';
import '../components/hjelpetekst/hjelpetekstwrapper.less';
import '../components/infopanel/infopanel.less';
import '../components/infopanel/panelelementer/diagnose/diagnoseseksjon.less';
import '../components/infopanel/panelelementer/periode/periodeseksjon.less';
import '../components/infopanel/utdypendeelementer/Tilbakedateringsinfo.less';
import '../components/sykmelding/SykmeldingHeader.less';
import '../components/sykmelding/sykmeldingvarianter/HeleSykmeldingen.less';

export interface BasePageRequiredProps {
  modiaContext: ModiaContext | ModiaContextError;
}

interface MyAppProps extends AppProps<BasePageRequiredProps> {
  pageProps: BasePageRequiredProps;
}

export default function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <StoreProvider modiaContext={pageProps.modiaContext}>
      <ModiaHeader modiaContext={pageProps.modiaContext} />
      <section className={styles.rootSection}>
        <main>
          <Component {...pageProps} />
        </main>
      </section>
    </StoreProvider>
  );
}
