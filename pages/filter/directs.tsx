import { shallowEqual } from 'react-redux';

import { useSelector, getIsomorphicDataPopulation } from '../../store';
import { loadDirectsPage } from '../../store/actions';
import DummyPost from '../../components/DummyPost';
import Post from '../../components/Post';
import PaginationLinks from '../../components/PaginationLinks';
import SignIn from '../../components/SignIn';

const DirectsPage = () => {
  const myId = useSelector(state => state.me.id);
  const isLoadingPage = useSelector(state => state.isLoadingPage);
  const postIds = useSelector(state => state.postIds, shallowEqual);

  if (!myId) {
    return <SignIn/>;
  }

  return (
    <main>
      <h1>Direct messages</h1>

      <PaginationLinks pathname="/filter/directs" hideOnFirst/>

      {isLoadingPage ? <>
        <DummyPost/>
        <DummyPost/>
        <DummyPost/>
      </> : (
        postIds.map(postId => (
          <Post id={postId} key={postId}/>
        ))
      )}

      <PaginationLinks pathname="/filter/directs"/>
    </main>
  );
};

DirectsPage.getInitialProps = getIsomorphicDataPopulation(loadDirectsPage);

export default DirectsPage;
