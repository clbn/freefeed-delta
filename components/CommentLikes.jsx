import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { likeUnlikeComment } from '../store/actions';
import Icon from './Icon';
import Throbber from './Throbber';

const CommentLikes = ({ commentId }) => {
  const likes = useSelector(state => state.comments[commentId].likes || 0);
  const canILike = useSelector(state => state.me.id && (state.me.id !== state.comments[commentId].authorId));
  const haveILiked = useSelector(state => state.comments[commentId].haveILiked);
  const isSendingLike = useSelector(state => state.comments[commentId].isSendingLike);

  const dispatch = useDispatch();
  const toggleLike = useCallback(() => {
    if (!canILike) return;
    if (isSendingLike) return;
    return dispatch(likeUnlikeComment({ commentId, verb: haveILiked ? 'unlike' : 'like' }));
  }, [canILike, isSendingLike, dispatch, commentId, haveILiked]);

  return (
    <section>
      {' -'}

      <span className="trigger" onDoubleClick={toggleLike} title="Comment likes">
        <Icon name="heart" className={likes === 0 ? 'zero' : haveILiked ? 'liked' : ''}/>

        {likes > 0 && (
          <span className="number">{likes}</span>
        )}
      </span>

      {isSendingLike && <Throbber/>}

      <style jsx>{`
        section {
          display: inline;
          white-space: nowrap;
          color: #ccc;
         }

        .trigger {
          cursor: pointer;
          border-radius: 0.125rem; /* 2px */
          padding: 0 0.25rem 0.0625rem 0.25rem; /* 0 4px 1px 4px */

          user-select: none;
          outline: none;
        }

        .trigger :global(.icon-heart) {
          vertical-align: text-top;
          margin-top: 0.0625rem; /* 1px */

          font-size: 0.85rem;
          opacity: 0.8;
          color: var(--color-icon-heart-primary);
          fill: var(--color-icon-heart-secondary);
        }
        .trigger :global(.icon-heart.zero) {
          color: #dcdcdc;
          fill: #fff;
        }
        .trigger :global(.icon-heart.liked) {
          fill: var(--color-icon-heart-primary);
        }

        .number {
          display: inline-block;
          vertical-align: text-top;
          margin-top: 0.09375rem; /* 1.5px, is this crazy */

          font-size: 0.7rem;
          color: #bbb;
          margin-left: 0.25em;
        }
      `}</style>
    </section>
  );
}

export default CommentLikes;
