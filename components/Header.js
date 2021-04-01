import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

const Header = () => {
  const myUsername = useSelector(state => state.me.username);

  const handleSignout = useCallback(async event => {
    event.preventDefault();
    if (confirm('Are you sure?')) {
      const response = await fetch('/api/signout', { method: 'POST' });
      if (response.ok) {
        await Router.push('/');
      } else {
        const data = await response.json();
        console.log(data);
      }
    }
  }, []);

  return (
    <header>
      <h1>
        <Link href="/">
          <a>FreeFeed <sup>δ</sup></a>
        </Link>
      </h1>

      {myUsername ? (
        <div className="profile">
          {'Signed in as '}
          <Link href={`/${myUsername}`}>
            <a>{myUsername}</a>
          </Link>
          <form onSubmit={handleSignout} action="/api/signout" method="POST">
            <input type="hidden" name="redirect" value="1"/>
            <button type="submit">Sign out</button>
          </form>
        </div>
      ) : (
        <div className="profile">
          <Link href="/">
            <a>Sign in</a>
          </Link>
        </div>
      )}

      <style jsx>{`
        header {
          display: flex;
          flex-wrap: nowrap; /* forcing children to be in a single line */
          align-items: flex-start; /* vertical alignment */
          justify-content: space-between; /* horizontal alignment */
          padding-bottom: 0;
        }
        h1 {
          min-width: 10rem;
          line-height: 2rem;
        }
        h1 a {
          color: black;
          text-decoration: none;
        }
        h1 sup {
          color: var(--color-secondary);
          background-color: inherit;
          font-size: 1.5rem;
          font-weight: 500;
          padding: 0;
          margin: 0;
          position: static;
        }
        .profile {
          margin-top: 0.625rem;
          text-align: right;
        }
        form {
          display: block;
          min-width: 8rem;
          text-align: right;
          border: none;
          box-shadow: none;
          padding: 0;
          margin: 0.5rem 0 0 0;
        }
        button {
          display: inline;
          cursor: pointer;
          color: var(--color-secondary);
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
