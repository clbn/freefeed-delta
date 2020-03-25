import Link from 'next/link';

const Comment = ({ postId, commentId, comment, users }) => <>
  {comment.body}
  {' - '}
  <Link href="/[user]" as={`/${users[comment.authorId].username}`}><a>{users[comment.authorId].displayName}</a></Link>
  {' - '}
  <Link href="/[user]/[post]" as={`/${users[comment.authorId].username}/${postId}#comment-${commentId}`}><a>{comment.createdAt}</a></Link>
</>;

export default Comment;
