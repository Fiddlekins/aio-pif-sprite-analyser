import {RgbaColor} from "react-colorful";
import {Pixel} from "../types.ts";

export function getRgbaColorFromPixel([r, g, b, a]: Pixel): RgbaColor {
  return {r, g, b, a: a / 255};
}
