export function getFormattedPercent(value: number | undefined, decimals: number = 2): string {
  const scalar = 10 ** decimals;
  return `${Math.round((value || 0) * 100 * scalar) / scalar}%`;
}
