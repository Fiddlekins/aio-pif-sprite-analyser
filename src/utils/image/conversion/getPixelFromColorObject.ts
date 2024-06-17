import {ColorObject, sRGB, to as convert} from "colorjs.io/fn";
import {isColorObjectUsingSpace} from "../isColorObjectUsingSpace.ts";
import {Pixel} from "../types.ts";

export function getPixelFromColorObject(colour: ColorObject): Pixel {
  let sRGBColour: ColorObject;
  if (isColorObjectUsingSpace(colour, sRGB)) {
    sRGBColour = colour;
  } else {
    sRGBColour = convert(colour, sRGB);
  }
  const [r, g, b] = sRGBColour.coords;
  return [r * 255, g * 255, b * 255, (sRGBColour.alpha || 1) * 255];
}
