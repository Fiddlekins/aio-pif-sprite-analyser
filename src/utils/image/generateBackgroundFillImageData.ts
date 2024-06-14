import {Pixel} from "./types.ts";

const canvas = document.createElement('canvas');
canvas.width = 288;
canvas.height = 288;
const context = canvas.getContext('2d');


export function generateBackgroundFillImageData(fill: Pixel) {
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = `rgba(${fill[0]},${fill[1]},${fill[2]},${fill[3]})`;
    context.fillRect(0, 0, canvas.width, canvas.height);
    return context.getImageData(0, 0, canvas.width, canvas.height);
  }
  return null;
}
