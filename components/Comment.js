import Link from 'next/link';
import Time from './Time';

const Comment = ({ postId, postAuthorId, commentId, comment, users }) => <>
  {comment.body}
  {users[comment.authorId] && <>
    {' - '}
    <Link href={`/${users[comment.authorId].username}`}>
      <a>{users[comment.authorId].displayName}</a>
    </Link>
  </>}
  {' - '}
  <Link href={`/${users[postAuthorId].username}/${postId}#comment-${commentId}`}>
    <a><Time stamp={comment.createdAt} short/></a>
  </Link>
</>;

export default Comment;
