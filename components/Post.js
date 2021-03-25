import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { loadMoreComments } from '../store/actions';
import { preventDefault } from '../utils/events';
import AttachmentImage from './AttachmentImage';
import PostLikes from './PostLikes';
import Comment from './Comment';
import Time from './Time';

const Post = ({ id }) => {
  const post = useSelector(state => state.posts[id]);
  const author = useSelector(state => state.users[post.authorId]);

  const dispatch = useDispatch();
  const loadMoreCommentsAction = preventDefault(useCallback(() => dispatch(loadMoreComments(id)), [id]));

  const authorUrl = `/${author.username}`;
  const postUrl = `/${author.username}/${id}`;

  return (
    <article>
      <section>
        <Link href={authorUrl}>
          <a>{author.displayName}</a>
        </Link>
      </section>

      <section>
        {post.body}
      </section>

      {post.attachmentIds.length > 0 && (
        <section className="attachments">
          {post.attachmentIds.map(attId => (
            <AttachmentImage id={attId} key={attId}/>
          ))}
        </section>
      )}

      <section>
        <Link href={postUrl}>
          <a><Time stamp={post.createdAt}/></a>
        </Link>
      </section>

      {post.likerIds.length > 0 && (
        <PostLikes postId={id}/>
      )}

      <ul className="comments">
        {post.commentIds.slice(0, 1).map(commentId => (
          <li key={commentId}>
            <Comment id={commentId} postUrl={postUrl}/>
          </li>
        ))}

        {post.omittedComments > 0 && (
          <li className="more-comments">
            <a href={postUrl} onClick={loadMoreCommentsAction}>
              {post.omittedComments} more comments
            </a>
          </li>
        )}

        {post.commentIds.slice(1).map(commentId => (
          <li key={commentId}>
            <Comment id={commentId} postUrl={postUrl}/>
          </li>
        ))}
      </ul>

      <style jsx>{`
        article {
          border-top: 1px solid #eee;
          padding-top: 1rem;
        }
        section {
          display: block;
          overflow-wrap: break-word;
          margin-bottom: 0.5rem;
        }
        .attachments {
          display: flex;
          padding: 0.15rem 0;
          margin-right: -0.5rem;
          margin-bottom: 0;
        }
        .comments {
          list-style: none;
          padding: 0;
          margin-top: 0;
        }
        .more-comments {
          font-style: italic;
          padding-left: 1.4rem;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </article>
  );
};

export default Post;
