import {ColorObject, deltaE2000, deltaECMC, Lab, OKLab, to as convert} from 'colorjs.io/fn';
import {getMaxSeverity} from "../getMaxSeverity.ts";
import {getColorObjectFromPixel} from "./conversion/getColorObjectFromPixel.ts";
import {getPixelFromColourKey} from "./conversion/getPixelFromColourKey.ts";
import {getColourCounts} from "./getColourCounts.ts";
import {getRankedColourCounts} from "./getRankedColourCounts.ts";
import {Verdict} from "./types.ts";

const thresholds = {
  deltaE2000: 10,
  deltaECMC: 10,
  deltaFusionBot: 32,
}

function getColourPairKey(colourAKey: number, colourBKey: number) {
  if (colourAKey > colourBKey) {
    return `${colourAKey}-${colourBKey}`;
  } else {
    return `${colourBKey}-${colourAKey}`;
  }
}

function deltaFusionBot(colourA: [number, number, number], colourB: [number, number, number]) {
  // Replicates https://github.com/Aegide/bot-fusion-analyzer/blob/main/bot/analysis_sprite.py#L329
  const [rA, gA, bA] = colourA;
  const [rB, gB, bB] = colourB;
  return Math.max(
    Math.abs(rA - rB),
    Math.abs(gA - gB),
    Math.abs(bA - bB),
  );
}

interface SimilarityData {
  colourAKey: number;
  colourBKey: number;
  deltaE2000: number;
  deltaECMCAB: number;
  deltaECMCBA: number;
  deltaFusionBot: number;
  similarity: number;
}

function isSimilar({deltaE2000, deltaECMCAB, deltaECMCBA, deltaFusionBot}: SimilarityData) {
  if (deltaE2000 > thresholds.deltaE2000) {
    return false;
  }
  if (deltaECMCAB > thresholds.deltaECMC && deltaECMCBA > thresholds.deltaECMC) {
    return false;
  }
  if (deltaFusionBot > thresholds.deltaFusionBot) {
    return false;
  }
  return true;
}

function getMaxThresholdRatio({deltaE2000, deltaECMCAB, deltaECMCBA, deltaFusionBot}: SimilarityData) {
  return Math.max(
    deltaE2000 / thresholds.deltaE2000,
    deltaECMCAB / thresholds.deltaECMC,
    deltaECMCBA / thresholds.deltaECMC,
    deltaFusionBot / thresholds.deltaFusionBot,
  );
}

export class ColourAnalysis {
  pixelCount: number;
  coloursCount: number;
  colourCounts: Map<number, number>;
  colours: Map<number, ColorObject>;
  similarColourPairMap: Map<string, SimilarityData>;
  allColourPairMap: Map<string, SimilarityData>;
  similaritySkipped: boolean = false;

  constructor(
    imageData: ImageData,
    startX: number,
    startY: number,
    width: number,
    height: number,
  ) {
    this.colourCounts = getColourCounts(imageData, startX, startY, width, height);
    this.coloursCount = this.colourCounts.size;
    this.similaritySkipped = this.coloursCount > 256;
    this.pixelCount = width * height;
    this.colours = new Map();
    // Pre-convert colourspaces to avoid duplicating this work during distance calcs per colour pair combination
    const coloursRgb = new Map<number, [number, number, number]>();
    const coloursOklab = new Map<number, ColorObject>();
    const coloursCielab = new Map<number, ColorObject>();
    for (const colourKey of this.colourCounts.keys()) {
      const pixel = getPixelFromColourKey(colourKey);
      const colour = getColorObjectFromPixel(pixel);
      this.colours.set(colourKey, colour);
      if (!this.similaritySkipped) {
        coloursRgb.set(colourKey, [pixel[0], pixel[1], pixel[2]]);
        coloursOklab.set(colourKey, convert(colour, OKLab));
        coloursCielab.set(colourKey, convert(colour, Lab));
      }
    }
    this.similarColourPairMap = new Map();
    this.allColourPairMap = new Map();
    if (!this.similaritySkipped) {
      for (const colourAKey of this.colours.keys()) {
        for (const colourBKey of this.colours.keys()) {
          const colourPairKey = getColourPairKey(colourAKey, colourBKey);
          if (!this.allColourPairMap.has(colourPairKey) && colourAKey !== colourBKey) {
            const colourA = this.colours.get(colourAKey);
            const colourB = this.colours.get(colourBKey);
            const coloursRgbA = coloursRgb.get(colourAKey);
            const coloursRgbB = coloursRgb.get(colourBKey);
            const colourOklabA = coloursOklab.get(colourAKey);
            const colourOklabB = coloursOklab.get(colourBKey);
            const colourCielabA = coloursCielab.get(colourAKey);
            const colourCielabB = coloursCielab.get(colourBKey);
            if (colourA?.alpha && colourB?.alpha && colourA.alpha > 0 && colourB.alpha > 0
              && coloursRgbA && coloursRgbB && colourOklabA && colourOklabB && colourCielabA && colourCielabB) {
              const similarityConfig = {
                colourAKey,
                colourBKey,
                // distanceOklab: distance(oklabColourA, oklabColourB, OKLab),
                deltaE2000: deltaE2000(colourCielabA, colourCielabB),
                // deltaECMC produces different results based on operand order, so do it both ways
                deltaECMCAB: deltaECMC(colourCielabA, colourCielabB),
                deltaECMCBA: deltaECMC(colourCielabB, colourCielabA),
                deltaFusionBot: deltaFusionBot(coloursRgbA, coloursRgbB),
                similarity: 0,
              };
              similarityConfig.similarity = 1 / getMaxThresholdRatio(similarityConfig);
              this.allColourPairMap.set(colourPairKey, similarityConfig);
              if (isSimilar(similarityConfig)) {
                this.similarColourPairMap.set(colourPairKey, similarityConfig);
              }
            }
          }
        }
      }
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

  getColourCountVerdict() {
    let verdict: Verdict = 'success';
    if (this.coloursCount > 32) {
      verdict = getMaxSeverity(verdict, 'error');
    }
    return verdict;
  }

  getColourSimilarityVerdict() {
    let verdict: Verdict = 'success';
    if (this.similaritySkipped) {
      verdict = getMaxSeverity(verdict, 'error');
    } else if (this.similarColourPairMap.size > 20 || (this.similarColourPairMap.size / this.coloursCount) > 0.5) {
      verdict = getMaxSeverity(verdict, 'error');
    } else if (this.similarColourPairMap.size > 0 || (this.similarColourPairMap.size / this.coloursCount) > 0.2) {
      verdict = getMaxSeverity(verdict, 'warning');
    }
    return verdict;
  }

  getVerdict() {
    return getMaxSeverity(this.getColourCountVerdict(), this.getColourSimilarityVerdict());
  }
}
