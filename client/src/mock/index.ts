import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { manuellOppgave } from './data/manuellOppgave';
import decorator from './data/decorator.json';
import aktivenhet from './data/aktivenhet.json';

const mock = FetchMock.configure({
  enableFallback: true,
  middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(1000), MiddlewareUtils.loggingMiddleware()),
});

// For decorator
mock.get('/modiacontextholder/api/decorator', decorator);
mock.get('/modiacontextholder/api/context/aktivenhet', aktivenhet);
mock.delete('/modiacontextholder/api/context/aktivbruker', () => Promise.resolve({ status: 200 }));

mock.get('/backend/api/v1/manuellOppgave/', manuellOppgave);
mock.post('/backend/api/v1/vurderingmanuelloppgave/', {});
