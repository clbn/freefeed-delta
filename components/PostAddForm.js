import { useRouter } from 'next/router';
import Textarea from 'react-textarea-autosize';

const PostAddForm = () => {
  const { query: { offset } } = useRouter();

  if (offset)  {
    return false;
  }

  return (
    <div className="new-post-area" contentEditable="true">
    <Textarea
      minRows={3}
      maxLength="3000"
      defaultValue={''}
      autoFocus
      //onFocus={startCommenting}
    />
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
      `}</style>}
    </div>
  );
}

export default PostAddForm;