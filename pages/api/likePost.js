import fetcher from '../../utils/fetcher';

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end(JSON.stringify({ err: 'Method Not Allowed' }));
    return;
  }

  const postId = req.body?.postId;
  const verb = req.body?.verb;

  if (!postId || !['like', 'unlike'].includes(verb)) {
    res.statusCode = 400;
    res.end(JSON.stringify({ err: 'Bad Request' }));
    return;
  }

  const response = await fetcher(`https://freefeed.net/v1/posts/${postId}/${verb}`, { method: 'POST' }, { req });
  const data = await response.json();

  if (!response.ok) {
    res.statusCode = 401;
    res.end(JSON.stringify(data));
    return;
  }

  const returnUrl = req.body?.returnUrl || req.headers.referer;

  res.statusCode = 303;
  res.setHeader('Location', returnUrl);
  res.end();
};
