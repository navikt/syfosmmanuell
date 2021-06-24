import { createFrontendLogger, createMockFrontendLogger, setUpErrorReporting } from '@navikt/frontendlogger/lib';

const frontendloggerApiUrl = 'https://app.adeo.no/frontendlogger/api';

export const logger =
  process.env.NODE_ENV === 'production'
    ? createFrontendLogger('syfosmmanuell', frontendloggerApiUrl)
    : createMockFrontendLogger('syfosmmanuell');

export function setupLogger() {
  if (process.env.NODE_ENV === 'production') {
    setUpErrorReporting(logger);
  }
}
