import { useSelector, shallowEqual } from 'react-redux';
import { useRouter } from 'next/router';

import fetcher from '../utils/fetcher';
import { initServerStore } from '../store';
import { loadUserPage } from '../store/actions';
import Post from '../components/Post';

export const getServerSideProps = async ctx => {
  const { user: username } = ctx.query;
  const data = await fetcher(`https://freefeed.net/v2/timelines/${username}?offset=0`, ctx);

  const store = initServerStore();
  store.dispatch(loadUserPage({ username, data }));

  return { props: {
    preloadedState: store.getState(),
  }};
};

const UserPage = () => {
  const { query: { user: username } } = useRouter();
  const user = useSelector(state => Object.values(state.users).find(u => u.username === username));
  const postIds = useSelector(state => Object.keys(state.posts), shallowEqual);

  return (
    <main>
      <h1>{username}</h1>

      {user && <>
        <p>Display name: {user.displayName}</p>
        <p>Description: {user.description}</p>

        {postIds.map(postId => (
          <Post id={postId} key={postId}/>
        ))}
      </>}
    </main>
  );
};

export default UserPage;
