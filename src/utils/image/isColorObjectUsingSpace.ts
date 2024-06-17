import {ColorObject, ColorSpace} from "colorjs.io/fn";

export function isColorObjectUsingSpace(colorObject: ColorObject, space: ColorSpace): boolean {
  if (!colorObject.space) {
    return false;
  }
  if (typeof colorObject.space === 'string') {
    return colorObject.space === space.id;
  }
  return colorObject.space === space;
}
