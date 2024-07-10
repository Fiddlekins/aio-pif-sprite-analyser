import {createImageData} from "./createImageData.ts";
import {scan} from "./scan.ts";
import {setPixel} from "./setPixel.ts";

export function getCroppedImageData(input: ImageData, x: number, y: number, width: number, height: number): ImageData {
  const output = createImageData(width, height);
  scan(input, x, y, width, height, (pixel, inputX, inputY) => {
    setPixel(output, pixel, inputX - x, inputY - y);
  });
  return output;
}
