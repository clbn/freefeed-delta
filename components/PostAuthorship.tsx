import { Fragment } from 'react';
import { shallowEqual } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useSelector } from '../store';
import { selectPostRecipients } from '../utils/data-selectors';

const getRecipientDisplayName = function(recipient, authorId) {
  if (recipient.id !== authorId) {
    return recipient.displayName;
  }
  if (recipient.username[recipient.username.length - 1] === 's') {
    return recipient.username + "' feed";
  } else {
    return recipient.username + "'s feed";
  }
};

const PostAuthorship = ({ postId }) => {
  const { route } = useRouter();
  const isInUserPostFeed = (route === '/[user]');
  const isIndividualPost = (route === '/[user]/[post]');

  const authorId = useSelector(state => state.posts[postId].authorId);
  let recipients = useSelector(selectPostRecipients(postId), shallowEqual);

  const authorUsername = useSelector(state => state.users[authorId].username);
  const authorDisplayName = useSelector(state => state.users[authorId].displayName);

  // Check if the post has been only submitted to one recipient
  // and if we can omit it
  if (recipients.length === 1) {
    if (isInUserPostFeed) {
      // If the post is in user/group feed (one-source list), we should omit
      // the only recipient, since it would be that feed.
      recipients = [];
    } else if (recipients[0].id === authorId) {
      // When in a many-sources list (Home, Direct messages, My discussions),
      // we should omit the only recipient if it's the author's feed.
      recipients = [];
    }
  }

  return (
    <section>
      <Link href={`/${authorUsername}`}>
        <a className="author">{authorDisplayName}</a>
      </Link>

      {recipients.length > 0 && ' to '}

      {recipients.map((recipient, index) => (
        <Fragment key={recipient.id}>
          <Link href={`/${recipient.username}`}>
            <a className="recipient">{getRecipientDisplayName(recipient, authorId)}</a>
          </Link>
          {index < recipients.length - 2 ? ', ' : false}
          {index === recipients.length - 2 ? ' and ' : false}
        </Fragment>
      ))}

      <style jsx>{`
        section {
          grid-area: authorship;

          display: block;
          color: #666;
          font-size: ${isIndividualPost ? 1.125 : 1}rem;
          overflow-wrap: break-word;
          margin-bottom: 0.2rem;
        }
        .author {
          font-weight: 700; /* bold */
        }
        .recipient {
          font-weight: 500; /* medium */
        }
      `}</style>
    </section>
  );
};

export default PostAuthorship;
