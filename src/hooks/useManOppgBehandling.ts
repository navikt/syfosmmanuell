import { useState } from 'react';
import { ManuellOppgave } from '../types/ManuellOppgaveTypes';
import { RuleNames } from '../types/ValidationResultTypes';

const useManOppgBehandling = () => {
    const [manOppgaver, setManOppgaver] = useState<ManuellOppgave[] | null>(null);
    const [aktuellManOppgave, setAktuellManOppgave] = useState<ManuellOppgave | null>(null);
    const [aktuellArsak, setAktuellArsak] = useState<RuleNames | null>(null);

    const oppdaterManOppgaver = (manuelleOppgaver: ManuellOppgave[]): void => {
        setManOppgaver(manuelleOppgaver);
    };

    const oppdaterVurdering = (vurdering: boolean): void => {
        const nyOppgave = new ManuellOppgave(aktuellManOppgave).valideringsResultat.setBehandlet(
            aktuellArsak,
            vurdering,
        );
        setAktuellManOppgave();
        setAktuellManOppgave(
            new ManuellOppgave(aktuellManOppgave).valideringsResultat.behandlet.set(aktuellArsak, vurdering),
        );
        setManOppgaver(manOppgaver =>
            manOppgaver.filter(manOppgave => manOppgave.manOppgId != aktuellManOppgave.manOppgId).push(),
        );

        const nyManOppgaver = manOppgaver.filter(manOppgave => manOppgave.manOppgId != aktuellManOppgave.manOppgId);
        nyManOppgaver.push();
    };

    const oppdaterAktuellManOppgave = (manuellOppgave: ManuellOppgave): void => {
        setAktuellManOppgave(manuellOppgave);
    };

    const oppdaterAktuellArsak = (arsak: RuleNames): void => {
        setAktuellArsak(arsak);
    };
};
