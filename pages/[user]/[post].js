import { useRouter } from 'next/router';
import fetcher from '../../utils/fetcher';
import { formatAttachments, formatComments, formatPost, formatUsers } from '../../utils/data-formatters';
import Post from '../../components/Post';

export const getServerSideProps = async (ctx) => {
  const { post: postId } = ctx.query;

  const data = await fetcher(`https://freefeed.net/v2/posts/${postId}?maxComments=all`, ctx);

  const post = formatPost(data.posts);
  const attachments = formatAttachments(data.attachments);
  const comments = formatComments(data.comments);
  const users = formatUsers(data.users);

  return { props: {
    post,
    attachments,
    comments,
    users
  }};
};

const PostPage = props => {
  const { query: { user: username, post: postId } } = useRouter();
  const { post, attachments, comments, users } = props;

  return (
    <main>
      <h1>{username} / {postId}</h1>

      {post && (
        <Post postId={postId} post={post} attachments={attachments} comments={comments} users={users}/>
      )}
    </main>
  );
};

export default PostPage;
