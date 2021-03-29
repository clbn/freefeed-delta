import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { likeUnlikePost, toggleCommentingPost } from '../store/actions';
import { selectCanIModeratePost } from '../utils/data-selectors';
import Throbber from './Throbber';

const PostActions = ({ postId }) => {
  const myId = useSelector(state => state.me.id);

  const areCommentsDisabled = useSelector(state => state.posts[postId].areCommentsDisabled);
  const canICommentAnyway = useSelector(selectCanIModeratePost(postId));

  const canILike = useSelector(state => myId && (myId !== state.posts[postId].authorId));
  const haveILiked = useSelector(state => state.posts[postId].likerIds.includes(myId));
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

  return <>
    {commentLink}
    {likeLink}
    {isSendingLike && <Throbber/>}
  </>
};

export default PostActions;
