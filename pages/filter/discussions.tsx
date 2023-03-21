import { shallowEqual } from 'react-redux';

import { useSelector, getIsomorphicDataPopulation } from '../../store';
import { loadDiscussionsPage } from '../../store/actions';
import DummyPost from '../../components/DummyPost';
import Post from '../../components/Post';
import PaginationLinks from '../../components/PaginationLinks';
import SignIn from '../../components/SignIn';

const DiscussionsPage = () => {
  const myId = useSelector(state => state.me.id);
  const isLoadingPage = useSelector(state => state.isLoadingPage);
  const postIds = useSelector(state => state.postIds, shallowEqual);

  if (!myId) {
    return <SignIn/>;
  }

  return (
    <main>
      <h1>My discussions</h1>

      <PaginationLinks pathname="/filter/discussions" hideOnFirst/>

      {isLoadingPage ? <>
        <DummyPost/>
        <DummyPost/>
        <DummyPost/>
      </> : (
        postIds.map(postId => (
          <Post id={postId} key={postId}/>
        ))
      )}

      <PaginationLinks pathname="/filter/discussions"/>
    </main>
  );
};

DiscussionsPage.getInitialProps = getIsomorphicDataPopulation(loadDiscussionsPage);

export default DiscussionsPage;
