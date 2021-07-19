import { useSelector, shallowEqual } from 'react-redux';

import { getIsomorphicDataPopulation } from '../store';
import { loadHomePage } from '../store/actions';
import SignIn from '../components/SignIn';
import DummyPost from '../components/DummyPost';
import Post from '../components/Post';
import PaginationLinks from '../components/PaginationLinks';

const IndexPage = () => {
  const myId = useSelector(state => state.me.id);
  const isLoadingPage = useSelector(state => state.isLoadingPage);
  const postIds = useSelector(state => Object.keys(state.posts), shallowEqual);

  if (!myId) {
    return <SignIn/>;
  }

  return (
    <main>
      <h1>Home</h1>

      <PaginationLinks pathname="/" hideOnFirst/>
      {isLoadingPage ? (<>
         <DummyPost/>
         <DummyPost/>
         <DummyPost/></>
      ) : (
        postIds.map(postId => (
          <Post id={postId} key={postId}/>
        ))
      )}
      <PaginationLinks pathname="/"/>
    </main>
  );
};

IndexPage.getInitialProps = getIsomorphicDataPopulation(loadHomePage);

export default IndexPage;
