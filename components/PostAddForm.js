import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';
import Textarea from 'react-textarea-autosize';

const PostAddForm = () => {
  const { query: { offset } } = useRouter();
  const [isExpanded, setExpanded] = useState(false);
  const handleFocus = useCallback(() => setExpanded(true), []);
  const handleCancel = useCallback(() => setExpanded(false), []);

  if (offset)  {
    return false;
  }

  return (
    <div>
      <Textarea
        minRows={3}
        maxRows={10}
        maxLength="1500"
        defaultValue=""
        onFocus={handleFocus}
      />
      {isExpanded && (
        <div className="actions">
          <button className="cancelButton" onClick={handleCancel}>Cancel</button>
          <button className="postButton">Post to my feed</button>
        </div>
      )}

      {<style jsx>{`
        Textarea {
          display: block;
          width: 100%;
          overflow: hidden;
          font-family: inherit;
          font-size: 1rem;
          padding: 0.25rem;
          margin: 0.125rem 0 0.5rem 0;
        }
        .actions {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 1rem;
          line-height: 1.3rem;
        }
        .cancelButton, .postButton {
          font-size: 0.7rem;
          color: inherit;
          font-weight: normal;
          background-color: inherit;
          border: solid 0.1rem #999999;
          padding: 0.1rem 0.2rem;
          margin: 0;
        }
        .cancelButton {
          color: #555599;
          margin-right: 0.5rem;
          border: none; 
          outline: none;
        }
        .cancelButton:hover {
          text-decoration: underline;
        }
      `}</style>}
    </div>
  );
}

export default PostAddForm;