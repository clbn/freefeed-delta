import Link from 'next/link';
import { useSelector } from 'react-redux';

const Header = () => {
  const myUsername = useSelector(state => state.me.username);

  return (
    <header>
      <Link href="/">
        <a>Home</a>
      </Link>
      {' - Logged in as '}
      <Link href={`/${myUsername}`}>
        <a>{myUsername}</a>
      </Link>
    </header>
  );
};

export default Header;
