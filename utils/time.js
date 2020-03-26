import format from 'date-fns/lightFormat';

export function getFullDate(timestamp) {
  return format(new Date(timestamp), 'yyyy-MM-dd HH:mm:ss');
}
