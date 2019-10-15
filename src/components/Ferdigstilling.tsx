import * as React from 'react';
import { useAppStore } from '../store/AppStore';
import { Knapp, Flatknapp } from 'nav-frontend-knapper';
import { KnappeTekst } from './Knapper';

const Ferdigstilling: React.FC = () => {
    const { aktuellManOppgave, oppdaterSendInnValidering, resettVurdering } = useAppStore();

    const handterFerdigstill = (): void => {
        //send inn totalresultat
        console.log('ferdigstill');
        console.log(aktuellManOppgave);
        oppdaterSendInnValidering(true);
        /*
        fetch('https://syfosmmanuell-backend.nais.preprod.local/api/v1/vurderingmanuelloppgave/', {
            method: 'POST',
            body: JSON.stringify(
                new ValidationResult({
                    status: aktuellManOppgave.validationResult.status,
                    ruleHits: aktuellManOppgave.validationResult.ruleHits,
                }),
            ),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            console.log(res);
        });
        */
        //byttAktuellManOppgave();
    };

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
            <Flatknapp onClick={(): void => resettVurdering()} className="innsending__avbryt">
                Nullstill
            </Flatknapp>
        </div>
    );
};

export default Ferdigstilling;
