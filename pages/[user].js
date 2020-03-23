import { useRouter } from 'next/router';
import fetcher from '../utils/fetcher';
import Link from 'next/link';

export const getServerSideProps = async (ctx) => {
  const { user: username } = ctx.query;

  const [data1, data2] = await Promise.all([
    fetcher(`https://freefeed.net/v1/users/${username}`),
    fetcher(`https://freefeed.net/v2/timelines/${username}?offset=0`)
  ]);

  return { props: {
    user: data1.users || {},
    posts: data2.posts || []
  }};
};

const User = props => {
  const { query: { user: username } } = useRouter();
  const { user, posts } = props;

  return <>
    <h1>{username}</h1>
    <p>User: {user.screenName}</p>
    <p>Description: {user.description}</p>
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          {post.body} <Link href="/[user]/[post]" as={`/${user.username}/${post.id}`}><a>{post.createdAt}</a></Link>
        </li>
      ))}
    </ul>
  </>;
};

export default User;
