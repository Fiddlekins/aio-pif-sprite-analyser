import {createImageData} from "./manipulation/createImageData.ts";
import {scan} from "./manipulation/scan.ts";
import {Pixel} from "./types.ts";

export function generateBackgroundFillImageData(fill: Pixel) {
  const fillData = createImageData(288, 288);
  scan(fillData, 0, 0, fillData.width, fillData.height, () => {
    return fill;
  })
  return fillData;
}
