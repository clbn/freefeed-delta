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
        <input type="text" placeholder="API token" name="token" value={token} onChange={handleChange}/>
        <input type="hidden" name="redirect" value="1"/>
        <button type="submit">Sign in</button>
      </form>

      <p style={{color: 'red'}}>{error}</p>
    </main>
  );
};

export default SignIn;
