import {ColorObject} from 'colorjs.io/fn';
import {getColorObjectFromPixel} from "./conversion/getColorObjectFromPixel.ts";
import {getPixelFromColourKey} from "./conversion/getPixelFromColourKey.ts";
import {getColourCounts} from "./getColourCounts.ts";
import {getRankedColourCounts} from "./getRankedColourCounts.ts";

const Severity = {
  success: 1,
  warning: 2,
  error: 3,
}

export class ColourAnalysis {
  pixelCount: number;
  coloursCount: number;
  colourCounts: Map<number, number>;
  colours: Map<number, ColorObject>;

  constructor(
    imageData: ImageData,
    startX: number,
    startY: number,
    width: number,
    height: number,
  ) {
    this.colourCounts = getColourCounts(imageData, startX, startY, width, height);
    this.coloursCount = this.colourCounts.size;
    this.pixelCount = width * height;
    this.colours = new Map();
    for (const colourKey of this.colourCounts.keys()) {
      const colour = getColorObjectFromPixel(getPixelFromColourKey(colourKey));
      this.colours.set(colourKey, colour);
    }
  }

  getAsArray() {
    return [...this.colourCounts.entries()].map(([colourKey, count]) => {
      const colour = this.colours.get(colourKey)!;
      return {colourKey, colour, count};
    });
  }

  rankedByFrequency() {
    return getRankedColourCounts(this.colourCounts).map(({colourKey, count}) => {
      const colour = this.colours.get(colourKey)!;
      return {colourKey, colour, count};
    });
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
