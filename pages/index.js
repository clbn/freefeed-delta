import fetcher from '../utils/fetcher';
import { formatAttachments, formatComments, formatPosts, formatUsers } from '../utils/data-formatters';
import Post from '../components/Post';
import SignIn from '../components/SignIn';

export const getServerSideProps = async (ctx) => {
  const data = await fetcher(`https://freefeed.net/v2/timelines/home?offset=0`, ctx);

  const posts = formatPosts(data.posts);
  const attachments = formatAttachments(data.attachments);
  const comments = formatComments(data.comments);
  const users = formatUsers(data.users);

  return { props: {
    posts,
    attachments,
    comments,
    users
  }};
};

const IndexPage = props => {
  const { posts, attachments, comments, users } = props;

  if (!posts) {
    return <SignIn/>;
  }

  return (
    <main>
      <h1>Home</h1>

      {Object.keys(posts).map(postId => (
        <Post key={postId} postId={postId} post={posts[postId]} attachments={attachments} comments={comments} users={users}/>
      ))}
    </main>
  );
};

export default IndexPage;
