import { useState } from 'react';
import { ManuellOppgave } from '../types/ManuellOppgaveTypes';
import { RuleNames } from '../types/ValidationResultTypes';

interface UseManOppgBehandlingInterface {
    manOppgaver: ManuellOppgave[] | null;
    aktuellManOppgave: ManuellOppgave;
    aktuellArsak: RuleNames;
    oppdaterManOppgaver: Function;
    oppdaterVurdering: Function;
    oppdaterAktuellManOppgave: Function;
    oppdaterAktuellArsak: Function;
}

const useManOppgBehandling = (): UseManOppgBehandlingInterface => {
    const [manOppgaver, setManOppgaver] = useState<ManuellOppgave[] | null>(null);
    const [aktuellManOppgave, setAktuellManOppgave] = useState<ManuellOppgave | null>(null);
    const [aktuellArsak, setAktuellArsak] = useState<RuleNames | null>(null);

    const oppdaterManOppgaver = (manuelleOppgaver: ManuellOppgave[]): void => {
        setManOppgaver(manuelleOppgaver);
    };

    const oppdaterVurdering = (vurdering: boolean): void => {
        const nyOppgave = new ManuellOppgave(aktuellManOppgave);
        nyOppgave.valideringsResultat.setBehandlet(aktuellArsak, vurdering);

        const nyManOppgaver = manOppgaver.filter(manOppgave => manOppgave.manOppgId != aktuellManOppgave.manOppgId);
        nyManOppgaver.push(nyOppgave);
        setManOppgaver(nyManOppgaver);

        setAktuellManOppgave(null);
    };

    const oppdaterAktuellManOppgave = (manuellOppgave: ManuellOppgave): void => {
        setAktuellManOppgave(manuellOppgave);
    };

    const oppdaterAktuellArsak = (arsak: RuleNames): void => {
        setAktuellArsak(arsak);
    };

    return {
        manOppgaver,
        aktuellManOppgave,
        aktuellArsak,
        oppdaterManOppgaver,
        oppdaterVurdering,
        oppdaterAktuellManOppgave,
        oppdaterAktuellArsak,
    };
};

export default useManOppgBehandling;
