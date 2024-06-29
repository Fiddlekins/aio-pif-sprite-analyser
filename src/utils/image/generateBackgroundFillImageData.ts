import {getCssFromPixel} from "./conversion/getCssFromPixel.ts";
import {Pixel} from "./types.ts";

const canvas = document.createElement('canvas');
canvas.width = 288;
canvas.height = 288;
const context = canvas.getContext('2d');


export function generateBackgroundFillImageData(fill: Pixel) {
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = getCssFromPixel(fill);
    context.fillRect(0, 0, canvas.width, canvas.height);
    return context.getImageData(0, 0, canvas.width, canvas.height);
  }
  return null;
}
