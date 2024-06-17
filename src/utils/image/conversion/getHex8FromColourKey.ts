export function getHex8FromColourKey(colourKey: number) {
  return colourKey.toString(16).padStart(8, '0');
}
