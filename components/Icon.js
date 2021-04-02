const iconWidths = {
  'envelope': 26 / 28,
  'globe': 24 / 28,
  'lock': 18 / 28,
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
