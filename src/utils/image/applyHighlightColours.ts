import {ColorSpace, set} from "colorjs.io/fn";
import {cloneImageData} from "./cloneImageData.ts";
import {getColorObjectFromPixel} from "./conversion/getColorObjectFromPixel.ts";
import {getColourKeyFromPixel} from "./conversion/getColourKeyFromPixel.ts";
import {getPixelFromColorObject} from "./conversion/getPixelFromColorObject.ts";
import {scan} from "./scan.ts";
import {Pixel} from "./types.ts";

export function applyHighlightColours(
  imageData: ImageData,
  coloursToHighlight: Pixel[],
  highlightColour: Pixel,
  highlightMode: string,
) {
  const outputImageData = cloneImageData(imageData);
  const computedHighlightColourMap = new Map<number, Pixel>();
  scan(outputImageData, 0, 0, outputImageData.width, outputImageData.height, (pixel) => {
    const [r, g, b, a] = pixel;
    for (const [hr, hg, hb, ha] of coloursToHighlight) {
      if (r === hr && g === hg && b === hb && a === ha) {
        if (highlightMode === 'monotone') {
          return highlightColour;
        } else if (highlightMode === 'negative') {
          return [255 - r, 255 - g, 255 - b, 255];
        } else if (highlightMode === 'rotate') {
          const colourKey = getColourKeyFromPixel(pixel);
          let computedHighlightColour = computedHighlightColourMap.get(colourKey);
          if (!computedHighlightColour) {
            const colour = getColorObjectFromPixel(pixel);
            set(colour, [ColorSpace.get("hsv"), "h"], (h) => h + 180);
            set(colour, [ColorSpace.get("hsv"), "s"], 100);
            set(colour, [ColorSpace.get("hsv"), "v"], 100);
            computedHighlightColour = getPixelFromColorObject(colour);
            computedHighlightColourMap.set(colourKey, computedHighlightColour);
          }
          return computedHighlightColour;
        }
      }
    }
  });
  return outputImageData;
}
