import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { oppgaveFlereRegler, oppgaveEnRegel } from './data/sykmelding';

const mock = FetchMock.configure({
  enableFallback: true,
  middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(1000), MiddlewareUtils.loggingMiddleware()),
});

mock.get('https://syfosmmanuell.nais.preprod.local/backend/api/v1/hentManuellOppgave/', oppgaveFlereRegler);
mock.get('https://syfosmmanuell.nais.preprod.local/logout', { body: 'logged out' });
mock.get('https://syfosmmanuell.nais.preprod.local/user', 'Bruker Navn');
mock.put('https://syfosmmanuell.nais.preprod.local/backend/api/v1/vurderingmanuelloppgave/', { key: 'okey' });
