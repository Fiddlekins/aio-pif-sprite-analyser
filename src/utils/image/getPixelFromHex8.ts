import {Pixel} from "./types.ts";

export function getPixelFromHex8(hex8: string): Pixel {
  const r = parseInt(hex8.slice(0, 2), 16);
  const g = parseInt(hex8.slice(2, 4), 16);
  const b = parseInt(hex8.slice(4, 6), 16);
  const a = parseInt(hex8.slice(6, 8), 16);
  return [r, g, b, a];
}
