import createUseContext from 'constate';
import useManOppgBehandling from '../hooks/useManOppgBehandling';

export const useAppStore = createUseContext(useManOppgBehandling);
