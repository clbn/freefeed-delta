import { useSelector } from '../store';
import AttachmentImage from './AttachmentImage';
import AttachmentOther from './AttachmentOther';
import { useCallback, useState } from 'react';

const PostAttachments = ({ postId }) => {
  const attachmentIds = useSelector(state => state.posts[postId].attachmentIds);
  if (attachmentIds.length === 0) {
    return null;
  }
  return <PostAttachmentsNotEmpty attachmentIds={attachmentIds}/>
};

const PostAttachmentsNotEmpty = ({ attachmentIds }) => {
  const attachments = useSelector(state => state.attachments);
  const imageAttachments = [];
  const otherAttachments = [];

  for (const attachmentId of attachmentIds) {
    if (attachments[attachmentId].mediaType === 'image') {
      imageAttachments.push(attachmentId);
    } else {
      otherAttachments.push(attachmentId);
    }
  }

  const [expanded, setExpanded] = useState(false);
  const visibleImageAttachments = expanded ? imageAttachments : imageAttachments.slice(0, 3);
  const needArrow = imageAttachments.length > 3 && !expanded;
  const handleExpand = useCallback(() => setExpanded(true), []);

  return (
    <section>
      {visibleImageAttachments.map(attId => (
        <AttachmentImage id={attId} key={attId}/>
      ))}

      {needArrow && <a onClick={handleExpand}>➡️</a>}

      {otherAttachments.map(attId => (
        <AttachmentOther id={attId} key={attId}/>
      ))}

      <style jsx>{`
        section {
          grid-area: attachments;

          display: block;
          padding: 0.15rem 0;
          margin-right: -0.5rem;
          margin-bottom: 0;
        }
      `}</style>
    </section>
  );
};

export default PostAttachments;
