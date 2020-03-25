import fetcher from '../utils/fetcher';
import Link from 'next/link';
import { formatPosts, formatUsers } from '../utils/data-formatters';

export const getServerSideProps = async (ctx) => {
  const data = await fetcher(`https://freefeed.net/v2/timelines/home?offset=0`, ctx);

  const posts = formatPosts(data.posts);
  const users = formatUsers(data.users);

  return { props: {
    posts,
    users
  }};
};

const Index = props => {
  const { posts, users } = props;

  return <>
    <h1>Home</h1>
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

export default Index;
