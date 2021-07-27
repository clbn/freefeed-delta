import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCallback } from 'react';
import Textarea from 'react-textarea-autosize';

const PostAddForm = () => {
  const { query: { offset } } = useRouter();
  const [isExpanded, setExpanded] = useState(false);
  const handleFocus = useCallback(() => setExpanded(true), [setExpanded]);
  const handleCancel = useCallback(() => setExpanded(false), [setExpanded]);

  const cancelButton = <a className="cancelButton" onClick={handleCancel}>Cancel</a>;
  const postButton = <button className="postButton">Post to my feed</button>;

  if (offset)  {
    return false;
  }

  return (
    <div className="new-post-area" >
      <Textarea
        minRows={3}
        maxRows={10}
        maxLength="1500"
        defaultValue={''}
        onFocus={handleFocus}
      />
      {isExpanded && (
        <section className="actions">
          {cancelButton}
          {postButton}
        </section>
      )}

      {<style jsx>{`
        textarea {
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
          padding-right: 0.7rem;
          vertical-align: middle;
        }
        .postButton {
          color: inherit;
          font-weight: normal;
          background-color: inherit;
          border: solid 0.1rem #999999;
          padding: 0.1rem 0.2rem;
          margin: 0;
        }
      `}</style>}
    </div>
  );
}

export default PostAddForm;