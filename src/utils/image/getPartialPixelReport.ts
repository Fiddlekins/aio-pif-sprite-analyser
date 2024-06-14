import {analysePartialPixels} from "./analysePartialPixels.ts";
import {PartialPixelAnalysis, Report} from "./types.ts";

export interface PartialPixelReport extends Report {
  analysis: PartialPixelAnalysis;
}

export function getPartialPixelReport(
  imageData: ImageData,
  macroPixelSize: number,
  partialPixelOutputMode: string,
): PartialPixelReport {
  const partialPixelAnalysis = analysePartialPixels(imageData, macroPixelSize, partialPixelOutputMode);
  return {
    verdict: partialPixelAnalysis.partialPixelCount === 0 ? 'success' : 'error',
    analysis: partialPixelAnalysis,
  }
}
