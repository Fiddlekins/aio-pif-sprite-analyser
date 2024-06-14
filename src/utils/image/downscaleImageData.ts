import {scan} from "./scan.ts";
import {setPixel} from "./setPixel.ts";

export function downscaleImageData(input: ImageData, scaleFactor: number) {
  const output = new ImageData(input.width / scaleFactor, input.height / scaleFactor);
  scan(input, 0, 0, input.width, input.height, (pixel, x, y) => {
    if (x % scaleFactor === 0 && y % scaleFactor === 0) {
      setPixel(output, pixel, x / scaleFactor, y / scaleFactor);
    }
  });
  return output
}
