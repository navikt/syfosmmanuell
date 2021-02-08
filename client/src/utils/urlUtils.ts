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
