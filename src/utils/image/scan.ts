import {Pixel} from "./types.ts";

export function scan(
  imageData: ImageData,
  startX: number,
  startY: number,
  width: number,
  height: number,
  operation: (pixel: Pixel, x: number, y: number) => Pixel | void
) {
  for (let x = startX; x < startX + width; x += 1) {
    for (let y = startY; y < startY + height; y += 1) {
      const pixelIndex = (y * imageData.width) + x;
      // Hardcoded to 4 channels
      const dataIndex = pixelIndex * 4;
      const pixel: Pixel = [
        imageData.data[dataIndex],
        imageData.data[dataIndex + 1],
        imageData.data[dataIndex + 2],
        imageData.data[dataIndex + 3],
      ]
      const pixelNew = operation(pixel, x, y);
      if (pixelNew) {
        const [r, g, b, a] = pixelNew;
        imageData.data[dataIndex] = r;
        imageData.data[dataIndex + 1] = g;
        imageData.data[dataIndex + 2] = b;
        imageData.data[dataIndex + 3] = a;
      }
    }
  }
}
