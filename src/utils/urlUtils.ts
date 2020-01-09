export class UrlError extends Error {}

export const hentOppgaveidFraUrlParameter = (url: string): string => {
  if (process.env.NODE_ENV === 'development') {
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
  if (process.env.NODE_ENV === 'development') {
    return 'https://syfosmmanuell-backend.nais.preprod.local/api/v1/hentManuellOppgave/';
  }
  return `https://syfosmmanuell-backend.nais.preprod.local/api/v1/hentManuellOppgave/?oppgaveid=${oppgaveid}`;
};

export const hentOppgaveUrlPut = (oppgaveid: number): string => {
  if (process.env.NODE_ENV === 'development') {
    return 'https://syfosmmanuell-backend.nais.preprod.local/api/v1/vurderingmanuelloppgave/';
  }
  return `https://syfosmmanuell-backend.nais.preprod.local/api/v1/vurderingmanuelloppgave/${oppgaveid}`;
};

export const hentLoginUrl = (): string => {
  if (process.env.NODE_ENV === 'development') {
    return 'https://loginservice.nais.preprod.local/login/?redirect=https://syfosmmanuell.nais.preprod.local';
  }
  return 'https://loginservice.nais.adeo.no/login/?redirect=https://syfosmmanuell.nais.adeo.no';
};
