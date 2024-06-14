import tinycolor from "tinycolor2";
import {getHex8FromPixel} from "./getHex8FromPixel.ts";
import {Pixel} from "./types.ts";

export function getTinyColourFromPixel(pixel: Pixel): tinycolor.Instance {
  const colourKey = getHex8FromPixel(pixel);
  return tinycolor(colourKey);
}
