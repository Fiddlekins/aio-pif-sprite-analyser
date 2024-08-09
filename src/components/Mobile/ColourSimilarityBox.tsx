import {Box, Paper} from "@mui/material";
import {useContext, useEffect, useRef} from "react";
import {AnalysisContext} from "../../contexts/AnalysisContext.tsx";
import {applyHighlightColours} from "../../utils/image/applyHighlightColours.ts";
import {getPixelFromColourKey} from "../../utils/image/conversion/getPixelFromColourKey.ts";
import {getPixelFromRgbaColor} from "../../utils/image/conversion/getPixelFromRgbaColor.ts";
import {CanvasWithBackground} from "../CanvasWithBackground.tsx";
import {ColourDisplayControls} from "../Panes/ColoursPane/ColourDisplayControls.tsx";
import {ColourSimilarityVerdict} from "../Panes/ColoursPane/ColourSimilarityVerdict.tsx";
import {SimilarityTable} from "../Tables/SimilarityTable.tsx";

export function ColourSimilarityBox() {
  const {
    spriteInput,
    highlightedColourState,
    highlightMode,
    highlightColour
  } = useContext(AnalysisContext);
  const canCopyCanvas = Boolean(highlightedColourState.highlightedColours.length);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && spriteInput?.imageData) {
      const ctx = canvas.getContext('2d', {colorSpace: 'srgb'});
      if (ctx) {
        let imageData = spriteInput.imageData;
        if (highlightedColourState.highlightedColours.length) {
          const coloursToHighlight = highlightedColourState.highlightedColours.map((colourKey) => getPixelFromColourKey(colourKey));
          imageData = applyHighlightColours(imageData, coloursToHighlight, getPixelFromRgbaColor(highlightColour), highlightMode);
        }
        ctx.putImageData(imageData, 0, 0);
      }
    }
  }, [canvasRef, spriteInput, highlightedColourState, highlightMode, highlightColour]);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
    >
      <Paper>
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={2}
          p={2}
        >
          <ColourSimilarityVerdict/>
          <ColourDisplayControls/>
        </Box>
      </Paper>
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'stretch'}
        position={'sticky'}
        top={-20}
        zIndex={1}
      >
        <Paper>
          <Box display={'flex'} justifyContent={'center'} p={1}>
            <CanvasWithBackground canvasRef={canvasRef} canCopy={canCopyCanvas}/>
          </Box>
        </Paper>
      </Box>
      <SimilarityTable/>
    </Box>
  );
}
