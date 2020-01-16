import React, { useState, useEffect } from 'react';
import { Flatknapp } from 'nav-frontend-knapper';
import { hentLogOutUrl, hentLogInUrl } from '../utils/urlUtils';
import { EtikettLiten } from 'nav-frontend-typografi';

type Knappetekst = 'Logg ut' | 'Logg inn';

interface NavbarProps {
  visInnhold: (vis: boolean) => void;
}

const Navbar = ({ visInnhold }: NavbarProps) => {
  const [text, setText] = useState<string | undefined>();
  const [knappetekst, setKnappetekst] = useState<Knappetekst>('Logg ut');

  useEffect(() => {
    const URL = process.env.REACT_APP_WEB_SERVER_URL
      ? process.env.REACT_APP_WEB_SERVER_URL + 'user'
      : 'https://syfosmmanuell.nais.preprod.local/user';
    fetch(URL)
      .then(res => {
        console.log(res);
        res.text();
      })
      .then(text => {
        console.log(text);
        setText(`Logget inn som: ${text}`);
      })
      .catch(error => console.log(error));
  }, [visInnhold]);

  const loggUt = () => {
    fetch(hentLogOutUrl())
      .then(res => {
        if (res.status === 200) {
          setText(undefined);
          setKnappetekst('Logg inn');
          visInnhold(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const loggInn = () => {
    window.location.href = hentLogInUrl();
  };

  return (
    <div
      className="navbar"
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: '2rem',
        borderBottom: '1px solid #C6C2BF',
      }}
    >
      <EtikettLiten>{text}</EtikettLiten>
      {knappetekst === 'Logg ut' ? (
        <Flatknapp style={{ margin: '0.5rem' }} onClick={() => loggUt()}>
          Logg ut
        </Flatknapp>
      ) : (
        <Flatknapp style={{ margin: '0.5rem' }} onClick={() => loggInn()}>
          Logg inn
        </Flatknapp>
      )}
    </div>
  );
};

export default Navbar;
