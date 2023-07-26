import Link from 'next/link';

import { useSelector } from '../store';
import { pluralForm } from '../utils/plural';

const PostBacklinks = ({ postId }) => {
  const backlinksCount = useSelector(state => state.posts[postId].backlinksCount);
  if (backlinksCount === 0) {
    return null;
  }
  return <PostBacklinksNotEmpty postId={postId} backlinksCount={backlinksCount}/>
};

const PostBacklinksNotEmpty = ({ postId, backlinksCount }) => {
  return (
    <section>
      ↪
      {' '}
      <Link href={`/search?q=${encodeURIComponent(postId)}`}>
        <a>{pluralForm(backlinksCount, 'reference')}</a>
      </Link>
      {' '}
      to this post

      <style jsx>{`
        section {
          grid-area: backlinks;

          display: block;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </section>
  );
};

export default PostBacklinks;
