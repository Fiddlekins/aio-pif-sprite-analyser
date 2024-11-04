import {ColourAnalysis} from "./ColourAnalysis.ts";
import {Report, Verdict} from "./types.ts";

export interface ColourReport extends Report {
  backgroundColourCountVerdict: Verdict;
  spriteColourCountVerdict: Verdict;
  colourSimilarityVerdict: Verdict;
  analysis: ColourAnalysis;
}

export function getColourReport(
  imageData: ImageData,
): ColourReport {
  const colourAnalysis = new ColourAnalysis(imageData, 0, 0, imageData.width, imageData.height);
  return {
    verdict: colourAnalysis.getVerdict(),
    backgroundColourCountVerdict: colourAnalysis.getBackgroundColourCountVerdict(),
    spriteColourCountVerdict: colourAnalysis.getSpriteColourCountVerdict(),
    colourSimilarityVerdict: colourAnalysis.getColourSimilarityVerdict(),
    analysis: colourAnalysis,
  };
}
