import * as React from 'react';
import { useAppStore } from '../store/AppStore';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import EnArsakVisning from './EnArsakVisning';
import './FlereArsakerVisning.less';
import Ferdigstilling from './Ferdigstilling';

const FlereArsakerVisning: React.FC = () => {
    const { aktuellArsak, aktuellManOppgave, setAktuellArsak } = useAppStore();

    const flerArsakVisning = (): JSX.Element => (
        <>
            <div className="arsak-visning">
                <Element>Årsaker til manuell behandling</Element>
                <ol className="liste arsak-liste">
                    {aktuellManOppgave.validationResult.ruleHits.map((arsak, index) => {
                        return (
                            <li key={index} className="liste__element arsak-liste__element">
                                <div className="arsak-liste__element--number">{<Element>{index + 1}.</Element>}</div>
                                <div className="arsak-liste__element--venstre">
                                    {<Normaltekst>{arsak.ruleName}.</Normaltekst>}
                                </div>
                                <div className="arsak-liste__element--hoyre">
                                    {aktuellManOppgave.validationResult.behandlet.get(arsak.ruleName) == true && (
                                        <img src="src/img/check-circle-2.svg" alt="Declined icon" className="ikon" />
                                    )}
                                    {aktuellManOppgave.validationResult.behandlet.get(arsak.ruleName) == false && (
                                        <img src="src/img/cross-circle.svg" alt="Declined icon" className="ikon" />
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
                </ol>
            </div>
            <Ferdigstilling />
        </>
    );

    const enkelArsakVisning = (): JSX.Element => <EnArsakVisning />;

    return <>{aktuellArsak == null ? flerArsakVisning() : enkelArsakVisning()}</>;
};

export default FlereArsakerVisning;
