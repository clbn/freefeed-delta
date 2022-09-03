import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end(JSON.stringify({ err: 'Method Not Allowed' }));
    return;
  }

  setCookie({ res }, 'freefeed_authToken', '', {
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

  res.statusCode = 200;
  res.end('{}');
}
