import tinycolor from "tinycolor2";
import {scan} from "./scan.ts";
import {Pixel} from "./types.ts";

const Severity = {
  success: 1,
  warning: 2,
  error: 3,
}

function getChannelHexString(channel: number) {
  return channel.toString(16).padStart(2, '0');
}

function getColourHexString(r: number, g: number, b: number, a: number) {
  return `${getChannelHexString(r)}${getChannelHexString(g)}${getChannelHexString(b)}${getChannelHexString(a)}`;
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
    const [r, g, b, a] = pixel;
    this.pixelCount += 1;
    const colourKey = getColourHexString(r, g, b, a);
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
      severity = Math.max(severity, Severity.warning);
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
