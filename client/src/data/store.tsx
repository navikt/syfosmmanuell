import React, { createContext, Dispatch, useReducer } from 'react';
import { ManuellOppgave } from '../types/manuellOppgave';

interface State {
  isLoading: boolean;
  isCompleted: boolean;
  enhet?: string;
  manuellOppgave?: ManuellOppgave;
  error?: Error;
}

export type Action =
  | { type: 'FETCHING' }
  | { type: 'UPDATE_ENHET'; payload: string }
  | { type: 'TASK_LOADED'; payload: ManuellOppgave }
  | { type: 'TASK_COMPLETED' }
  | { type: 'ERROR'; payload: Error };

export function stateReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCHING':
      return { ...state, isLoading: true };
    case 'UPDATE_ENHET':
      return { ...state, enhet: action.payload };
    case 'TASK_LOADED':
      return { ...state, isLoading: false, manuellOppgave: action.payload };
    case 'TASK_COMPLETED':
      return { ...state, isLoading: false, isCompleted: true, error: undefined };
    case 'ERROR':
      return { ...state, isLoading: false, error: action.payload };
  }
}

export const initialState: State = {
  isLoading: true,
  isCompleted: false,
  manuellOppgave: undefined,
  enhet: undefined,
  error: undefined,
};

export const StoreContext = createContext<{ state: State; dispatch: Dispatch<Action> }>({
  state: initialState,
  dispatch: () => null,
});

const StoreProvider = ({ children }: { children: React.ReactChild | React.ReactChild[] }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
