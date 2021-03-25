import fetch from 'isomorphic-unfetch';
import { setCookie } from 'nookies';
import { formatUser } from '../../utils/data-formatters';

export default async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end(JSON.stringify({ err: 'Method Not Allowed' }));
    return;
  }

  const token = req.body?.token;

  if (!token) {
    res.statusCode = 401;
    res.end(JSON.stringify({ err: 'Unauthorized' }));
    return;
  }

  const headers = { 'Authorization': `Bearer ${token}` };
  const data = await fetch('https://freefeed.net/v2/users/whoami', { headers }).then(r => r.json());

  if (data.err) {
    res.statusCode = 401;
    res.end(JSON.stringify({ err: 'Unauthorized' }));
    return;
  }

  setCookie({ res }, 'freefeed_authToken', token, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    secure: true
  });

  const redirect = req.body?.redirect; // Used by non-JS clients

  if (redirect) {
    res.statusCode = 303;
    res.setHeader('Location', `${req.headers.origin}/`);
    res.end();
    return;
  }

  const user = formatUser(data.users);

  res.statusCode = 200;
  res.end(JSON.stringify({ user }));
};
