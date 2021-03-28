import { useSelector } from 'react-redux';
import Link from 'next/link';

import PostAttachments from './PostAttachments';
import PostActions from './PostActions';
import PostLikes from './PostLikes';
import PostComments from './PostComments';
import Time from './Time';
import CommentAddForm from './CommentAddForm';

const Post = ({ id }) => {
  const isPostMissing = useSelector(state => state.posts[id] === undefined);
  const errorMessage = useSelector(state => state.posts[id]?.errorMessage);
  if (isPostMissing) {
    return false;
  }
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }
  return <PostNotEmpty id={id}/>;
};

const PostNotEmpty = ({ id }) => {
  const authorId = useSelector(state => state.posts[id].authorId);
  const body = useSelector(state => state.posts[id].body);
  const createdAt = useSelector(state => state.posts[id].createdAt);

  const authorUsername = useSelector(state => state.users[authorId].username);
  const authorDisplayName = useSelector(state => state.users[authorId].displayName);

  const authorUrl = `/${authorUsername}`;
  const postUrl = `/${authorUsername}/${id}`;

  return (
    <article>
      <section>
        <Link href={authorUrl}>
          <a>{authorDisplayName}</a>
        </Link>
      </section>

      <section>
        {body}
      </section>

      <PostAttachments postId={id}/>

      <section>
        <Link href={postUrl}>
          <a><Time stamp={createdAt}/></a>
        </Link>
        <PostActions postId={id}/>
      </section>

      <PostLikes postId={id} postUrl={postUrl}/>

      <PostComments postId={id} postUrl={postUrl}/>

      <CommentAddForm postId={id}/>

      <style jsx>{`
        article {
          border-top: 1px solid #eee;
          padding-top: 1rem;
          padding-bottom: 0.5rem;
        }
        section {
          display: block;
          overflow-wrap: break-word;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </article>
  );
};

export default Post;
