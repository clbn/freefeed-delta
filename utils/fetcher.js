import fetch from 'isomorphic-unfetch';
import { parseCookies } from 'nookies';

const fetcher = (url, options, ctx) => {
  const token = parseCookies(ctx).freefeed_authToken;

  if (token) {
    if (!options) options = {};
    if (!options.headers) options.headers = {};
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, options);
};

export default fetcher;
