import format from 'date-fns/format';
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';
import startOfDay from 'date-fns/startOfDay';
import startOfYear from 'date-fns/startOfYear';
import subDays from 'date-fns/subDays';
import { pluralForm } from './plural';

export function getISODate(timestamp) {
  return format(timestamp, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
}

export function getRelativeDate(timestamp, short = false) {
  const m = timestamp;
  const now = new Date();
  const age = differenceInMilliseconds(now, m);

  // Just now (when age < 45s)
  if (age < 45 * 1000) {
    return 'Just now';
  }

  // 1-59 minutes ago (when 45s <= age < 59.5m)
  if (age < 59.5 * 60 * 1000) {
    const minutes = Math.round(age/60/1000);
    return (short
      ? pluralForm(minutes, 'min')
      : pluralForm(minutes, 'minute') + ' ago'
    );
  }

  // 1, 1.5, 2-8 hours ago (when 59.5m <= age < 8.5h)
  if (age < 8.5 * 3600 * 1000) {
    let hours = Math.round(age/1800/1000) / 2;
    if (hours > 2) {
      hours = Math.round(hours);
    }
    return (short
      ? pluralForm(hours, 'hr')
      : pluralForm(hours, 'hour') + ' ago'
    );
  }

  // Today at 15:37 (when age >= 8.5 hrs and it's today)
  if (m > startOfDay(now)) {
    return (short
      ? format(m, 'HH:mm')
      : format(m, "'Today at' HH:mm")
    );
  }

  // Yesterday at 15:37 (when age >= 8.5 hrs and it's yesterday)
  if (m > startOfDay(subDays(now, 1))) {
    return (short
      ? format(m, "'Yest' HH:mm")
      : format(m, "'Yesterday at' HH:mm")
    );
  }

  // Wed, 17 Feb (when yesterday < age < 14 days)
  if (m > subDays(now, 14)) {
    return (short
      ? format(m, 'd LLL')
      : format(m, 'iii, d LLL')
    );
  }

  // 17 February (when age >= 14 days but it's still this year)
  if (m > startOfYear(now)) {
    return (short
      ? format(m, 'd LLL')
      : format(m, 'd LLLL')
    );
  }

  // 17 Feb 2016 (for everything else)
  return format(m, 'd LLL yyyy');
}

export function getFullDate(timestamp) {
  return format(timestamp, "yyyy-MM-dd HH:mm:ss 'UTC'xxx");
}
