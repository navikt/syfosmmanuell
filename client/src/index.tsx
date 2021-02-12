import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React, { createContext, useState } from 'react';
import './index.less';
import * as serviceWorker from './serviceWorker';
import App from './components/App';
import { DecoratorProps, EnhetDisplay } from './types/DecoratorProps';
import NAVSPA from '@navikt/navspa';

if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_NODE_ENV === 'development') {
  require('./mock');
}
const InternflateDecorator = NAVSPA.importer<DecoratorProps>('internarbeidsflatefs');

export const EnhetContext = createContext<string | null | undefined>(undefined);

const Wrapper = () => {
  const [enhet, setEnhet] = useState<string | null | undefined>(undefined);

  const decoratorConfig: DecoratorProps = {
    appname: 'syfosmmanuell',
    enhet: {
      initialValue: null,
      display: EnhetDisplay.ENHET_VALG,
      onChange: (enhet) => {
        setEnhet(enhet);
      },
    },
    toggles: {
      visVeileder: true,
    },
    useProxy: true,
  };

  return (
    <>
      <InternflateDecorator {...decoratorConfig} />
      <EnhetContext.Provider value={enhet}>
        <main>
          <App enhet={enhet} />
        </main>
      </EnhetContext.Provider>
    </>
  );
};

NAVSPA.eksporter('wrapper', Wrapper);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
