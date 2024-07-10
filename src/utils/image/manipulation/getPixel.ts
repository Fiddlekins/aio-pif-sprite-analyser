import {Pixel} from "../types.ts";

export function getPixel(imageData: ImageData, x: number, y: number): Pixel {
  const pixelIndex = (y * imageData.width) + x;
  // Hardcoded to 4 channels
  const dataIndex = pixelIndex * 4;
  const r = imageData.data[dataIndex];
  const g = imageData.data[dataIndex + 1];
  const b = imageData.data[dataIndex + 2];
  const a = imageData.data[dataIndex + 3];
  return [r, g, b, a];
}
