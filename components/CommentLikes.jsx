import { useSelector } from 'react-redux';

import Icon from './Icon';

const CommentLikes = ({ commentId }) => {
  const likes = useSelector(state => state.comments[commentId].likes || 0);
  const didILike = useSelector(state => state.comments[commentId].didILike);

  return (
    <section>
      {' -'}

      <span className="trigger" title="Comment likes">
        <Icon name="heart" className={likes === 0 ? 'zero' : didILike ? 'liked' : ''}/>

        {likes > 0 && (
          <span className="number">{likes}</span>
        )}
      </span>

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
