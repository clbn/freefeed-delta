import { useRouter } from 'next/router';
import fetcher from '../utils/fetcher';
import Link from 'next/link';
import { formatPosts, formatUsers } from '../utils/data-formatters';

export const getServerSideProps = async (ctx) => {
  const { user: username } = ctx.query;

  const [data1, data2] = await Promise.all([
    fetcher(`https://freefeed.net/v1/users/${username}`, ctx),
    fetcher(`https://freefeed.net/v2/timelines/${username}?offset=0`, ctx)
  ]);

  const posts = formatPosts(data2.posts);
  const users = formatUsers(data2.users);

  return { props: {
    user: data1.users || {},
    posts,
    users
  }};
};

const User = props => {
  const { query: { user: username } } = useRouter();
  const { user, posts, users } = props;

  return <>
    <h1>{username}</h1>
    <p>User: {user.screenName}</p>
    <p>Description: {user.description}</p>
    <ul>
      {Object.values(posts).map(post => (
        <li key={post.id}>
          {post.body}
          {' - '}
          <Link href="/[user]" as={`/${users[post.authorId].username}`}><a>{users[post.authorId].displayName}</a></Link>
          {' - '}
          <Link href="/[user]/[post]" as={`/${users[post.authorId].username}/${post.id}`}><a>{post.createdAt}</a></Link>
        </li>
      ))}
    </ul>
  </>;
};

export default User;
