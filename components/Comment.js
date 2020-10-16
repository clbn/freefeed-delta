import Link from 'next/link';
import Time from './Time';

const Comment = ({ postId, postAuthorId, commentId, comment, users }) => (
  <section>
    💬

    <span>{comment.body}</span>

    {users[comment.authorId] && <>
      {' -\u00a0'}
      <Link href={`/${users[comment.authorId].username}`}>
        <a>{users[comment.authorId].displayName}</a>
      </Link>
    </>}

    {' -\u00a0'}
    <Link href={`/${users[postAuthorId].username}/${postId}#comment-${commentId}`}>
      <a><Time stamp={comment.createdAt} short/></a>
    </Link>

    <style jsx>{`
      section {
        display: block;
        overflow-wrap: break-word;
        margin-left: 1.4rem;
        text-indent: -1.4rem;
      }
      span {
        padding-left: 0.4rem;
      }
    `}</style>
  </section>
);

export default Comment;
