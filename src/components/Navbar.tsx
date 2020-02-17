import React, { useState, useEffect } from 'react';
import { Flatknapp } from 'nav-frontend-knapper';
import { hentLogOutUrl, hentLogInUrl } from '../utils/urlUtils';
import { EtikettLiten } from 'nav-frontend-typografi';
import './Navbar.less';

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
        return res.text();
      })
      .then(text => {
        if (!text) {
          throw new Error('Kunne ikke hente brukernavn fra server');
        }
        setText(`Logget inn som: ${text}`);
      })
      .catch(error => console.error(error));
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
        console.error(error);
      });
  };

  const loggInn = () => {
    window.location.href = hentLogInUrl();
  };

  return (
    <div className="navbar">
      <EtikettLiten>{text}</EtikettLiten>
      {knappetekst === 'Logg ut' ? (
        <Flatknapp className="navbar__knapp" onClick={() => loggUt()}>
          Logg ut
        </Flatknapp>
      ) : (
        <Flatknapp className="navbar__knapp" onClick={() => loggInn()}>
          Logg inn
        </Flatknapp>
      )}
    </div>
  );
};

export default Navbar;
