import { useCallback, useState } from 'react';

const Blurred = ({ children, hidden, onClick, backward = false }) => (
  <span className={hidden && 'hidden'} onClick={onClick}>
    {children.split('').map((char, i) =>
      <span key={i} className={`blur-${backward ? 9-i : i}`}>{char}</span>
    )}

    <style jsx>{`
      span {
        cursor: pointer;
      }

      .blur-0, .blur-1, .blur-2, .blur-3, .blur-4,
      .blur-5, .blur-6, .blur-7, .blur-8, .blur-9 {
        filter: blur(0.060em);
        transition: filter 0.5s ease;
      }

      .hidden .blur-0 { filter: blur(0); }
      .hidden .blur-1 { filter: blur(0.015em); }
      .hidden .blur-2 { filter: blur(0.030em); }
      .hidden .blur-3 { filter: blur(0.045em); }
      .hidden .blur-4 { filter: blur(0.060em); }
      .hidden .blur-5 { filter: blur(0.075em); }
      .hidden .blur-6 { filter: blur(0.090em); }
      .hidden .blur-7 { filter: blur(0.105em); }
      .hidden .blur-8 { filter: blur(0.120em); }
      .hidden .blur-9 { filter: blur(0.135em); }
    `}</style>
  </span>
);

const Spoiler = ({ openingTag, closingTag, children }) => {
  const [hidden, setHidden] = useState(true);
  const handleToggle = useCallback(() => setHidden(v => v ? null : true), []); // using null instead of false

  if (!children) {
    return openingTag;
  }

  return (
    <span title={hidden && 'This is a spoiler (click to reveal)'}>
      <Blurred hidden={hidden} onClick={handleToggle}>{openingTag}</Blurred>

      <u className={hidden && 'hidden'} onClick={hidden && handleToggle}>{children}</u>

      {closingTag && (
        <Blurred hidden={hidden} onClick={handleToggle} backward>{closingTag}</Blurred>
      )}

      <style jsx>{`
        u {
          text-decoration: none;
          transition: filter 0.5s ease;
        }
        u.hidden {
          filter: blur(0.25em);
          cursor: pointer;
        }      
        u.hidden :global(*) {
          pointer-events: none;
        }
      `}</style>
    </span>
  );
};

export default Spoiler;
