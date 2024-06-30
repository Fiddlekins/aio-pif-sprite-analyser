import {RgbaColor} from "react-colorful";
import {Pixel} from "../types.ts";

export function getPixelFromRgbaColor({r, g, b, a}: RgbaColor): Pixel {
  return [r, g, b, a * 255];
}
