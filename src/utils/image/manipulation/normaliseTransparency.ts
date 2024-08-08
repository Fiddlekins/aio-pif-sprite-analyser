import {Pixel} from "../types.ts";
import {cloneImageData} from "./cloneImageData.ts";
import {scan} from "./scan.ts";

const normalisedTransparency: Pixel = [0, 0, 0, 0];

export function normaliseTransparency(input: ImageData): ImageData {
  const output = cloneImageData(input);
  scan(output, 0, 0, output.width, output.height, (pixel) => {
    if (pixel[3] === 0) {
      return normalisedTransparency;
    }
    return pixel;
  });
  return output;
}
