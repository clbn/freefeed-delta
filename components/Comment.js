import Link from 'next/link';
import Time from './Time';

const Comment = ({ postId, postAuthorId, commentId, comment, users }) => (
  <section>
    💬

    <span className="body">{comment.body}</span>

    {users[comment.authorId] && (
      <span className="author">
        {' -\u00a0'}
        <Link href={`/${users[comment.authorId].username}`}>
          <a>{users[comment.authorId].displayName}</a>
        </Link>
      </span>
    )}

    <span className="time">
      {' -\u00a0'}
      <Link href={`/${users[postAuthorId].username}/${postId}#comment-${commentId}`}>
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

export default Comment;
