import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { oppgaveFlereRegler, oppgaveEnRegel } from './data/sykmelding';
import decorator from './data/decorator.json';
import aktivenhet from './data/aktivenhet.json';

const mock = FetchMock.configure({
  enableFallback: true,
  middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(1000), MiddlewareUtils.loggingMiddleware()),
});

mock.get('/modiacontextholder/api/decorator', decorator);
mock.get('/modiacontextholder/api/context/aktivenhet', aktivenhet);
mock.delete('/modiacontextholder/api/context/aktivbruker', () => Promise.resolve({ status: 200 }));

mock.get('/backend/api/v1/manuellOppgave/', oppgaveFlereRegler);
mock.get('https://syfosmmanuell.nais.preprod.local/logout', { body: 'logged out' });
mock.get('https://syfosmmanuell.nais.preprod.local/user', 'Bruker Navn');
mock.post('/backend/api/v1/vurderingmanuelloppgave/', {});
