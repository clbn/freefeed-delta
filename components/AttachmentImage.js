const AttachmentImage = ({ url, nameAndSize, src, srcSet, width, height }) => (
  <a href={url} title={nameAndSize} target="_blank" rel="noopener">
    <img alt={nameAndSize} src={src} srcSet={srcSet} width={width} height={height}/>

    <style jsx>{`
      a {
        display: inline-block;
        padding: 1px;
        border: 1px solid #ccc;
        margin: 0.5rem 0.5rem 0 0;

        min-width: 36px;
        min-height: 36px;
      }
      img {
        display: block;

        max-width: 100%;
        height: auto;
      }
    `}</style>
  </a>
);

export default AttachmentImage;
