import {RgbaColor} from "react-colorful";

export function getColourKeyFromRgbaColor({r, g, b, a}: RgbaColor): number {
  let value = r;
  value *= 256;
  value += g;
  value *= 256;
  value += b;
  value *= 256;
  value += (a * 255);
  return value;
}
