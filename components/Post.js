import Link from 'next/link';
import Comment from './Comment';
import { getFullDate } from '../utils/time';

const Post = ({ postId, post, comments, users }) => <>
  {post.body}
  {' - '}
  <Link href="/[user]" as={`/${users[post.authorId].username}`}><a>{users[post.authorId].displayName}</a></Link>
  {' - '}
  <Link href="/[user]/[post]" as={`/${users[post.authorId].username}/${postId}`}><a>{getFullDate(post.createdAt)}</a></Link>

  <ul>
    {post.commentIds.map(commentId => (
      <li key={commentId}>
        <Comment postId={postId} commentId={commentId} comment={comments[commentId]} users={users}/>
      </li>
    ))}
  </ul>
</>;

export default Post;
