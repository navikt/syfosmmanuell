import * as React from 'react';
import { useAppStore } from '../store/AppStore';
import { Knapp, Flatknapp } from 'nav-frontend-knapper';
import { KnappeTekst } from './Knapper';

const Ferdigstilling: React.FC = () => {
    const { aktuellManOppgave } = useAppStore();

    const handterFerdigstill = (): void => {};

    return (
        <div className="innsending">
            {aktuellManOppgave.validationResult.antallBehandlet < aktuellManOppgave.validationResult.ruleHits.length ? (
                <Knapp disabled htmlType="button" className="innsending__ferdigstill">
                    {KnappeTekst.FERDIGSTILL}
                </Knapp>
            ) : (
                <Knapp htmlType="button" onClick={(): void => handterFerdigstill()}>
                    {KnappeTekst.FERDIGSTILL}
                </Knapp>
            )}
            <Flatknapp onClick={(): void => console.log('avbryt')} className="innsending__avbryt">
                Avbryt
            </Flatknapp>
        </div>
    );
};

export default Ferdigstilling;
