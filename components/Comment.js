import Link from 'next/link';
import { getFullDate } from '../utils/time';

const Comment = ({ postId, postAuthorId, commentId, comment, users }) => <>
  {comment.body}
  {users[comment.authorId] && <>
    {' - '}
    <Link href="/[user]" as={`/${users[comment.authorId].username}`}><a>{users[comment.authorId].displayName}</a></Link>
  </>}
  {' - '}
  <Link href="/[user]/[post]" as={`/${users[postAuthorId].username}/${postId}#comment-${commentId}`}><a>{getFullDate(comment.createdAt)}</a></Link>
</>;

export default Comment;
