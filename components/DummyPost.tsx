import { useRouter } from 'next/router';

const dummyWord = (length: number, volatility: number = 0) => {
  // const dummyChar = '\u2586'; // U+2586 LOWER THREE QUARTERS BLOCK (seems to broken in Firefox since March 2021)
  const dummyChar = '\u2580'; // U+2580 UPPER HALF BLOCK
  const charWidthFactor = 0.7; // because that block is much wider than the average latin letter

  let normalizedLength;

  if (!volatility) {
    normalizedLength = Math.round(length * charWidthFactor);
  } else {
    const min = length - volatility;
    const max = length + volatility;
    const randomLength = Math.floor(Math.random() * (max - min + 1)) + min;
    normalizedLength = Math.round(randomLength * charWidthFactor);
  }

  return dummyChar.repeat(normalizedLength);
};

const dummyText = (minWords: number, maxWords: number, wordLength: number, wordLengthVolatility: number) => {
  const randomWordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
  let wordList = [];
  for (let i = 0; i < randomWordCount; i++) {
    wordList.push(dummyWord(wordLength, wordLengthVolatility));
  }
  return wordList.join(' ');
};

const DummyPost = () => {
  const { route } = useRouter();
  const isIndividual = (route === '/[user]/[post]');

  const userpicSize = (isIndividual ? 75 : 50);

  const author = <a>{dummyWord(8, 4)}</a>;
  const recipients = (Math.random() < 0.5 && <>{' ' + dummyWord(2) + ' '}<a>{dummyText(1, 2, 10, 3)}</a></>);

  const body = dummyText(3, 30, 6, 4);

  const attachments = [];
  for (let i = 0; i < 3; i++) {
    if (Math.random() < 0.5) {
      attachments.push(<div key={i} className={`attachment attachment-` + Math.floor(Math.random() * 3)}/>);
    }
  }

  const dateTime = <>{dummyWord(2)} <a>{dummyWord(10, 2)}</a></>;
  const commentLink = (Math.random() < 0.75 && <><i>{dummyWord(1)}</i> <a>{dummyWord(7)}</a></>);
  const likeLink = (Math.random() < 0.75 && <><i>{dummyWord(1)}</i> <a>{dummyWord(4)}</a></>);

  const likes = (Math.random() < 0.75 && <>
    <i>{dummyWord(2) + ' '}</i> <a>{dummyText(1, 3, 10, 3)}</a> {dummyWord(4)} {dummyWord(3)}
  </>);

  return (
    <article>
      <section className="userpics">
        <div className="userpic"/>
      </section>

      <section className="authorship">{author} {recipients}</section>

      <section className="body">{body}</section>

      <section className="attachments">{attachments}</section>

      <section className="actions">{dateTime} {commentLink} {likeLink}</section>

      <section className="likes">{likes}</section>

      <style jsx>{`
        article {
          display: grid;
          grid-template-areas: "userpics authorship"
                               "userpics body"
                               "userpics attachments"
                               "userpics actions"
                               "userpics likes";
          grid-template-columns: auto 1fr; /* left column size is by content, right one takes the rest */
          column-gap: ${isIndividual ? 0.75 : 0.625}rem;

          border-top: 1px solid #eee;
          padding-top: 1rem;
          padding-bottom: 0.5rem;
        }
        @keyframes twinkle {
          0% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        section {
          display: block;
          color: var(--color-dummy-text);
          margin-bottom: 0.5rem;
        }
        section :global(a) {
          color: var(--color-dummy-link);
        }

        section.userpics {
          grid-area: userpics;
          margin-top: 0.2rem;
          margin-bottom: 0.3rem;
          animation: twinkle 0.5s infinite alternate;
        }
        section.userpics .userpic {
          background-color: #eee;
          width: ${userpicSize}px;
          height: ${userpicSize}px;
          border-radius: ${userpicSize <= 50 ? 1 : 2}px;
          box-shadow: 0 0 1px rgba(0, 0, 0, 0.8);
          margin: 1px;
        }

        section.authorship {
          grid-area: authorship;
          font-size: ${isIndividual ? 1.125 : 1}rem;
          margin-bottom: 0.2rem;
          animation: twinkle 0.6s infinite alternate;
        }

        section.body {
          grid-area: body;
          font-size: ${isIndividual ? 1.25 : 1.125}rem;
          animation: twinkle 0.7s infinite alternate;
        }

        section.attachments {
          grid-area: attachments;
          animation: twinkle 0.8s infinite alternate;
        }
        section.attachments :global(.attachment) {
          display: inline-block;
          border: 1px solid #ccc;
          background-color: #eee;
          height: 7rem;
          margin: 0 0.5rem 0.5rem 0;
        }
        section.attachments :global(.attachment-0) { width: 5rem; }
        section.attachments :global(.attachment-1) { width: 7rem; }
        section.attachments :global(.attachment-2) { width: 9rem; }

        section.actions {
          grid-area: actions;
          animation: twinkle 0.9s infinite alternate;
        }
        section.actions :global(i) {
          color: #eee;
        }

        section.likes {
          grid-area: likes;
          animation: twinkle 1s infinite alternate;
        }
        section.likes :global(i) {
          color: var(--color-dummy-heart);
        }

        @media screen and (max-width: 767px) {
          article {
            display: block; /* instead of grid */
          }
          section.userpics {
            float: left;
            margin-right: ${isIndividual ? 0.75 : 0.625}rem;
          }
        }

      `}</style>
    </article>
  );
};

export default DummyPost;
