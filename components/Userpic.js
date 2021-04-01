import { useSelector } from 'react-redux';

const Userpic = ({ id, size }) => {
  let url = useSelector(state => id && state.users[id] && state.users[id].userpicUrl);

  if (!url) {
    // TODO: return default SVG userpic
    return <>
      <div title="Default userpic">?</div>

      <style jsx>{`
        div {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ccc;
          width: ${size}px;
          height: ${size}px;
          border-radius: ${size <= 50 ? 1 : 2}px;
          box-shadow: 0 0 1px rgba(0, 0, 0, 0.8);
          margin: 1px;
        }
      `}</style>
    </>;
  }

  if (size <= 50) {
    url = url.replace('_75.', '_50.');
  }

  return <>
    <img src={url} width={size} height={size} alt="Userpic"/>

    <style jsx>{`
      img {
        display: block;
        border-radius: ${size <= 50 ? 1 : 2}px;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.8);
        margin: 1px;
      }
    `}</style>
  </>;
};

export default Userpic;