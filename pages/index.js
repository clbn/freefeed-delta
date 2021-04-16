import { useSelector, shallowEqual } from 'react-redux';

import { getIsomorphicDataPopulation } from '../store';
import { loadHomePage } from '../store/actions';
import SignIn from '../components/SignIn';
import DummyPost from '../components/DummyPost';
import Post from '../components/Post';

const IndexPage = () => {
  const myId = useSelector(state => state.me.id);
  const isLoadingPage = useSelector(state => state.isLoadingPage);
  const postIds = useSelector(state => Object.keys(state.posts), shallowEqual);

  if (!myId) {
    return <SignIn/>;
  }

  if (isLoadingPage) {
    return (
      <main>
        <h1>Home</h1>
        <DummyPost/>
        <DummyPost/>
        <DummyPost/>
      </main>
    );
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

IndexPage.getInitialProps = getIsomorphicDataPopulation(loadHomePage);

export default IndexPage;
