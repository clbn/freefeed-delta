import { NextPageContext } from 'next';
import fetch from 'isomorphic-unfetch';
import { parseCookies } from 'nookies';

const fetcher = (url: string, options: any = {}, ctx: NextPageContext = null) => {
  if (!options.headers) options.headers = {};
  options.headers['Content-Type'] = 'application/json';

  const token = parseCookies(ctx).freefeed_authToken;
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, options);
};

export default fetcher;
