import fetcher from '../utils/fetcher';
import { formatPosts, formatComments, formatUsers } from '../utils/data-formatters';
import Post from '../components/Post';
import SignIn from '../components/SignIn';

export const getServerSideProps = async (ctx) => {
  const data = await fetcher(`https://freefeed.net/v2/timelines/home?offset=0`, ctx);

  const posts = formatPosts(data.posts);
  const comments = formatComments(data.comments);
  const users = formatUsers(data.users);

  return { props: {
    posts,
    comments,
    users
  }};
};

const IndexPage = props => {
  const { posts, comments, users } = props;

  if (!posts) {
    return <SignIn/>;
  }

  return (
    <main>
      <h1>Home</h1>

      {Object.keys(posts).map(postId => (
        <Post key={postId} postId={postId} post={posts[postId]} comments={comments} users={users}/>
      ))}
    </main>
  );
};

export default IndexPage;
