import {createImageData} from "./createImageData.ts";
import {getPixel} from "./getPixel.ts";
import {scan} from "./scan.ts";

export function scaleImageData(input: ImageData, xScale: number, yScale: number): ImageData {
  const output = createImageData(Math.abs(xScale) * input.width, Math.abs(yScale) * input.height);
  scan(output, 0, 0, output.width, output.height, (_, x, y) => {
    return getPixel(
      input,
      xScale >= 0 ? Math.floor(x / xScale) : input.width - 1 - Math.floor(x / -xScale),
      yScale >= 0 ? Math.floor(y / yScale) : input.height - 1 - Math.floor(y / -yScale),
    );
  });
  return output;
}
