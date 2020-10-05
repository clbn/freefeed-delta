import Link from 'next/link';

const Header = () => (
  <header>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/[user]" as="/clbn">
      <a>@clbn (private)</a>
    </Link>
    <Link href="/[user]/[post]" as="/clbn/2593ff76-25b3-4620-a286-14d051801499">
      <a>/clbn/2593ff76 (private)</a>
    </Link>
    <Link href="/[user]" as="/support">
      <a>@support (public)</a>
    </Link>
    <Link href="/[user]/[post]" as="/support/75b2bcf7-5d7a-4e01-a58e-b05ef29c20bf">
      <a>/support/75b2bcf7 (public)</a>
    </Link>

    <style jsx>{`
      a {
        margin-right: 15px;
      }
    `}</style>
  </header>
);

export default Header;
