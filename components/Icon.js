const iconWidths = {
  'envelope': 15 / 16,
  'globe': 13 / 16,
  'lock': 10 / 16,
};

const Icon = ({ name, title, className }) => {
  const width = (Math.round(iconWidths[name] * 1000.1) / 1000) || 1;

  return (
    <svg className={'icon-' + name + (className ? ' ' + className : '')}>
      {title ? (
        <title>{title}</title>
      ) : false}
      <use xlinkHref={'#icon-' + name}/>

      <style jsx>{`
        svg {
          display: inline-block;

          /*
            Full text height ~= 1em * 1.18. The factor actually depends on 
            font family, it seems to be somewhere between 1.17 and 1.19.
            For example: text with "font-size: 16px" and "line-height: 1.5" has 
            ~19px text height (depending on font family) and 24px line height
          */
          height: 1.18em;
          width: 1em;
          vertical-align: text-bottom;

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
