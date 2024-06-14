import {scan} from "./scan.ts";

export function upscaleImageData(input: ImageData, scaleFactor: number) {
  const output = new ImageData(input.width * scaleFactor, input.height * scaleFactor);
  scan(input, 0, 0, input.width, input.height, (pixel, x, y) => {
    scan(output, x * scaleFactor, y * scaleFactor, scaleFactor, scaleFactor, () => {
      return pixel;
    })
  })
  return output
}
