import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN || 'https://ec844becc9cf41f1a0b2e505059ef695@sentry.gc.nav.no/94',
  tracesSampleRate: 1.0,
  enabled: process.env.NODE_ENV === 'production',
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
});
