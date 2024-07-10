import {getColourKeyFromPixel} from "./conversion/getColourKeyFromPixel.ts";
import {scan} from "./manipulation/scan.ts";

export function getColourCounts(imageData: ImageData, x: number, y: number, width: number, height: number) {
  const colourCounts = new Map<number, number>();
  scan(imageData, x, y, width, height, (pixel) => {
    const colourKey = getColourKeyFromPixel(pixel);
    const count = colourCounts.get(colourKey) || 0;
    colourCounts.set(colourKey, count + 1);
  })
  return colourCounts;
}
