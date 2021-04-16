import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { getIsomorphicDataPopulation } from '../../store';
import { loadPostPage } from '../../store/actions';
import DummyPost from '../../components/DummyPost';
import Post from '../../components/Post';

const PostPage = () => {
  const { query: { post: postId } } = useRouter();
  const isLoadingPage = useSelector(state => state.isLoadingPage);

  return (
    <main>
      {isLoadingPage ? <DummyPost/> : <Post id={postId}/>}
    </main>
  );
};

PostPage.getInitialProps = getIsomorphicDataPopulation(loadPostPage);

export default PostPage;
