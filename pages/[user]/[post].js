import { useRouter } from 'next/router';

import { initServerStore } from '../../store';
import { loadPostPage, loadWhoami } from '../../store/actions';
import Post from '../../components/Post';

export const getServerSideProps = async ctx => {
  const store = initServerStore();

  await Promise.all([
    store.dispatch(loadPostPage(ctx)),
    store.dispatch(loadWhoami(ctx)),
  ]);

  return { props: {
    preloadedState: store.getState(),
  }};
};

const PostPage = () => {
  const { query: { user: username, post: postId } } = useRouter();

  return (
    <main>
      <Post id={postId}/>
    </main>
  );
};

export default PostPage;
