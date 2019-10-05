import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
import { sykmeldingFlereRegler } from './data/sykmelding-flere-regler';

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(1000), MiddlewareUtils.loggingMiddleware()),
});

mock.get('https://syfosmmanuell-backend/api/v1/hentManuellOppgave/', sykmeldingFlereRegler);
