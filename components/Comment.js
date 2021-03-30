import { useSelector } from 'react-redux';
import Link from 'next/link';

import PieceOfText from './PieceOfText';
import Time from './Time';

const Comment = ({ id, postUrl }) => {
  const comment = useSelector(state => state.comments[id]);
  const authorUsername = useSelector(state => state.users[comment.authorId]?.username);
  const authorDisplayName = useSelector(state => state.users[comment.authorId]?.displayName);

  return (
    <section>
      <div className="icon">💬</div>

      <div className="main">
        <PieceOfText>{comment.body}</PieceOfText>

        {authorUsername && (
          <span className="author">
            {' -\u00a0'}
            <Link href={`/${authorUsername}`}>
              <a>{authorDisplayName}</a>
            </Link>
          </span>
        )}

        <span className="time">
          {' -\u00a0'}
          <Link href={`${postUrl}#comment-${id}`}>
            <a><Time stamp={comment.createdAt} short/></a>
          </Link>
        </span>
      </div>

      <style jsx>{`
        section {
          display: flex;
          flex-wrap: nowrap; /* forcing children to be in a single line */
          align-items: flex-start; /* vertical alignment */
          justify-content: flex-start; /* horizontal alignment */
          margin-bottom: 0.5rem;
        }
        .icon {
          flex: 0 0 1.4rem; /* don't grow, don't shrink, stay at 1.4rem */
          margin-top: 1px;
          margin-bottom: -1px;
        }
        .main {
          flex: 1; /* grow */
          overflow-wrap: break-word;
          min-width: 0; /* needs any min-width value for overflow-wrap to work on flex element */
        }
        .author {
          color: #666;
        }
        .time {
          color: #ccc;
        }
        .time a {
          color: #bbb;
        }
      `}</style>
    </section>
  );
};

export default Comment;
