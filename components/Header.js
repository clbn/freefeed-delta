import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

const Header = () => {
  const myUsername = useSelector(state => state.me.username);

  const handleSignout = useCallback(async event => {
    event.preventDefault();
    const response = await fetch('/api/signout', { method: 'POST' });
    if (response.ok) {
      await Router.push('/');
    } else {
      const data = await response.json();
      console.log(data);
    }
  }, []);

  return (
    <header>
      <Link href="/">
        <a>Home</a>
      </Link>

      {myUsername && <>
        {' - Signed in as '}
        <Link href={`/${myUsername}`}>
          <a>{myUsername}</a>
        </Link>
        {' - '}
        <form onSubmit={handleSignout} action="/api/signout" method="POST">
          <input type="hidden" name="redirect" value="1"/>
          <button type="submit">Sign out</button>
        </form>
      </>}

      <style jsx>{`
        form {
          display: inline;
          border: none;
          padding: 0;
          margin: 0;
        }
        button {
          display: inline;
          cursor: pointer;
          color: #1d66bf;
          background-color: inherit;
          border: none;
          font-size: inherit;
          font-family: inherit;
          font-weight: inherit;
          padding: 0;
          margin: 0;
        }
        button:hover {
          text-decoration: underline;
        }
      `}</style>
    </header>
  );
};

export default Header;
