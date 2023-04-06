import { useSelector } from '../store';
import AttachmentImage from './AttachmentImage';
import AttachmentOther from './AttachmentOther';
import { useState } from 'react';

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

  const firstRowImageAttachments = imageAttachments.slice(0, 3);
  const [collapsedImages, setCollapsedImages] = useState(true);

  function openCollapse(collapsedImages) {
    setCollapsedImages(!collapsedImages);
  }

  return (
    <section>
      {imageAttachments.length > 3 && collapsedImages ?
        <>
          {firstRowImageAttachments.map(firstRowAttId => (
            <AttachmentImage id={firstRowAttId} key={firstRowAttId}/>
          ))}
          <a onClick={() => openCollapse(collapsedImages)}> ➡️  </a>
        </>
        :
      imageAttachments.map(attId => (
        <AttachmentImage id={attId} key={attId}/>
      ))}

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
