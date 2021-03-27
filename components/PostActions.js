import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { likeUnlikePost } from '../store/actions';

const PostActions = ({ postId }) => {
  const myId = useSelector(state => state.me.id);
  const canILike = useSelector(state => myId && (myId !== state.posts[postId].authorId));
  const haveILiked = useSelector(state => state.posts[postId].likerIds.includes(myId));

  const dispatch = useDispatch();
  const likePost = useCallback(() => dispatch(likeUnlikePost([postId, 'like'])), [postId]);
  const unlikePost = useCallback(() => dispatch(likeUnlikePost([postId, 'unlike'])), [postId]);

  if (!canILike) {
    return false;
  }

  return <>
    {' - '}
    {haveILiked ? (
      <a onClick={unlikePost}>Un-like</a>
    ) : (
      <a onClick={likePost}>Like</a>
    )}
  </>;
};

export default PostActions;
