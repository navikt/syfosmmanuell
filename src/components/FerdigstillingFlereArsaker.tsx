import * as React from 'react';
import { useAppStore } from '../store/AppStore';
import { Knapp, Flatknapp } from 'nav-frontend-knapper';
import { KnappeTekst } from './Radiogruppe';

const FerdigstillingFlereArsaker: React.FC = () => {
    const { aktuellManOppgave, oppdaterSendInnValidering, resettVurdering } = useAppStore();

    const handterFerdigstill = (): void => {
        oppdaterSendInnValidering(true);
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

export default FerdigstillingFlereArsaker;
