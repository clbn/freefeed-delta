import { useSelector } from 'react-redux';

const AttachmentOther = ({ id }) => {
  const attachment = useSelector(state => state.attachments[id]);

  if (!attachment) {
    return null;
  }

  const { url, fileName, fileSize } = attachment;

  return (
    <a href={url} title={fileSize + ' b'} target="_blank" rel="noopener">
      {fileName}

      <style jsx>{`
        a {
          display: block;
          padding: 1px;
          margin-bottom: 0.5rem;
          min-width: 36px;
          min-height: 1rem;
          font-size: 0.8rem;
        }
        
      `}</style>
    </a>
  );
};

export default AttachmentOther;
