import { useRouter } from 'next/router';
import fetcher from '../utils/fetcher';
import { formatPosts, formatComments, formatUsers } from '../utils/data-formatters';
import Post from '../components/Post';

export const getServerSideProps = async (ctx) => {
  const { user: username } = ctx.query;

  const [data1, data2] = await Promise.all([
    fetcher(`https://freefeed.net/v1/users/${username}`, ctx),
    fetcher(`https://freefeed.net/v2/timelines/${username}?offset=0`, ctx)
  ]);

  const posts = formatPosts(data2.posts);
  const comments = formatComments(data2.comments);
  const users = formatUsers(data2.users);

  return { props: {
    user: data1.users || {},
    posts,
    comments,
    users
  }};
};

const UserPage = props => {
  const { query: { user: username } } = useRouter();
  const { user, posts, comments, users } = props;

  return <>
    <h1>{username}</h1>
    <p>User: {user.screenName}</p>
    <p>Description: {user.description}</p>
    <ul>
      {Object.keys(posts).map(postId => (
        <li key={postId}>
          <Post postId={postId} post={posts[postId]} comments={comments} users={users}/>
        </li>
      ))}
    </ul>
  </>;
};

export default UserPage;
