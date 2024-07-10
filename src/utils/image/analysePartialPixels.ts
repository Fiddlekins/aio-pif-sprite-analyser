import {cloneImageData} from "./manipulation/cloneImageData.ts";
import {getColourKeyFromPixel} from "./conversion/getColourKeyFromPixel.ts";
import {getColourCounts} from "./getColourCounts.ts";
import {getRankedColourCounts} from "./getRankedColourCounts.ts";
import {scan} from "./manipulation/scan.ts";
import {PartialPixelAnalysis, Pixel} from "./types.ts";

const colourPure: Pixel = [0, 255, 0, 255];
const colourCorrupted: Pixel = [0, 0, 255, 255];
const colourCorruption: Pixel = [255, 0, 0, 255];

export function analysePartialPixels(imageData: ImageData, macroPixelSize: number, outputMode: string) {
  const analysis: PartialPixelAnalysis = {
    imageData: cloneImageData(imageData),
    totalPixelCount: 0,
    partialPixelCount: 0,
  }
  const macroWidth = analysis.imageData.width / macroPixelSize;
  const macroHeight = analysis.imageData.height / macroPixelSize;
  for (let macroX = 0; macroX < macroWidth; macroX += 1) {
    for (let macroY = 0; macroY < macroHeight; macroY += 1) {
      analysis.totalPixelCount++;
      const rawX = macroX * macroPixelSize;
      const rawY = macroY * macroPixelSize;
      const colourCounts = getColourCounts(analysis.imageData, rawX, rawY, macroPixelSize, macroPixelSize);
      if (colourCounts.size > 1) {
        analysis.partialPixelCount++;
        const rankedColours = getRankedColourCounts(colourCounts);
        const [majority] = rankedColours;
        scan(analysis.imageData, rawX, rawY, macroPixelSize, macroPixelSize, (pixel) => {
          const colourKey = getColourKeyFromPixel(pixel);
          if (outputMode === 'full') {
            return colourCorruption;
          } else if (outputMode === 'mixed') {
            if (majority.count > 1 && colourKey === majority.colourKey) {
              return colourCorrupted;
            } else {
              return colourCorruption;
            }
          }
        });
      } else {
        scan(analysis.imageData, rawX, rawY, macroPixelSize, macroPixelSize, () => {
          return colourPure;
        });
      }
    }
  }
  return analysis;
}
