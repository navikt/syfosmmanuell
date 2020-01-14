import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
import { oppgaveFlereRegler } from './data/sykmelding';

const mock = FetchMock.configure({
  enableFallback: true,
  middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(1000), MiddlewareUtils.loggingMiddleware()),
});

mock.get('https://syfosmmanuell.nais.preprod.local/backend/api/v1/hentManuellOppgave/', oppgaveFlereRegler);
mock.put('https://syfosmmanuell.nais.preprod.local/backend/api/v1/vurderingmanuelloppgave/', { key: 'okey' });
