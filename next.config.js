const withLess = require('next-with-less');
const { withSentryConfig } = require('@sentry/nextjs');

const SentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
};

module.exports = withSentryConfig(
  withLess({
    lessLoaderOptions: {},
    async rewrites() {
      return [
        {
          source: '/callback',
          destination: '/api/callback',
        },
        {
          source: '/login',
          destination: '/api/login',
        },
      ];
    },
  }),
  SentryWebpackPluginOptions,
);