import tinycolor from "tinycolor2";
import {cloneImageData} from "./cloneImageData.ts";
import {ColourAnalysis} from "./ColourAnalysis.ts";
import {scan} from "./scan.ts";
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
      const colourAnalysis = ColourAnalysis.from(analysis.imageData, rawX, rawY, macroPixelSize, macroPixelSize);
      if (colourAnalysis.coloursCount > 1) {
        analysis.partialPixelCount++;
        const rankedColours = colourAnalysis.rankedByFrequency();
        const [majority] = rankedColours;
        scan(analysis.imageData, rawX, rawY, macroPixelSize, macroPixelSize, ([r, g, b, a]) => {
          const colour = tinycolor({r, g, b, a});
          const colourKey = colour.toHex8();
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
