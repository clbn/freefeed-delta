import { useRouter } from 'next/router';
import fetcher from '../../utils/fetcher';

export const getServerSideProps = async (ctx) => {
  const { post: postId } = ctx.query;

  const data = await fetcher(`https://freefeed.net/v2/posts/${postId}?maxComments=all`, ctx);

  return { props: {
    post: data.posts || {}
  }};
};

const Post = props => {
  const { query } = useRouter();

  return <>
    <h1>{query.user} / {query.post}</h1>
    <p>Author: {props.post?.createdBy}</p>
    <p>Body: {props.post?.body}</p>
  </>;
};

export default Post;
