import { ManuellOppgave } from '../types/ManuellOppgaveTypes';
import { useAppStore } from '../store/AppStore';
import useFetch from '../hooks/useFetch';

export const postValidationResult = (url: string, manuellOppgave: ManuellOppgave): void => {
    const { setError } = useAppStore();
    const submitValidation = useFetch();
};
