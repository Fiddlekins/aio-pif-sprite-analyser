import tinycolor from "tinycolor2";
import {getHex8FromPixel} from "./getHex8FromPixel.ts";
import {scan} from "./scan.ts";
import {Pixel} from "./types.ts";

const Severity = {
  success: 1,
  warning: 2,
  error: 3,
}

export class ColourAnalysis {
  pixelCount: number;
  coloursCount: number;
  colourCounts: Record<string, number>;
  colours: Record<string, tinycolor.Instance>;

  static from(
    imageData: ImageData,
    startX: number,
    startY: number,
    width: number,
    height: number,
  ) {
    const analysis = new ColourAnalysis();
    scan(imageData, startX, startY, width, height, (pixel) => {
      analysis.addPixel(pixel);
    });
    return analysis;
  }

  constructor() {
    this.pixelCount = 0;
    this.coloursCount = 0;
    this.colourCounts = {};
    this.colours = {};
  }

  addPixel(pixel: Pixel) {
    this.pixelCount += 1;
    const colourKey = getHex8FromPixel(pixel);
    const colour = tinycolor(colourKey);
    if (!this.colourCounts[colourKey]) {
      this.colourCounts[colourKey] = 0;
      this.coloursCount += 1;
    }
    this.colourCounts[colourKey]++;
    if (!this.colours[colourKey]) {
      this.colours[colourKey] = colour;
    }
  }

  getAsArray() {
    return Object.keys(this.colours).map((colourKey) => {
      const colour = this.colours[colourKey];
      const count = this.colourCounts[colourKey];
      return {colourKey, colour, count};
    })
  }

  rankedByFrequency() {
    return this.getAsArray().sort((a, b) => b.count - a.count);
  }

  getVerdict() {
    let severity = Severity.success;
    if (this.coloursCount > 32) {
      severity = Math.max(severity, Severity.error);
    } else if (this.coloursCount > 20) {
      // Need colour similarity analysis to determine warning threshold
      // severity = Math.max(severity, Severity.warning);
    }
    switch (severity) {
      case 1:
        return 'success';
      case 2:
        return 'warning';
      case 3:
      default:
        return 'error';
    }
  }
}
