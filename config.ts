const PROD_API = true;

export const config = {
  api: {
    host: PROD_API ? 'https://freefeed.net' : 'http://localhost:3000',
  },
  proxy: {
    host: PROD_API ? 'https://freefeed-api-proxy.applied.creagenics.com' : 'http://localhost:3001'
  }
};
