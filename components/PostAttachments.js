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
  const attachments = useSelector(state => state.attachments);
  const imageAttachments = [];
  const otherAttachments = [];

  for (let attachmentId of attachmentIds) {
    if (attachments[attachmentId].mediaType && attachments[attachmentId].mediaType === 'image') {
      imageAttachments.push(attachmentId);
    } else {
      otherAttachments.push(attachmentId);
    }
  }

  return (
    <section>
      {imageAttachments.map(attId => (
        <AttachmentImage id={attId} key={attId}/>
      ))}

      {otherAttachments.map(attId => (
        <a href={attachments[attId].url} title={attachments[attId].fileSize + ' b'} target="_blank" rel="noopener">{attachments[attId].fileName}</a>
      ))}

      <style jsx>{`
        section {
          grid-area: attachments;
          display: block;
          padding: 0.15rem 0;
          margin-right: -0.5rem;
          margin-bottom: 0;
        }
        a {
          display: block;
          padding: 1px;
          margin-bottom: 0.5rem;
          min-width: 36px;
          min-height: 1rem;
          font-size: 0.8rem;
        }
      `}</style>
    </section>
  );
};

export default PostAttachments;
