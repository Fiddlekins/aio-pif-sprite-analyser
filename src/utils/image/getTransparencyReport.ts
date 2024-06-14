import {analyseTransparency} from "./analyseTransparency.ts";
import {Report, TransparencyAnalysis, Verdict} from "./types.ts";

export interface TransparencyReport extends Report {
  analysis: TransparencyAnalysis;
}

export function getTransparencyReport(
  imageData: ImageData,
  semiTransparentOutputMode: string,
  colouredTransparencyOutputMode: string,
): TransparencyReport {
  const transparencyAnalysis = analyseTransparency(imageData, semiTransparentOutputMode, colouredTransparencyOutputMode);
  let transparencyVerdict: Verdict = 'success';
  if (transparencyAnalysis.semiTransparent.semiTransparentPixelCount > 0) {
    transparencyVerdict = 'warning';
  }
  if (transparencyAnalysis.colouredTransparency.colouredTransparentPixelCount > 0) {
    transparencyVerdict = 'error';
  }
  return {
    verdict: transparencyVerdict,
    analysis: transparencyAnalysis,
  }
}
