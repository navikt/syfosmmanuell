export class UrlError extends Error {}

export const hentOppgaveidFraUrlParameter = (url: string): string => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    console.info('Du befinner deg i development og vil derfor motta mock-data');
    return '';
  }
  const splitter = url.split('?');
  if (splitter.length === 1) {
    throw new UrlError('Url does not contain any parameters');
  }
  if (splitter.length > 2) {
    throw new UrlError('Url contains several "?"');
  }
  const params = splitter[1].split('&');
  if (params.length > 1) {
    throw new UrlError('Url contains too many parameters');
  }
  const param = params[0].split('=');
  if (param.length === 1 || param[1] === '') {
    throw new UrlError('Parameter does not contain any value');
  }
  if (param[0] === 'oppgaveid') {
    return param[1];
  } else {
    throw new UrlError('The parameter given is not oppgaveid');
  }
};

export const hentOppgaveUrl = (oppgaveid: string): string => {
  if (process.env.REACT_APP_NODE_ENV === 'production' || process.env.REACT_APP_NODE_ENV === 'preprod') {
    const GET_MAN_OPPGAVE = process.env.REACT_APP_GET_MANUELLE_OPPGAVER_URL;
    if (!GET_MAN_OPPGAVE) {
      const error = new Error('Kunne ikke finne url for henting av oppgave');
      console.error(error);
      throw error;
    }
    return `${GET_MAN_OPPGAVE + oppgaveid}`;
  }
  return 'https://syfosmmanuell.nais.preprod.local/backend/api/v1/hentManuellOppgave/';
};

export const hentOppgaveUrlPost = (oppgaveid: number): string => {
  if (process.env.REACT_APP_NODE_ENV === 'production' || process.env.REACT_APP_NODE_ENV === 'preprod') {
    const PUT_MAN_VURDERING = process.env.REACT_APP_PUT_MANUELL_VURDERING_URL;
    if (!PUT_MAN_VURDERING) {
      const error = new Error('Kunne ikke finne url for vurdering av oppgave');
      console.error(error);
      throw error;
    }
    return `${PUT_MAN_VURDERING + oppgaveid}`;
  }
  return 'https://syfosmmanuell.nais.preprod.local/backend/api/v1/vurderingmanuelloppgave/';
};

export const hentLogOutUrl = (): string => {
  if (process.env.NODE_ENV === 'development') {
    return 'https://syfosmmanuell.nais.preprod.local/logout';
  }
  try {
    const url = process.env.REACT_APP_GET_LOG_OUT_URL;
    if (url) {
      return url;
    } else {
      throw new Error('Kunne ikke finne logout url');
    }
  } catch (error) {
    throw error;
  }
};

export const hentLogInUrl = (): string => {
  if (process.env.NODE_ENV === 'development') {
    return 'localhost:3000';
  }
  try {
    const OPPGAVE_ID = localStorage.getItem('OPPGAVE_ID');
    if (!OPPGAVE_ID) {
      throw new Error('Kunne ikke finne OPPGAVE_ID i localStorage');
    }
    const url = process.env.REACT_APP_WEB_SERVER_URL;
    if (!url) {
      throw new Error('Kunne ikke finne url til å logge inn');
    }
    return `${url}?oppgaveid=${OPPGAVE_ID}`;
  } catch (error) {
    throw error;
  }
};
