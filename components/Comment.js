import Link from 'next/link';
import Time from './Time';

const Comment = ({ postId, postAuthorId, commentId, comment, users }) => (
  <section>
    {comment.body}
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
      }
    `}</style>
  </section>
);

export default Comment;
