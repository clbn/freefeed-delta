import React from 'react';
import Link from "next/link";

const PaginationLinks = ({offset, username}) => {
  const offset2 = offset || 0;
  let olderLink = '/' + username + '?offset=' + (+offset2 + 30);
  let newerLink = '/' + username + '?offset=' + (+offset2 - 30);

  return <>
    <ul className="pagination">
      <li className="newer">
        { offset2 > 0 &&
        <Link href={newerLink}>
          ← Newer entries
        </Link>
        }
      </li>{' '}

      <li className="older">
        <Link href={olderLink}>
          Older entries →
        </Link>
      </li>
    </ul>

    <style jsx>{`
      .pagination {
          border-top: 1px solid #eee;
          line-height: 2.1rem;
          padding: 0.8rem 0;
          margin: 0;
          display: inline-flex;
          flex-flow: row nowrap;
          width: 100%;
          justify-content: space-between;
        }
        .newer, .older {
          list-style-type: none;
          text-decoration: none;
        }
    `}</style>
  </>;
}

export default PaginationLinks;