import Link from 'next/link';

const PostLikes = ({ likerIds, omittedLikes, users }) => {
  const likes = [...likerIds];

  if (omittedLikes) {
    likes.push('more-likes');
  }

  return (
    <section className="likes">
      💛

      <ul>
        {likes.map((likerId, i) => (
          <li key={likerId}>
            {likerId !== 'more-likes' ? (
              <Link href={`/${users[likerId].username}`}>
                <a>{users[likerId].displayName}</a>
              </Link>
            ) : (
              <b>{omittedLikes} other people</b>
            )}

            {i < likes.length - 2 ? (
              ', '
            ) : i === likes.length - 2 ? (
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
