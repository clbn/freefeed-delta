import fetch from 'isomorphic-unfetch';
import { parseCookies } from 'nookies';

const fetcher = (url, ctx) => {
  const token = parseCookies(ctx).freefeed_authToken;

  const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

  return fetch(url, { headers }).then(r => r.json());
};

export default fetcher;
