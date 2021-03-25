import { useSelector } from 'react-redux';
import Link from 'next/link';

import Time from './Time';

const Comment = ({ id, postUrl }) => {
  const comment = useSelector(state => state.comments[id]);
  const commentAuthor = useSelector(state => state.users[comment.authorId]);

  return (
    <section>
      💬

      <span className="body">{comment.body}</span>

      {commentAuthor && (
        <span className="author">
          {' -\u00a0'}
          <Link href={`/${commentAuthor.username}`}>
            <a>{commentAuthor.displayName}</a>
          </Link>
        </span>
      )}

      <span className="time">
        {' -\u00a0'}
        <Link href={`${postUrl}#comment-${id}`}>
          <a><Time stamp={comment.createdAt} short/></a>
        </Link>
      </span>

      <style jsx>{`
        section {
          display: block;
          overflow-wrap: break-word;
          text-indent: -1.4rem;
          margin-left: 1.4rem;
          margin-bottom: 0.5rem;
        }
        .body {
          padding-left: 0.4rem;
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
