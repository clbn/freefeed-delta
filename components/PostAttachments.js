import { useSelector } from 'react-redux';

import AttachmentImage from './AttachmentImage';

const PostAttachments = ({ postId }) => {
  const attachmentIds = useSelector(state => state.posts[postId].attachmentIds);
  if (attachmentIds.length === 0) {
    return false;
  }
  return <PostAttachmentsNotEmpty attachmentIds={attachmentIds}/>
};

const PostAttachmentsNotEmpty = ({ attachmentIds }) => {
  return (
    <section>
      {attachmentIds.map(attId => (
        <AttachmentImage id={attId} key={attId}/>
      ))}

      <style jsx>{`
        section {
          grid-area: attachments;

          padding: 0.15rem 0;
          margin-right: -0.5rem;
          margin-bottom: 0;
        }
      `}</style>
    </section>
  );
};

export default PostAttachments;
