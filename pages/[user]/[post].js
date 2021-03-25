import { useRouter } from 'next/router';

import fetcher from '../../utils/fetcher';
import { initServerStore } from '../../store';
import { loadPostPage } from '../../store/actions';
import Post from '../../components/Post';

export const getServerSideProps = async ctx => {
  const { post: postId, likes: maxLikes } = ctx.query;
  const data = await fetcher(`https://freefeed.net/v2/posts/${postId}?maxComments=all&maxLikes=${maxLikes}`, ctx);

  const store = initServerStore();
  store.dispatch(loadPostPage({ postId, data }));

  return { props: {
    preloadedState: store.getState(),
  }};
};

const PostPage = () => {
  const { query: { user: username, post: postId } } = useRouter();

  return (
    <main>
      <h1>{username} / {postId}</h1>
      <Post id={postId}/>
    </main>
  );
};

export default PostPage;
