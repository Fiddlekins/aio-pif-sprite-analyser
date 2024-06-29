import {Pixel} from "../types.ts";

export function getCssFromPixel([r, g, b, a]: Pixel): string {
  return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
}
