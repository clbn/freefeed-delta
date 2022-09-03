import { useCallback } from 'react';
import Link from 'next/link';

import { useSelector, useDispatch } from '../store';
import { likeUnlikePost, toggleCommentingPost } from '../store/actions';
import { selectCanIModeratePost } from '../utils/data-selectors';
import { preventDefault } from '../utils/events';
import PostVisibilityIcon from './PostVisibilityIcon';
import Time from './Time';
import Throbber from './Throbber';

const PostActions = ({ postId, postUrl }) => {
  const createdAt = useSelector(state => state.posts[postId].createdAt);

  const areCommentsDisabled = useSelector(state => state.posts[postId].areCommentsDisabled);
  const canICommentAnyway = useSelector(selectCanIModeratePost(postId));

  const canILike = useSelector(state => state.me.id && (state.me.id !== state.posts[postId].authorId));
  const haveILiked = useSelector(state => state.posts[postId].likerIds.includes(state.me.id));
  const isSendingLike = useSelector(state => state.posts[postId].isSendingLike);

  const dispatch = useDispatch();
  const toggleCommenting = useCallback(() => dispatch(toggleCommentingPost(postId)), [dispatch, postId]);
  const likePost = useCallback(preventDefault(() => dispatch(likeUnlikePost({ postId, verb: 'like' }))), [postId]);
  const unlikePost = useCallback(preventDefault(() => dispatch(likeUnlikePost({ postId, verb: 'unlike' }))), [postId]);

  const commentLink = <>
    {areCommentsDisabled && canICommentAnyway && <>
      {' - '}<i>Comments disabled (not for you)</i>
    </>}
    {areCommentsDisabled && !canICommentAnyway && <>
      {' - '}<i>Comments disabled</i>
    </>}
    {(!areCommentsDisabled || canICommentAnyway) && <>
      {' - '}<a onClick={toggleCommenting}>Comment</a>
    </>}
  </>;

  const likeLink = canILike && <>
    {' - '}
    <form onSubmit={haveILiked ? unlikePost : likePost} action="/api/likePost" method="POST">
      <input type="hidden" name="postId" value={postId}/>
      <input type="hidden" name="verb" value={haveILiked ? 'unlike' : 'like'}/>
      <input type="hidden" name="returnUrl" value={postUrl}/>
      <button type="submit">{haveILiked ? 'Un-like' : 'Like'}</button>
    </form>
  </>;

  return (
    <section className="actions">
      <PostVisibilityIcon postId={postId}/>

      <Link href={postUrl}>
        <a className="timestamp"><Time stamp={createdAt}/></a>
      </Link>

      {commentLink}
      {likeLink}
      {isSendingLike && <Throbber/>}

      <style jsx>{`
        section {
          grid-area: actions;

          display: block;
          color: #666;
          margin-bottom: 0.5rem;
        }
        .timestamp {
          margin-left: 0.35rem;
        }
        section :global(form) {
          display: inline;
          border: none;
          box-shadow: none;
          padding: 0;
          margin: 0;
        }
        section :global(button) {
          display: inline;
          cursor: pointer;
          color: var(--color-secondary);
          background-color: inherit;
          border: none;
          font-size: inherit;
          font-family: inherit;
          font-weight: inherit;
          padding: 0;
          margin: 0;
        }
        section :global(button:hover) {
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
};

export default PostActions;
