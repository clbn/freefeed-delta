import Link from 'next/link';
import { useSelector } from 'react-redux';

const Header = () => {
  const myUsername = useSelector(state => state.me.username);

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
      </>}
    </header>
  );
};

export default Header;
