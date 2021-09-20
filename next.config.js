const withLess = require('next-with-less');

module.exports = withLess({
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
});
