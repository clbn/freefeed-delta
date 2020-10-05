import { useRouter } from 'next/router';
import fetcher from '../utils/fetcher';
import { formatPosts, formatComments, formatUser, formatUsers } from '../utils/data-formatters';
import Post from '../components/Post';

export const getServerSideProps = async (ctx) => {
  const { user: username } = ctx.query;

  const [data1, data2] = await Promise.all([
    fetcher(`https://freefeed.net/v1/users/${username}`, ctx),
    fetcher(`https://freefeed.net/v2/timelines/${username}?offset=0`, ctx)
  ]);

  const user = formatUser(data1.users, true);
  const posts = formatPosts(data2.posts);
  const comments = formatComments(data2.comments);
  const users = formatUsers(data2.users);

  return { props: {
    user,
    posts,
    comments,
    users
  }};
};

const UserPage = props => {
  const { query: { user: username } } = useRouter();
  const { user, posts, comments, users } = props;

  return (
    <main>
      <h1>{username}</h1>

      {user && <>
        <p>Display name: {user.displayName}</p>
        <p>Description: {user.description}</p>

        {Object.keys(posts).map(postId => (
          <Post key={postId} postId={postId} post={posts[postId]} comments={comments} users={users}/>
        ))}
      </>}
    </main>
  );
};

export default UserPage;
