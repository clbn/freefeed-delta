import { useSelector, shallowEqual } from 'react-redux';

import { initServerStore } from '../store';
import { loadHomePage, loadWhoami } from '../store/actions';
import Post from '../components/Post';
import SignIn from '../components/SignIn';

export const getServerSideProps = async ctx => {
  const store = initServerStore();

  await Promise.all([
    store.dispatch(loadHomePage(ctx)),
    store.dispatch(loadWhoami(ctx)),
  ]);

  return { props: {
    preloadedState: store.getState(),
  }};
};

const IndexPage = () => {
  const myId = useSelector(state => state.me.id);
  const postIds = useSelector(state => Object.keys(state.posts), shallowEqual);

  if (!myId) {
    return <SignIn/>;
  }

  return (
    <main>
      <h1>Home</h1>

      {postIds.map(postId => (
        <Post id={postId} key={postId}/>
      ))}
    </main>
  );
};

export default IndexPage;
