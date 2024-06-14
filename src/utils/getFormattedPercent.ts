export function getFormattedPercent(value: number, decimals: number = 2): string {
  const scalar = 10 ** decimals;
  return `${Math.round(value * 100 * scalar) / scalar}%`;
}
