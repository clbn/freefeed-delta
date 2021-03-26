import { useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Link from 'next/link';

import { loadMoreLikes } from '../store/actions';
import { preventDefault } from '../utils/events';

const PostLikes = ({ postId, postUrl }) => {
  const likerIds = useSelector(state => state.posts[postId].likerIds);
  const omittedLikes = useSelector(state => state.posts[postId].omittedLikes);
  const listedUsers = useSelector(state => likerIds.map(id => state.users[id]), shallowEqual);

  const dispatch = useDispatch();
  const loadMoreLikesAction = useCallback(preventDefault(() => dispatch(loadMoreLikes(postId))), [postId]);

  const users = [...listedUsers];

  if (omittedLikes) {
    users.push({ username: 'more-likes' });
  }

  return (
    <section className="likes">
      💛

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
      </ul>

      <style jsx>{`
        .likes {
          display: block;
          text-indent: -1.4rem;
          margin-left: 1.4rem;
          margin-bottom: 0.5rem;
        }
        ul {
          display: inline;
          padding-left: 0.4rem;
          text-indent: 0;
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
