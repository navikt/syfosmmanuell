import * as React from 'react';
import { useAppStore } from '../store/AppStore';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import EnArsakVisning from './EnArsakVisning';
import FerdigstillingFlereArsaker from './FerdigstillingFlereArsaker';
import './FlereArsakerVisning.less';

// const checkCircle = require('../img/check-circle-2.svg');
import CheckCircle from '../img/check-circle-2.svg';
import CrossCircle from '../img/cross-circle.svg';
//const crossCircle = require('../img/cross-circle.svg');

const FlereArsakerVisning: React.FC = () => {
    const { aktuellArsak, aktuellManOppgave, setAktuellArsak } = useAppStore();

    const arsakListe = (): JSX.Element => (
        <>
            {aktuellManOppgave.validationResult.ruleHits.map((arsak, index) => {
                return (
                    <li key={index} className="liste__element arsak-liste__element">
                        <span className="arsak-liste__element--number">{<Element>{index + 1}.</Element>}</span>
                        <span className="arsak-liste__element--venstre">
                            {<Normaltekst>{arsak.ruleName}.</Normaltekst>}
                        </span>
                        <div className="arsak-liste__element--hoyre">
                            {aktuellManOppgave.validationResult.behandlet.get(arsak.ruleName) == true && (
                                <CheckCircle />
                            )}
                            {aktuellManOppgave.validationResult.behandlet.get(arsak.ruleName) == false && (
                                <CrossCircle />
                            )}
                            {aktuellManOppgave.validationResult.behandlet.get(arsak.ruleName) == null && (
                                <Knapp
                                    form="kompakt"
                                    htmlType="button"
                                    onClick={(): void => {
                                        setAktuellArsak(arsak.ruleName);
                                    }}
                                >
                                    Vurder
                                </Knapp>
                            )}
                        </div>
                    </li>
                );
            })}
        </>
    );

    const flerArsakVisning = (): JSX.Element => (
        <>
            <div className="arsak-visning">
                <Element>Årsaker til manuell behandling</Element>
                <ol className="liste arsak-liste">{arsakListe()}</ol>
            </div>
            <FerdigstillingFlereArsaker />
        </>
    );

    const enkelArsakVisning = (): JSX.Element => <EnArsakVisning />;

    return <>{aktuellArsak == null ? flerArsakVisning() : enkelArsakVisning()}</>;
};

export default FlereArsakerVisning;
