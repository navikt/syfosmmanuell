export class UrlError extends Error {}

export const hentOppgaveidFraUrlParameter = (url: string): string => {
  if (process.env.NODE_ENV === 'development' || 'test') {
    console.info('Du befinner deg i development og vil derfor motta mock-data')
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
  if (process.env.NODE_ENV === 'development' || 'test') {
    return 'https://syfosmmanuell-backend.nais.preprod.local/api/v1/hentManuellOppgave/';
  }
  const GET_MAN_OPPGAVE = process.env.REACT_APP_GET_MANUELLE_OPPGAVER_URL;
  if (!GET_MAN_OPPGAVE) {
    const error = new Error('Kunne ikke finne url for henting av oppgave');
    console.error(error);
    throw error;
  }
  return `${GET_MAN_OPPGAVE + oppgaveid}`;
};

export const hentOppgaveUrlPut = (oppgaveid: number): string => {
  if (process.env.NODE_ENV === 'development' || 'test') {
    return 'https://syfosmmanuell-backend.nais.preprod.local/api/v1/vurderingmanuelloppgave/';
  }
  const PUT_MAN_VURDERING = process.env.REACT_APP_PUT_MANUELL_VURDERING_URL;
  if (!PUT_MAN_VURDERING) {
    const error = new Error('Kunne ikke finne url for vurdering av oppgave');
    console.error(error);
    throw error;
  }
  return `${PUT_MAN_VURDERING + oppgaveid}`;
};

export const hentLoginUrl = (): string => {
  switch (process.env.REACT_APP_NODE_ENV) {
    case 'preprod':
      return 'https://loginservice.nais.preprod.local/login/?redirect=https://syfosmmanuell.nais.preprod.local';
    case 'production':
      return 'https://loginservice.nais.adeo.no/login/?redirect=https://syfosmmanuell.nais.adeo.no';
    default:
      return 'localhost:3000';
  }
};
