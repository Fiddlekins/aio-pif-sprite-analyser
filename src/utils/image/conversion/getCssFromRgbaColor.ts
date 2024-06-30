import {RgbaColor} from "react-colorful";

export function getCssFromRgbaColor({r, g, b, a}: RgbaColor): string {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
