const iconWidths = {
  'ban': 12 / 14,
  'bars': 12 / 14,
  'bolt': 7 / 14,
  'bookmark': 21 / 28,
  'check-circle': 12 / 14,
  'check-circle-o': 12 / 14,
  'check-square': 12 / 14,
  'chevron-circle-right': 12 / 14,
  'clock': 12 / 14,
  'cloud-upload': 15 / 14,
  'envelope': 26 / 28,
  'exclamation': 10 / 28,
  'file': 12 / 14,
  'file-audio': 12 / 14,
  'globe': 24 / 28,
  'home': 26 / 28,
  'level-down': 16 / 28,
  'level-up': 16 / 28,
  'lock': 18 / 28,
  'more': 56 / 28,
  'more-small': 47 / 28,
  'plus': 10 / 14,
  'question-circle': 12 / 14,
  'search': 13 / 14,
  'times': 10 / 14,
  'thumbs-down': 25 / 28,
  'thumbs-up': 25 / 28,
};

const Icon = ({ name, title, className }) => {
  const width = Math.round(iconWidths[name] * 1000.1) / 1000;

  return (
    <svg className={'icon-' + name + (className ? ' ' + className : '')}>
      {title ? (
        <title>{title}</title>
      ) : false}
      <use xlinkHref={'#icon-' + name}/>

      <style jsx>{`
        svg {
          display: inline-block;
          width: 1em;
          height: 1em;
          margin-bottom: -0.15em; // vertical-align an inline icon of 1em height in a text
          stroke-width: 0;
          stroke: currentColor;
          fill: currentColor;
        }
        .icon-${name} {
          width: ${width}em;
        }
      `}</style>
    </svg>
  );
};

export default Icon;
