import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { likeUnlikePost, toggleCommentingPost } from '../store/actions';
import { selectCanIModeratePost } from '../utils/data-selectors';
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
  const toggleCommenting = useCallback(() => dispatch(toggleCommentingPost(postId)), [postId]);
  const likePost = useCallback(() => dispatch(likeUnlikePost({ postId, verb: 'like' })), [postId]);
  const unlikePost = useCallback(() => dispatch(likeUnlikePost({ postId, verb: 'unlike' })), [postId]);

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

  const likeLink = canILike && (
    haveILiked ? <>
      {' - '}<a onClick={unlikePost}>Un-like</a>
    </> : <>
      {' - '}<a onClick={likePost}>Like</a>
    </>
  );

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
          margin-bottom: 0.5rem;
        }
        .timestamp {
          margin-left: 0.4rem;
        }
      `}</style>
    </section>
  );
};

export default PostActions;
