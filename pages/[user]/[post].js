import { useRouter } from 'next/router';

import { initServerStore } from '../../store';
import { loadPostPage } from '../../store/actions';
import Post from '../../components/Post';

export const getServerSideProps = async ctx => {
  const store = initServerStore();

  await store.dispatch(loadPostPage(ctx));

  return { props: {
    preloadedState: store.getState(),
  }};
};

const PostPage = () => {
  const { query: { post: postId } } = useRouter();

  return (
    <main>
      <Post id={postId}/>
    </main>
  );
};

export default PostPage;
