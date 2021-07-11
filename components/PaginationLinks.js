import Link from 'next/link';

const PaginationLinks = ({ offset, username }) => {
  const offsetPositive = offset || 0;
  let olderLink = '/' + username + '?offset=' + (+offsetPositive + 30);
  let newerLink = '/' + username + '?offset=' + (+offsetPositive - 30);

  return <>
    <ul>
      <li>
        {offsetPositive > 0 && <Link href={newerLink}>← Newer entries</Link>}
      </li>

      <li>
        <Link href={olderLink}>Older entries →</Link>
      </li>
    </ul>

    <style jsx>{`
      ul {
        border-top: 1px solid #eee;
        line-height: 2.1rem;
        padding: 0.8rem 0;
        margin: 0;
        display: inline-flex;
        flex-flow: row nowrap;
        width: 100%;
        justify-content: space-between;
      }
      li {
        list-style-type: none;
        text-decoration: none;
      }
    `}</style>
  </>;
}

export default PaginationLinks;