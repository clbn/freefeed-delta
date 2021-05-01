import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { loadMoreComments } from '../store/actions';
import { preventDefault } from '../utils/events';
import { pluralForm } from '../utils/plural';
import Comment from './Comment';
import Throbber from './Throbber';

const PostComments = ({ postId, postUrl }) => {
  const commentIds = useSelector(state => state.posts[postId].commentIds);
  if (commentIds.length === 0) {
    return false;
  }
  return <PostCommentsNotEmpty postId={postId} postUrl={postUrl} commentIds={commentIds}/>
};

const PostCommentsNotEmpty = ({ postId, postUrl, commentIds }) => {
  const omittedComments = useSelector(state => state.posts[postId].omittedComments);
  const omittedCommentLikes = useSelector(state => state.posts[postId].omittedCommentLikes);
  const isLoadingMoreComments = useSelector(state => state.posts[postId].isLoadingMoreComments);

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
            <i>{omittedComments} more comments</i>

            {omittedCommentLikes > 0 && (
              <em>
                {' with ' + pluralForm(omittedCommentLikes, 'like')}
              </em>
            )}
          </a>
          {isLoadingMoreComments && <Throbber/>}
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
        em {
          color: #bbb;
        }
        a:hover {
          text-decoration: none;
        }
        a:hover i {
          text-decoration: underline;
        }
      `}</style>
    </ul>
  );
};

export default PostComments;
