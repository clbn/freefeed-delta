import { useCallback, useRef } from 'react';
import { useRouter } from 'next/router';

import { useSelector, useDispatch } from '../store';
import { toggleWritingComment, addComment } from '../store/actions';
import { selectCanIModeratePost } from '../utils/data-selectors';
import Icon from './Icon';
import Throbber from './Throbber';

const CommentAddForm = ({ postId }) => {
  const { route } = useRouter();
  const isIndividual = (route === '/[user]/[post]');

  const areCommentsDisabled = useSelector(state => state.posts[postId].areCommentsDisabled);
  const canICommentAnyway = useSelector(selectCanIModeratePost(postId));
  const existingComments = useSelector(state => state.posts[postId].commentIds.length);
  const omittedComments = useSelector(state => state.posts[postId].omittedComments);
  const isWritingComment = useSelector(state => state.posts[postId].isWritingComment);
  const isSendingComment = useSelector(state => state.posts[postId].isSendingComment);
  const commentErrorMessage = useSelector(state => state.posts[postId].commentErrorMessage);

  const dispatch = useDispatch();
  const toggleCommenting = useCallback(() => dispatch(toggleWritingComment(postId)), [dispatch, postId]);

  const textarea = useRef<HTMLTextAreaElement>(null); // Textarea DOM element

  const textareaCallbackRef = useCallback(textareaElement => {
    textarea.current = textareaElement;
  }, []);

  const startCommenting = useCallback(() => {
    if (!isWritingComment) {
      toggleCommenting();
    }
  }, [isWritingComment, toggleCommenting]);

  const cancelCommenting = useCallback(() => {
    if (!textarea.current.value || confirm('Discard changes and close the form?')) {
      toggleCommenting();
    }
  }, [toggleCommenting]);

  const sendComment = useCallback(() => {
    if (!isSendingComment) {
      dispatch(addComment({ postId, body: textarea.current.value }));
    }
  }, [dispatch, postId, isSendingComment]);

  const handleKeyDown = useCallback(event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      setTimeout(sendComment, 0);
    }
  }, [sendComment]);

  const handleKeyUp = useCallback(event => {
    if (event.key === 'Escape') {
      cancelCommenting();
    }
  }, [cancelCommenting]);

  const needsAddCommentLink = existingComments > 2 && !omittedComments;

  if (!isWritingComment && !isIndividual && !needsAddCommentLink) {
    return null;
  }

  return (
    <section>
      <div className="icon">
        <Icon name="comment-plus"/>
      </div>

      <div className="main">
        {isWritingComment ? <>
          <textarea
            key="real-textarea"
            ref={textareaCallbackRef}
            defaultValue={''}
            autoFocus={true}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            rows={2}
            maxLength={3000}/>

          {isSendingComment && <Throbber/>}

          {commentErrorMessage && (
            <div className="comment-error-message" role="alert">
              Comment has not been saved. Server response: &quot;{commentErrorMessage}&quot;
            </div>
          )}
        </> : (isIndividual) ? (
          <textarea key="placeholder-textarea" rows={2} onFocus={startCommenting}/>
        ) : <>
          <a className="add-comment-link" onClick={startCommenting}>Add comment</a>

          {areCommentsDisabled && canICommentAnyway && (
            <i> - disabled for others</i>
          )}
        </>}
      </div>

      <style jsx>{`
        section {
          grid-area: comment-add-form;

          display: flex;
          flex-wrap: nowrap; /* forcing children to be in a single line */
          align-items: flex-start; /* vertical alignment */
          justify-content: flex-start; /* horizontal alignment */
          margin-bottom: 0.5rem;
        }
        .icon {
          flex: 0 0 1.35rem; /* don't grow, don't shrink, stay at 1.35rem */
        }
        .icon :global(.icon-comment-plus) {
          color: var(--color-icon-comment-primary);
          fill: white;
        }
        .main {
          flex: 1; /* grow */
        }
        textarea {
          display: block;
          width: 100%;
          font-family: inherit;
          font-size: 1rem;
          padding: 0.25rem;
          margin: 0.125rem 0 0.5rem 0;
        }
        .add-comment-link {
          font-style: italic;
        }
      `}</style>
    </section>
  );
};

export default CommentAddForm;
