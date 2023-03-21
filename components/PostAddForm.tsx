import { useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import Textarea from 'react-textarea-autosize';

import { useSelector, useDispatch } from '../store';
import { addPost, toggleWritingPost } from '../store/actions';

const PostAddForm = () => {
  const { query: { offset } } = useRouter();

  if (offset) {
    return null;
  }

  return <PostAddFormNotEmpty/>
};

const PostAddFormNotEmpty = () => {
  const myUsername = useSelector(state => state.me.username);
  const isWritingPost = useSelector(state => state.isWritingPost);
  const isSendingPost = useSelector(state => state.isSendingPost);

  const dispatch = useDispatch();

  const textarea = useRef<HTMLTextAreaElement>(null); // Textarea DOM element

  const textareaCallbackRef = useCallback(textareaElement => {
    textarea.current = textareaElement;
  }, []);

  const startWriting = useCallback(() => {
    if (!isWritingPost) {
      dispatch(toggleWritingPost());
    }
  }, [dispatch, isWritingPost]);

  const cancelWriting = useCallback(() => {
    if (!textarea.current.value || confirm('Discard changes and close the form?')) {
      dispatch(toggleWritingPost());
    }
  }, [dispatch]);

  const sendPost = useCallback(() => {
    if (!isSendingPost) {
      dispatch(addPost({ body: textarea.current.value, feeds: [myUsername] }));
    }
  }, [dispatch, isSendingPost, myUsername]);

  const handleKeyDown = useCallback(event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      setTimeout(sendPost, 0);
    }
  }, [sendPost]);

  const handleKeyUp = useCallback(event => {
    if (event.key === 'Escape') {
      cancelWriting();
    }
  }, [cancelWriting]);

  return (
    <div>
      {!isWritingPost ? (
        <textarea rows={3} onFocus={startWriting}/>
      ) : <>
        <Textarea
          ref={textareaCallbackRef}
          minRows={3}
          maxRows={10}
          maxLength={3000}
          defaultValue=""
          autoFocus
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
        />
        <div className="actions">
          <button className="cancel" onClick={cancelWriting}>Cancel</button>
          <button className="post" onClick={sendPost}>Post to my feed</button>
        </div>
      </>}

      <style jsx>{`
        div :global(textarea) {
          display: block;
          width: 100%;
          font-family: inherit;
          font-size: 1rem;
          padding: 0.25rem;
          margin: 0.125rem 0 1rem 0;
        }
        .actions {
          display: flex;
          justify-content: flex-end;
          line-height: 1.3rem;
          margin-bottom: 1rem;
        }
        .cancel, 
        .post {
          font-size: 0.7rem;
          color: inherit;
          font-weight: normal;
          background-color: inherit;
          border: solid 0.1rem #999999;
          padding: 0.1rem 0.2rem;
          margin: 0;
        }
        .cancel {
          color: #555599;
          margin-right: 0.5rem;
          border: none; 
          outline: none;
        }
        .cancel:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default PostAddForm;
