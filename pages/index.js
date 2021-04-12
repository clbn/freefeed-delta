import { useSelector, shallowEqual } from 'react-redux';

import { initServerStore } from '../store';
import { loadHomePage } from '../store/actions';
import Post from '../components/Post';
import SignIn from '../components/SignIn';

export const getServerSideProps = async ctx => {
  const store = initServerStore();

  await store.dispatch(loadHomePage(ctx));

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
