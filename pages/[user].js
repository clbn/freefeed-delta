import { useSelector, shallowEqual } from 'react-redux';
import { useRouter } from 'next/router';

import { initServerStore } from '../store';
import { loadUserPage, loadWhoami } from '../store/actions';
import PieceOfText from '../components/PieceOfText';
import Post from '../components/Post';

export const getServerSideProps = async ctx => {
  const store = initServerStore();

  await Promise.all([
    store.dispatch(loadUserPage(ctx)),
    store.dispatch(loadWhoami(ctx)),
  ]);

  return { props: {
    preloadedState: store.getState(),
  }};
};

const UserPage = () => {
  const { query: { user: username } } = useRouter();
  const user = useSelector(state => Object.values(state.users).find(u => u.username === username));
  const postIds = useSelector(state => Object.keys(state.posts), shallowEqual);

  if (!user) {
    return (
      <main>
        <h1>{username}</h1>
        <p>User not found</p>
      </main>
    );
  }

  return (
    <main>
      <h1>{user.displayName}</h1>
      <p>
        @{username}

        {user.isGone ? (
          ' (deleted account)'
        ) : user.isPrivate ? (
          ' (private feed, you need to be a subscriber)'
        ) : user.isProtected ? (
          ' (protected feed, you need to sign in)'
        ) : false}
      </p>

      {user.description && <><PieceOfText isExpanded>{user.description}</PieceOfText><br/><br/></>}

      {postIds.map(postId => (
        <Post id={postId} key={postId}/>
      ))}
    </main>
  );
};

export default UserPage;
