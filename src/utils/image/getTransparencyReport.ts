import {getMaxSeverity} from "../getMaxSeverity.ts";
import {analyseTransparency} from "./analyseTransparency.ts";
import {Report, TransparencyAnalysis, Verdict} from "./types.ts";

export interface TransparencyReport extends Report {
  analysis: TransparencyAnalysis;
  semiTransparentVerdict: Verdict;
  colouredTransparentVerdict: Verdict;
}

export function getTransparencyReport(
  imageData: ImageData,
  semiTransparentOutputMode: string,
  colouredTransparencyOutputMode: string,
): TransparencyReport {
  const transparencyAnalysis = analyseTransparency(imageData, semiTransparentOutputMode, colouredTransparencyOutputMode);
  const semiTransparentVerdict = transparencyAnalysis.semiTransparent.semiTransparentPixelCount > 0 ? 'warning' : 'success';
  const colouredTransparentVerdict = transparencyAnalysis.colouredTransparency.colouredTransparentPixelCount > 0 ? 'warning' : 'success';
  const transparencyVerdict: Verdict = getMaxSeverity([semiTransparentVerdict, colouredTransparentVerdict]);
  return {
    verdict: transparencyVerdict,
    semiTransparentVerdict,
    colouredTransparentVerdict,
    analysis: transparencyAnalysis,
  }
}
