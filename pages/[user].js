import { useSelector, shallowEqual } from 'react-redux';
import { useRouter } from 'next/router';

import { getIsomorphicDataPopulation } from '../store';
import { loadUserPage } from '../store/actions';
import UserFeedStatus from '../components/User-feed-status';
import DummyPost from '../components/DummyPost';
import PieceOfText from '../components/PieceOfText';
import Post from '../components/Post';

const UserPage = () => {
  const { query: { user: username } } = useRouter();
  const isLoadingPage = useSelector(state => state.isLoadingPage);
  const user = useSelector(state => Object.values(state.users).find(u => u.username === username));
  const postIds = useSelector(state => Object.keys(state.posts), shallowEqual);

  if (isLoadingPage) {
    return (
      <main>
        <h1>{user?.displayName || username}</h1>
        <DummyPost/>
        <DummyPost/>
        <DummyPost/>
      </main>
    );
  }

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

      {user.statistics && (
        <p className="statistics">
          <a>{user.statistics.subscribers} subscribers</a>{' '}

          {user.type === 'user' && <>
            <a>{user.statistics.subscriptions} subscriptions</a>{' '}
            <a>{user.statistics.posts} posts</a>{' '}
            <a>{user.statistics.comments} comments</a>{' '}
            <a>{user.statistics.likes} likes</a>{' '}
          </>}
        </p>
      )}

      <p>
        <UserFeedStatus isGone={user.isGone}
                        isPrivate={user.isPrivate}
                        isProtected={user.isProtected}
                        isRestricted={user.isRestricted}
                        type={user.type}/>
      </p>

      {postIds.map(postId => (
        <Post id={postId} key={postId}/>
      ))}

      <style jsx>{`
        .statistics {
          border-top: 1px solid #eee;
          line-height: 2.1rem;
          padding: 0.8rem 0;
          margin: 0;
        }
        a {
          cursor: inherit;
          color: inherit;
          text-decoration: inherit;

          white-space: nowrap;
          margin-right: 1rem;
        }
      `}</style>
    </main>
  );
};

UserPage.getInitialProps = getIsomorphicDataPopulation(loadUserPage);

export default UserPage;
