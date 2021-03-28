import { useSelector } from 'react-redux';
import Link from 'next/link';

import Time from './Time';

const Comment = ({ id, postUrl }) => {
  const comment = useSelector(state => state.comments[id]);
  const authorUsername = useSelector(state => state.users[comment.authorId]?.username);
  const authorDisplayName = useSelector(state => state.users[comment.authorId]?.displayName);

  return (
    <section>
      <div className="icon">💬</div>

      <div className="main">
        {comment.body}

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
          align-items: flex-start; /* vertical alignment */
          justify-content: flex-start; /* horizontal alignment */
          overflow-wrap: break-word;
          margin-bottom: 0.5rem;
        }
        .icon {
          flex: 0 0 1.4rem; /* don't grow, don't shrink, stay at 1.4rem */
        }
        .main {
          flex: 1; /* grow */
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
