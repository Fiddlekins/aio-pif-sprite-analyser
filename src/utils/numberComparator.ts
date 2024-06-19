export function numberComparator(a: number | undefined, b: number | undefined) {
  if (a === undefined && b === undefined) {
    return 0;
  }
  if (a === undefined) {
    return -1;
  }
  if (b === undefined) {
    return 1;
  }
  if (a === b) {
    return 0
  }
  return a > b ? 1 : -1;
}
