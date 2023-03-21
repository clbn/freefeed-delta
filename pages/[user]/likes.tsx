import { shallowEqual } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useSelector, getIsomorphicDataPopulation } from '../../store';
import { loadUserLikesPage } from '../../store/actions';
import Userpic from '../../components/Userpic';
import UserFeedStatus from '../../components/UserFeedStatus';
import DummyPost from '../../components/DummyPost';
import PieceOfText from '../../components/PieceOfText';
import Post from '../../components/Post';
import PaginationLinks from '../../components/PaginationLinks';

const LikedPostsPage = () => {
  const { query: { user: username } } = useRouter();
  const isLoadingPage = useSelector(state => state.isLoadingPage);
  const user = useSelector(state => Object.values(state.users).find(u => u.username === username));
  const postIds = useSelector(state => state.postIds, shallowEqual);

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
      <div className="info">
        <section className="userpic">
          <Link href={`/${username}`}>
            <a><Userpic id={user.id} size={75}/></a>
          </Link>
        </section>
        <section className="user-data">
          <h1>{user.displayName}</h1>
          <div className="username">
            @{username}
          </div>
          <div className="user-description">{user.description && <><PieceOfText isExpanded>{user.description}</PieceOfText></>}</div>
        </section>
      </div>

      {user.statistics && (
        <p className="statistics">
          <a className="disabled">{user.statistics.subscribers} subscribers</a>{' '}

          {user.type === 'user' && <>
            <a className="disabled">{user.statistics.subscriptions} subscriptions</a>
            {' '}
            <Link href={`/${username}`}>
              <a>{user.statistics.posts} posts</a>
            </Link>
            {' '}
            <Link href={`/${username}/comments`}>
              <a>{user.statistics.comments} comments</a>
            </Link>
            {' '}
            <Link href={`/${username}/likes`}>
              <a>{user.statistics.likes} likes</a>
            </Link>
          </>}
        </p>
      )}

      <p className="statuses">
        <UserFeedStatus {...user}/>
      </p>

      <h2>
          Likes
      </h2>

      <PaginationLinks pathname={`/${username}/likes`} hideOnFirst/>

      {postIds.map(postId => (
        <Post id={postId} key={postId}/>
      ))}

      <PaginationLinks pathname={`/${username}/likes`}/>

      <style jsx>{`
        .info {
          display: inline-flex;
          flex-flow: row nowrap; 
          border-top: 1px solid #eee;
          padding: 0.9rem 0 1.1rem 0;
          margin: 0;
          width: 100%;
        }
        .userpic {
          padding-top: 0.2rem;
        }
        .user-data {
          flex-direction: column;
          margin: 0;
          padding: 0;
        }
        h1 {
         margin: 0;
         padding-top: 0.2rem;
         line-height: 1.5rem;
        }
        .username {
          color: #999;
          padding-top: 0.5rem;
        }
        .user-description {
          padding: 0.9rem 0 0 0;
        }
        .statistics, .statuses {
          border-top: 1px solid #eee;
          line-height: 2.1rem;
          padding: 0.8rem 0;
          margin: 0;
        }
        h2 {
          border-top: 1px solid #eee;
          padding: 0.8rem 0;
          margin: 0;
        }
        a {
          white-space: nowrap;
          margin-right: 1rem;
        }
        a.disabled {
          cursor: inherit;
          color: inherit;
          text-decoration: inherit;
        }
      `}</style>
    </main>
  );
};

LikedPostsPage.getInitialProps = getIsomorphicDataPopulation(loadUserLikesPage);

export default LikedPostsPage;
