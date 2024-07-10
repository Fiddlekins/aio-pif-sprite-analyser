import {cloneImageData} from "./manipulation/cloneImageData.ts";
import {scan} from "./manipulation/scan.ts";
import {setPixel} from "./manipulation/setPixel.ts";
import {Pixel, TransparencyAnalysis} from "./types.ts";

const colourGreen: Pixel = [0, 255, 0, 255];
const colourRed: Pixel = [255, 0, 0, 255];
const colourTransparent: Pixel = [0, 0, 0, 0];

export function analyseTransparency(
  imageData: ImageData,
  semiTransparentOutputMode: string,
  colouredTransparencyOutputMode: string,
) {
  const analysis: TransparencyAnalysis = {
    semiTransparent: {
      imageData: cloneImageData(imageData),
      semiTransparentPixelCount: 0,
    },
    colouredTransparency: {
      imageData: cloneImageData(imageData),
      colouredTransparentPixelCount: 0,
    },
    totalPixelCount: 0,
  }
  scan(imageData, 0, 0, imageData.width, imageData.height, (pixel, x, y) => {
    analysis.totalPixelCount++;
    const [r, g, b, a] = pixel;
    if (a === 255) {
      setPixel(analysis.semiTransparent.imageData, colourGreen, x, y);

      if (colouredTransparencyOutputMode === 'contrast') {
        setPixel(analysis.colouredTransparency.imageData, colourGreen, x, y);
      } else if (colouredTransparencyOutputMode === 'opaqueColour') {
        setPixel(analysis.colouredTransparency.imageData, colourTransparent, x, y);
      }
    } else if (a === 0) {
      setPixel(analysis.semiTransparent.imageData, colourGreen, x, y);
      if (r !== 0 || g !== 0 || b !== 0) {
        analysis.colouredTransparency.colouredTransparentPixelCount++;
        if (colouredTransparencyOutputMode === 'contrast') {
          setPixel(analysis.colouredTransparency.imageData, colourRed, x, y);
        } else if (colouredTransparencyOutputMode === 'opaqueColour') {
          setPixel(analysis.colouredTransparency.imageData, [r, g, b, 255], x, y);
        }
      } else {
        if (colouredTransparencyOutputMode === 'contrast') {
          setPixel(analysis.colouredTransparency.imageData, colourGreen, x, y);
        } else if (colouredTransparencyOutputMode === 'opaqueColour') {
          setPixel(analysis.colouredTransparency.imageData, colourTransparent, x, y);
        }
      }
    } else {
      analysis.semiTransparent.semiTransparentPixelCount++;
      if (semiTransparentOutputMode === 'monotone') {
        setPixel(analysis.semiTransparent.imageData, colourRed, x, y);
      } else if (semiTransparentOutputMode === 'range') {
        // bump the brightness by making it non-linear
        const pow = 0.5;
        setPixel(analysis.semiTransparent.imageData, [
          Math.floor(Math.pow(a / 255, pow) * 255),
          0,
          Math.floor(Math.pow((255 - a) / 255, pow) * 255),
          255
        ], x, y);
      }
      if (colouredTransparencyOutputMode === 'contrast') {
        setPixel(analysis.colouredTransparency.imageData, colourGreen, x, y);
      } else if (colouredTransparencyOutputMode === 'opaqueColour') {
        setPixel(analysis.colouredTransparency.imageData, colourTransparent, x, y);
      }
    }
  });
  return analysis;
}
