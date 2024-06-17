export function getHex6FromColourKey(colourKey: number) {
  return Math.trunc(colourKey / 256).toString(16).padStart(6, '0');
}
