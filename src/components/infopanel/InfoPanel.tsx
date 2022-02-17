import React, { PropsWithChildren } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import Image from 'next/image';

import plaster from '../../svg/plaster.svg';

type Fargetema = 'feil' | 'info' | 'advarsel';

interface InfoPanelProps {
  fargetema: Fargetema;
  tittel: string;
}

const InfoPanel = ({ fargetema, tittel, children }: PropsWithChildren<InfoPanelProps>) => {
  return (
    <article className="infopanel">
      <header className={`infopanel-header infopanel-${fargetema}`}>
        <Image className="infopanel-header-icon" alt="plasterikon" src={plaster} />
        <span className="infopanel-header-tekst">
          <Undertittel>{tittel}</Undertittel>
        </span>
      </header>
      <div className="infopanel-content">{children}</div>
    </article>
  );
};

export default InfoPanel;
