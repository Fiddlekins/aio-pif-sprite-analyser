import {ColourAnalysis} from "./ColourAnalysis.ts";
import {Report} from "./types.ts";

export interface ColourReport extends Report {
  analysis: ColourAnalysis;
}

export function getColourReport(
  imageData: ImageData,
): ColourReport {
  const colourAnalysis = ColourAnalysis.from(imageData, 0, 0, imageData.width, imageData.height);
  return {
    verdict: colourAnalysis.getVerdict(),
    analysis: colourAnalysis,
  }
}
