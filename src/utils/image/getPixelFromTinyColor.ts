import tinycolor from "tinycolor2";
import {getPixelFromHex8} from "./getPixelFromHex8.ts";
import {Pixel} from "./types.ts";

export function getPixelFromTinyColor(colour: tinycolor.Instance): Pixel {
  return getPixelFromHex8(colour.toHex8());
}
