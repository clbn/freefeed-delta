import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { loadMoreComments } from '../store/actions';
import { preventDefault } from '../utils/events';
import Comment from './Comment';

const PostComments = ({ postId, postUrl }) => {
  const commentIds = useSelector(state => state.posts[postId].commentIds);
  if (commentIds.length === 0) {
    return false;
  }
  return <PostCommentsNotEmpty postId={postId} postUrl={postUrl} commentIds={commentIds}/>
};

const PostCommentsNotEmpty = ({ postId, postUrl, commentIds }) => {
  const omittedComments = useSelector(state => state.posts[postId].omittedComments);

  const dispatch = useDispatch();
  const loadMoreCommentsAction = useCallback(preventDefault(() => dispatch(loadMoreComments(postId))), [postId]);

  return (
    <ul>
      {commentIds.slice(0, 1).map(commentId => (
        <li key={commentId}>
          <Comment id={commentId} postUrl={postUrl}/>
        </li>
      ))}

      {omittedComments > 0 && (
        <li className="more-comments">
          <a href={postUrl} onClick={loadMoreCommentsAction}>
            {omittedComments} more comments
          </a>
        </li>
      )}

      {commentIds.slice(1).map(commentId => (
        <li key={commentId}>
          <Comment id={commentId} postUrl={postUrl}/>
        </li>
      ))}

      <style jsx>{`
        ul {
          grid-area: comments;

          list-style: none;
          padding: 0;
          margin-top: 0;
          margin-bottom: 0.5rem;
        }
        .more-comments {
          font-style: italic;
          padding-left: 1.4rem;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </ul>
  );
};

export default PostComments;
