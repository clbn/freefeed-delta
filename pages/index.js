import { useSelector, shallowEqual } from 'react-redux';

import fetcher from '../utils/fetcher';
import { initServerStore } from '../store';
import { loadHomePage } from '../store/actions';
import Post from '../components/Post';
import SignIn from '../components/SignIn';

export const getServerSideProps = async (ctx) => {
  const data = await fetcher(`https://freefeed.net/v2/timelines/home?offset=0`, ctx);

  const store = initServerStore();
  store.dispatch(loadHomePage({ data }));

  return { props: {
    preloadedState: store.getState(),
  }};
};

const IndexPage = () => {
  const postIds = useSelector(state => Object.keys(state.posts), shallowEqual);

  if (!postIds) {
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
