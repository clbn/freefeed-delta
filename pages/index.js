import { useSelector, shallowEqual } from 'react-redux';

import { getIsomorphicDataPopulation } from '../store';
import { loadHomePage } from '../store/actions';
import Post from '../components/Post';
import SignIn from '../components/SignIn';

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
        <p>Loading...</p>
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
