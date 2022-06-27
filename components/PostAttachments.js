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
  let attachmentsAudio = [];
  let attachmentsPicture = [];

  for (let attachmentId of attachmentIds) {
    if (attachments[attachmentId].mediaType && attachments[attachmentId].mediaType === 'audio') {
      attachmentsAudio.push(attachmentId);
    } else {
      attachmentsPicture.push(attachmentId);
    }
  }

  return (
    <section>
      {attachmentsAudio.map(attId => (
        <a href={attachments[attId].url} title={attachments[attId].fileSize + ' b'}>{attachments[attId].fileName}</a>
      ))}

      {attachmentsPicture.map(attId => (
        <AttachmentImage id={attId} key={attId}/>
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
