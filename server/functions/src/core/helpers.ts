export function getDateFromSeconds(seconds: number) {
  const date = new Date(Date.UTC(1970, 0, 1)); // Epoch

  date.setSeconds(seconds);
  return date;
}
