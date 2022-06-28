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
          margin-bottom: 0.5rem;
        }
      `}</style>
    </a>
  );
};

export default AttachmentOther;
