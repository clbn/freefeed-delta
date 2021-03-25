import { useSelector, shallowEqual } from 'react-redux';
import Link from 'next/link';

const PostLikes = ({ postId }) => {
  const likerIds = useSelector(state => state.posts[postId].likerIds);
  const omittedLikes = useSelector(state => state.posts[postId].omittedLikes);
  const listedUsers = useSelector(state => likerIds.map(id => state.users[id]), shallowEqual);

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
              <b>{omittedLikes} other people</b>
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
