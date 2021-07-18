import Link from 'next/link';
import {useRouter} from "next/router";

const PaginationLinks = ({ hideOnFirst, pathname}) => {
  const { query: { offset } } = useRouter();

  const normalOffset = +(offset || 0); // normalize offset which can be empty string or undefined
  const newerOffset = Math.max(normalOffset - 30, 0);
  const olderOffset = normalOffset + 30;

  const newerLink = pathname + (newerOffset ? '?offset=' + newerOffset : '');
  const olderLink = pathname + '?offset=' + olderOffset;

  if (hideOnFirst && !offset) {
    return false;
  }

  return (
    <ul>
      <li>
        {normalOffset > 0 && (
          <Link href={newerLink}>← Newer entries</Link>
        )}
      </li>

      <li>
        <Link href={olderLink}>Older entries →</Link>
      </li>

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
    </ul>
  );
}

export default PaginationLinks;
