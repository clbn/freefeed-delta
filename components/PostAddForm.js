import {useState, useCallback, useRef} from 'react';
import { useRouter } from 'next/router';
import Textarea from 'react-textarea-autosize';

import {addComment, addPost} from '../store/actions';
import {useDispatch, useSelector} from 'react-redux';

const PostAddForm = () => {
  const { query: { offset } } = useRouter();

  if (offset) {
    return false;
  }

  return <PostAddFormNotEmpty/>
};

const PostAddFormNotEmpty = () => {
  const [isExpanded, setExpanded] = useState(false);
  // const [isSendingPost, setSendingPost] = useState(false);
  const myUsername = useSelector(state => state.me.username);

  const dispatch = useDispatch();
  const handleFocus = useCallback(() => setExpanded(true), []);
  const handleCancel = useCallback(() => setExpanded(false), []);
  const handleKeyUp = useCallback(event => {
    if (event.key === 'Escape') {
      handleCancel();
    }
  }, [handleCancel]);

  const textarea = useRef({}); // Textarea DOM element

  const textareaCallbackRef = useCallback(textareaElement => {
    textarea.current = textareaElement;
  }, []);

  const sendPost = useCallback(() => {
    // TODO: check if already sending, send request, handle the response (collapse the form)
    dispatch(addPost({ body: textarea.current.value, feeds: [myUsername] }));
  }, []);

  const handleKeyDown = useCallback(event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      setTimeout(sendPost, 0);
    }
  }, []);

  return (
    <div>
      {!isExpanded ? (
        <textarea rows="3" onFocus={handleFocus}/>
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
          <button className="cancel" onClick={handleCancel}>Cancel</button>
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
          margin: 0.125rem 0 0.5rem 0;
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
