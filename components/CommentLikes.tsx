import { useCallback, useState } from 'react';
import { shallowEqual } from 'react-redux';
import Link from 'next/link';

import { useSelector, useDispatch } from '../store';
import { loadCommentLikes, likeUnlikeComment } from '../store/actions';
import Icon from './Icon';
import Throbber from './Throbber';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

const CommentLikes = ({ commentId }) => {
  const quantity = useSelector(state => state.comments[commentId].likes ?? 0);
  const canILike = useSelector(state => state.me.id && (state.me.id !== state.comments[commentId].authorId));
  const haveILiked = useSelector(state => state.comments[commentId].haveILiked);
  const isSendingLike = useSelector(state => state.comments[commentId].isSendingLike);
  const isLoadingLikes = useSelector(state => state.comments[commentId].isLoadingLikes);
  const usernames = useSelector(state => (state.comments[commentId].likerIds ?? []).map(id => state.users[id].username), shallowEqual);

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    if (!open) {
      setOpen(true);
      return dispatch(loadCommentLikes(commentId));
    }
    if (!canILike) return;
    if (isSendingLike) return;
    return dispatch(likeUnlikeComment({ commentId, verb: haveILiked ? 'unlike' : 'like' }));
  }, [open, canILike, isSendingLike, dispatch, commentId, haveILiked]);

  return (
    <section>
      {' -'}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger onClick={handleClick}>
          <span className="trigger" title="Comment likes">
            <Icon name="heart" className={quantity === 0 ? 'zero' : haveILiked ? 'liked' : ''}/>
            {quantity > 0 && (
              <span className="number">{quantity}</span>
            )}
          </span>
        </PopoverTrigger>
        <PopoverContent className="popover">
          {isLoadingLikes ? (
            <div className="content loading">Loading likes...</div>
          ) : usernames.length === 0 ? (
            <div className="content empty">No likes here yet</div>
          ) : (
            <ul className="content list">
              {usernames.map((username, i) => (
                <li key={username}>
                  <Link href={`/${username}`}>
                    <a>{username}</a>
                  </Link>

                  {i < usernames.length - 2 ? ', ' : i === usernames.length - 2 ? ' and ' : ' liked this'}
                </li>
              ))}
            </ul>
          )}
        </PopoverContent>
      </Popover>

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
        .trigger[data-state="open"] {
          background-color: #f2f2f2;
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

        :global(.popover) {
          border-radius: 0.125rem; /* 2px */
          box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.5);
          background-color: #fff;
        }
        :global(.popover svg) {
          fill: white;
        }
        :global(.popover[data-placement|="bottom"] svg) {
          filter: drop-shadow(0 -3px 1.5px rgba(0 0 0 / 0.3));
        }
        :global(.popover[data-placement|="top"] svg) {
          filter: drop-shadow(0 3px 1.5px rgba(0 0 0 / 0.3));
        }

        .content {
          color: #333;
          font-size: 0.85rem;
          text-align: left;
          line-height: 1.5;
          padding: 0.1875rem 0.375rem; /* 3px 6px */
      
          max-width: 12rem;
          max-height: 12rem;
      
          overflow-x: hidden;
          overflow-y: auto;
        }

        .loading {
          color: #666;
          font-style: italic;
        }
        .empty {
          color: #666;
        }
        .list {
          list-style: none;
          margin: 0;
        
          color: #666;
        }
        li {
          display: inline;
        }
      `}</style>
    </section>
  );
}

export default CommentLikes;
