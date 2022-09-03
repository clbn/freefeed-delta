import { useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import Link from 'next/link';

import { useSelector, useDispatch } from '../store';
import { loadMoreLikes } from '../store/actions';
import { preventDefault } from '../utils/events';
import Throbber from './Throbber';
import Icon from './Icon';

const PostLikes = ({ postId, postUrl }) => {
  const likerIds = useSelector(state => state.posts[postId].likerIds);
  if (likerIds.length === 0) {
    return false;
  }
  return <PostLikesNotEmpty postId={postId} postUrl={postUrl} likerIds={likerIds}/>
};

const PostLikesNotEmpty = ({ postId, postUrl, likerIds }) => {
  const haveILiked = useSelector(state => state.posts[postId].likerIds.includes(state.me.id));
  const omittedLikes = useSelector(state => state.posts[postId].omittedLikes);
  const isLoadingMoreLikes = useSelector(state => state.posts[postId].isLoadingMoreLikes);
  const listedUsers = useSelector(state => likerIds.map(id => state.users[id]), shallowEqual);

  const dispatch = useDispatch();
  const loadMoreLikesAction = useCallback(preventDefault(() => dispatch(loadMoreLikes(postId))), [postId]);

  const users = [...listedUsers];

  if (omittedLikes) {
    users.push({ username: 'more-likes' });
  }

  return (
    <section>
      <div className="icon">
        <Icon name="heart" className={haveILiked ? 'liked' : ''}/>
      </div>

      <ul>
        {users.map((user, i) => (
          <li key={user.username}>
            {user.username !== 'more-likes' ? (
              <Link href={`/${user.username}`}>
                <a>{user.displayName}</a>
              </Link>
            ) : (
              <a href={`${postUrl}?likes=all`} onClick={loadMoreLikesAction}>
                {omittedLikes} other people
              </a>
            )}

            {i < users.length - 2 ? (
              ', '
            ) : i === users.length - 2 ? (
              ' and '
            ) : (
              ' liked this'
            )}
          </li>
        ))}

        {isLoadingMoreLikes && <Throbber/>}
      </ul>

      <style jsx>{`
        section {
          grid-area: likes;

          display: flex;
          flex-wrap: nowrap; /* forcing children to be in a single line */
          align-items: flex-start; /* vertical alignment */
          justify-content: flex-start; /* horizontal alignment */
          margin-bottom: 0.5rem;
        }
        .icon {
          flex: 0 0 1.35rem; /* don't grow, don't shrink, stay at 1.35rem */
        }
        .icon :global(.icon-heart) {
          color: var(--color-icon-heart-primary);
          fill: var(--color-icon-heart-secondary);
        }
        .icon :global(.icon-heart.liked) {
          fill: var(--color-icon-heart-primary);
        }
        ul {
          flex: 1; /* grow */
          text-indent: 0;
          padding: 0;
          margin: 0;
        }
        li {
          display: inline;
          list-style: none;
        }
      `}</style>
    </section>
  );
};

export default PostLikes;
