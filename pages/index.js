import fetcher from '../utils/fetcher';
import Link from 'next/link';

export const getServerSideProps = async (ctx) => {
  const data = await fetcher(`https://freefeed.net/v2/timelines/home?offset=0`);

  return { props: {
    posts: data.posts || []
  }};
};

const Index = props => {
  const { posts } = props;

  return <>
    <h1>Home</h1>
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          {post.body} <Link href="/[user]/[post]" as={`/e/${post.id}`}><a>{post.createdAt}</a></Link>
        </li>
      ))}
    </ul>
  </>;
};

export default Index;
