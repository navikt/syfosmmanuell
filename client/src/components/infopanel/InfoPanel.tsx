import React from 'react';
import { Element } from 'nav-frontend-typografi';

import plaster from '../../svg/plaster.svg';

import './infopanel.less';

type Fargetema = 'feil' | 'info' | 'advarsel';

interface InfoPanelProps {
    fargetema: Fargetema;
    tittel: string;
    children: any | any[];
}

const InfoPanel = ({ fargetema, tittel, children }: InfoPanelProps) => {
    return (
        <article className="infopanel">
            <header className={`infopanel-header infopanel-${fargetema}`}>
                <img className="infopanel-header-icon" src={plaster} alt="plasterikon" />{' '}
                <span className="infopanel-header-tekst">
                    <Element>{tittel}</Element>
                </span>
            </header>
            <div className="infopanel-content">{children}</div>
        </article>
    );
};

export default InfoPanel;
