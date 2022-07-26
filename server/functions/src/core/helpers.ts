export function getDateFromSeconds(seconds: number) {
  if (!isNaN(seconds) && typeof seconds === 'number' && seconds !== undefined) {
    const date = new Date(Date.UTC(1970, 0, 1)); // Epoch
    date.setSeconds(seconds);
    return date;
  }
  return undefined;
}
