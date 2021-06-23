import {
  createFrontendLogger,
  createMockFrontendLogger,
  DEFAULT_FRONTENDLOGGER_API_URL,
  setUpErrorReporting,
} from '@navikt/frontendlogger/lib';

export const logger =
  process.env.NODE_ENV === 'production'
    ? createFrontendLogger('syfosmmanuell', DEFAULT_FRONTENDLOGGER_API_URL)
    : createMockFrontendLogger('syfosmmanuell');

export function setupLogger() {
  if (process.env.NODE_ENV === 'production') {
    setUpErrorReporting(logger);
  }
}
