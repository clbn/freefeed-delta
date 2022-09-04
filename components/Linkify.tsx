import Link from 'next/link';
import {
  combine, withText,
  hashTags, emails, mentions, foreignMentions, links, arrows,
  HashTag, Email, Mention, ForeignMention, Link as TLink, Arrows
} from 'social-text-tokenizer';

// Domain names for translating links in the posts, comments, etc.
const siteDomains = [
  'freefeed.net',
  'beta.freefeed.net',
  'gamma.creagenics.com',
  'gamma.freefeed.net',
  'delta.applied.creagenics.com',
  'delta.freefeed.net',
  'm.freefeed.net',
  'old.freefeed.net',
];

const MAX_URL_LENGTH = 50;

const getLocalPart = (url) => {
  const m = url.match(/^https?:\/\/([^/]+)(.*)/i);
  let hostname, path;

  if (m) {
    hostname = m[1].toLowerCase();
    path = m[2] || '/';
  }

  const p = siteDomains.indexOf(hostname);

  if (p > -1 && path !== '/') {
    return path;
  }

  return null;
};

const splitLink = (linkToken, maxLength) => {
  let visiblePart = linkToken.shorten(maxLength);
  if (visiblePart.slice(-1) === '\u2026') {
    visiblePart = visiblePart.slice(0, -1);
  }

  const hiddenPart = linkToken.pretty.slice(visiblePart.length);

  return {
    visiblePart,
    hiddenPart
  };
};

// Break down the string into hashTags, emails, mentions, foreignMentions, links and arrows,
// then include Text tokens in between
const tokenize = withText(combine(hashTags(), emails(), mentions(), foreignMentions(), links(), arrows(/\u2191+|\^([1-9]\d*|\^*)/g)));

type LinkProps = {
  key: number;
  [key: string]: any
};

const Linkify = ({ userHover, arrowHover, children }) => <>{tokenize(children).map((token, i) => {
  if (token instanceof TLink) {
    let Component;
    const props: LinkProps = { key: i };
    const { visiblePart, hiddenPart } = splitLink(token, MAX_URL_LENGTH);

    const localURL = getLocalPart(token.text);

    if (localURL) {
      Component = (props) => <Link {...props}><a className={props.className}>{props.children}</a></Link>; // eslint-disable-line react/display-name
      props.href = localURL;
    } else {
      Component = (props) => <a {...props}>{props.children}</a>; // eslint-disable-line react/display-name
      props.href = token.href;
      props.target = '_blank';
      props.rel = 'noopener';
    }

    if (hiddenPart.length > 0) {
      props.className = 'shortened-link';
      return <Component {...props}>{visiblePart}<del>{hiddenPart}</del></Component>;
    }

    return <Component {...props}>{visiblePart}</Component>;
  }

  if (token instanceof Mention) {
    const url = token.text.replace('@', '/').toLowerCase();
    return <Link key={i} href={url}><a>{token.text}</a></Link>;
  }

  if (token instanceof Arrows && arrowHover) {
    const length = Number(token.text.match(/\d+/)?.[0]) || token.text.length; // Support both "^^^" and "^12"
    return (
      <span
        key={i}
        className={'reference-arrow'}
        onClick={() => arrowHover.click(length)} // eslint-disable-line react/jsx-no-bind
        onMouseEnter={() => arrowHover.hover(length)} // eslint-disable-line react/jsx-no-bind
        onMouseLeave={arrowHover.leave}
      >
        {token.text}
      </span>
    );
  }

  if (token instanceof Email) {
    return <a key={i} href={`mailto:${token.text}`}>{token.pretty}</a>;
  }

  if (token instanceof HashTag) {
    return <Link key={i} href={{ pathname: '/search', query: { q: token.text } }}><a>{token.text}</a></Link>;
  }

  return token.text;
})}</>;

export default Linkify;
