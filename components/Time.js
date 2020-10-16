import { getISODate, getFullDate, getRelativeDate } from '../utils/time';

const Time = ({ stamp, short = false }) => {
  const dateISO = getISODate(stamp);
  const dateFull = getFullDate(stamp);
  const dateRelative = getRelativeDate(stamp, short);

  return (
    <time dateTime={dateISO} title={dateFull}>
      {dateRelative}

      <style jsx>{`
        time {
          white-space: nowrap;
        }
      `}</style>
    </time>
  );
};

export default Time;
