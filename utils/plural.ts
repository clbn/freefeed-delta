export function pluralForm(n, singular, plural = null, format = 'n w') {
  let w;

  if (n === 1) {
    w = singular;
  } else if (plural) {
    w = plural;
  } else {
    w = singular + 's';
  }

  return format.replace('n', n).replace('w', w);
}
