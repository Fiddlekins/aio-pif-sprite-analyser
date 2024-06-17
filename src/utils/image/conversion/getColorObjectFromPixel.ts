import {ColorObject, sRGB} from "colorjs.io/fn";
import {Pixel} from "../types.ts";

export function getColorObjectFromPixel([r, g, b, a]: Pixel): ColorObject {
  return {space: sRGB, coords: [r / 255, g / 255, b / 255], alpha: a / 255}
}
