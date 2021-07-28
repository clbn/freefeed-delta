import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Textarea from 'react-textarea-autosize';

const PostAddForm = () => {
  const { query: { offset } } = useRouter();

  if (offset) {
    return false;
  }

  return <PostAddFormNotEmpty/>
};

const PostAddFormNotEmpty = () => {
  const [isExpanded, setExpanded] = useState(false);
  const handleFocus = useCallback(() => setExpanded(true), []);
  const handleCancel = useCallback(() => setExpanded(false), []);

  return (
    <div>
      {!isExpanded ? (
        <textarea rows="3" onFocus={handleFocus}/>
      ) : <>
        <Textarea
          minRows={3}
          maxRows={10}
          maxLength={3000}
          defaultValue=""
          autoFocus
        />
        <div className="actions">
          <button className="cancel" onClick={handleCancel}>Cancel</button>
          <button className="post">Post to my feed</button>
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
