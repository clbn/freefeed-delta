import { useRouter } from 'next/router';
import Link from 'next/link';

type PaginationLinksProps = {
  pathname: string;
  params?: {
    [key: string]: any;
  };
  hideOnFirst?: boolean;
};

const PaginationLinks = ({ pathname, params, hideOnFirst }: PaginationLinksProps) => {
  const { query: { offset } } = useRouter();

  const normalOffset = +(offset || 0); // normalize offset which can be empty string or undefined
  const newerOffset = Math.max(normalOffset - 30, 0);
  const olderOffset = normalOffset + 30;

  const newerOffsetParam = newerOffset ? { offset: newerOffset } : undefined;
  const olderOffsetParam = { offset: olderOffset };

  const newerLink = { pathname, query: { ...params, ...newerOffsetParam } };
  const olderLink = { pathname, query: { ...params, ...olderOffsetParam } };

  if (hideOnFirst && !offset) {
    return null;
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
