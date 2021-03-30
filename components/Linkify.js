import React, { Component } from 'react';
import Link from 'next/link';
import URLFinder from 'ff-url-finder';

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

const LINK = 'link';
const AT_LINK = 'atLink';
const LOCAL_LINK = 'localLink';
const HASHTAG = 'hashTag';
const EMAIL = 'email';
const ARROW = 'arrow';

const finder = new URLFinder(
  ['ru', 'com', 'net', 'org', 'info', 'gov', 'edu', 'рф', 'ua'],
  siteDomains
);

finder.withHashTags = true;
finder.withArrows = true;

const splitLink = (url, maxLength) => {
  let visiblePart = URLFinder.shorten(url, maxLength);
  if (visiblePart.slice(-1) === '\u2026') {
    visiblePart = visiblePart.slice(0, -1);
  }

  const hiddenPart = url.slice(visiblePart.length);

  return {
    visiblePart,
    hiddenPart
  };
};

class Linkify extends Component {
  parseCounter = 0;
  idx = 0;

  getElementByType = (it) => {
    const props = {
      key: `match${++this.idx}`,
      dir: 'ltr'
    };

    switch (it.type) {

      case LINK: {
        props.href = it.url;
        props.target = '_blank';
        props.rel = 'noopener';

        const { visiblePart, hiddenPart } = splitLink(it.text, MAX_URL_LENGTH);

        if (hiddenPart.length > 0) {
          props.className = 'shortened-link';
          return <a {...props}>{visiblePart}<del>{hiddenPart}</del></a>;
        }

        return <a {...props}>{visiblePart}</a>;
      }

      case LOCAL_LINK: {
        props.href = it.uri;

        const { visiblePart, hiddenPart } = splitLink(it.text, MAX_URL_LENGTH);

        if (hiddenPart.length > 0) {
          props.className = 'shortened-link';
          return <Link {...props}><a className="shortened-link">{visiblePart}<del>{hiddenPart}</del></a></Link>;
        }

        return <Link {...props}><a>{visiblePart}</a></Link>;
      }

      case AT_LINK: {
        props.username = it.username;
        props.display = it.text;
        if (this.userHover) {
          props.onMouseEnter = () => this.userHover.hover(it.username);
          props.onMouseLeave = this.userHover.leave;
        }
        return <Link key={props.key} href={`/${props.username}`}><a>{props.display}</a></Link>;
      }

      case EMAIL: {
        props.href = `mailto:${it.address}`;
        return <a {...props}>{it.text}</a>;
      }

      case HASHTAG: {
        props.href = { pathname: '/search', query: { q: it.text } };
        return <Link {...props}><a>{it.text}</a></Link>;
      }

      case ARROW: {
        if (!this.arrowHover) {
          return it.text;
        }

        props.className = 'reference-arrow';
        props.onClick = () => this.arrowHover.click(it.text.length);
        props.onMouseEnter = () => this.arrowHover.hover(it.text.length);
        props.onMouseLeave = this.arrowHover.leave;

        return <span {...props}>{it.text}</span>;
      }

    }

    return it.text;
  };

  parseString = (string) => {
    let elements = [];

    if (string === '') {
      return elements;
    }

    this.idx = 0;

    try {
      finder.parse(string).map(it => {
        elements.push(this.getElementByType(it));
      });

      return (elements.length === 1) ? elements[0] : elements;
    } catch (err) {
      console.log('Error while linkifying text', string, err);
    }

    return [string];
  };

  parse = (children) => {
    let parsed = children;

    if (typeof children === 'string') {
      parsed = this.parseString(children);
    } else if (React.isValidElement(children) && (children.type !== 'a') && (children.type !== 'button')) {
      parsed = React.cloneElement(
        children,
        { key: `parse${++this.parseCounter}` },
        this.parse(children.props.children)
      );
    } else if (children instanceof Array) {
      parsed = children.map(child => {
        return this.parse(child);
      });
    }

    return parsed;
  };

  render() {
    this.parseCounter = 0;
    this.userHover = this.props.userHover;
    this.arrowHover = this.props.arrowHover;

    return this.parse(this.props.children);
  }
}

export default Linkify;
