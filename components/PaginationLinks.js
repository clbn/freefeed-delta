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
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        
        border-top: 1px solid #eee;
        padding: 1rem 0;
        margin: 0;
      }
      li {
        list-style-type: none;
      }
    `}</style>
  </>;
}

export default PaginationLinks;