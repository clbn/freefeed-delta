import { useState } from 'react';
import Router from 'next/router'
import fetch from 'isomorphic-unfetch';

const SignIn = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => setToken(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();

    const data = await fetch('/api/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    }).then(r => r.json());

    if (data.user) {
      return Router.push('/');
    } else {
      setError(data.err);
    }
  };

  return (
    <main>
      <h1>Sign in</h1>

      <form onSubmit={handleSubmit} action="/api/signin" method="POST">
        <p style={{ marginTop: 0 }}>
          You can generate a token at FreeFeed.net
          using <a href="https://freefeed.net/settings/app-tokens/create?title=Delta&scopes=read-my-info%20read-feeds%20read-users-info%20read-realtime%20manage-subscription-requests%20manage-groups%20manage-profile%20manage-my-feeds%20manage-posts%20manage-notifications&return_url=https%3A%2F%2Fdelta.applied.creagenics.com%2F">this magic link</a>,
          then return to this page and enter the token in the form below.
        </p>
        <input type="text" placeholder="API token" name="token" value={token} onChange={handleChange}/>
        <input type="hidden" name="redirect" value="1"/>
        <button type="submit">Sign in</button>
      </form>

      <p style={{color: 'red'}}>{error}</p>
    </main>
  );
};

export default SignIn;
