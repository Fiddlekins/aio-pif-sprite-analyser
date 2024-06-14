import {cloneImageData} from "./cloneImageData.ts";
import {scan} from "./scan.ts";
import {Pixel} from "./types.ts";

export function applyHighlightColours(
  imageData: ImageData,
  coloursToHighlight: Pixel[],
  highlightColour: Pixel,
  highlightMode: string,
) {
  const outputImageData = cloneImageData(imageData);
  scan(outputImageData, 0, 0, outputImageData.width, outputImageData.height, ([r, g, b, a]) => {
    for (const [hr, hg, hb, ha] of coloursToHighlight) {
      if (r === hr && g === hg && b === hb && a === ha) {
        if (highlightMode === 'monotone') {
          return highlightColour;
        } else if (highlightMode === 'inverse') {
          return [255 - r, 255 - g, 255 - b, 255];
        }
      }
    }
  });
  return outputImageData;
}
