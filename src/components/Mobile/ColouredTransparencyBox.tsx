import {Box, Paper} from "@mui/material";
import {useContext, useEffect, useRef} from "react";
import {AnalysisContext} from "../../contexts/AnalysisContext.tsx";
import {applyHighlightColours} from "../../utils/image/applyHighlightColours.ts";
import {getPixelFromColourKey} from "../../utils/image/conversion/getPixelFromColourKey.ts";
import {getPixelFromRgbaColor} from "../../utils/image/conversion/getPixelFromRgbaColor.ts";
import {CanvasWithBackground} from "../CanvasWithBackground.tsx";
import {ColouredTransparencyVerdict} from "../Panes/ColouredTransparencyPane/ColouredTransparencyVerdict.tsx";
import {ColouredTransparencyWarning} from "../Panes/ColouredTransparencyPane/ColouredTransparencyWarning.tsx";
import {ColourDisplayControls} from "../Panes/ColoursPane/ColourDisplayControls.tsx";
import {BackgroundColoursTable} from "../Tables/BackgroundColoursTable.tsx";

export function ColouredTransparencyBox() {
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
      pt={2}
    >
      <ColouredTransparencyWarning/>
      <Paper>
        <ColouredTransparencyVerdict/>
      </Paper>
      <ColourDisplayControls/>
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'stretch'}
        position={'sticky'}
        top={0}
        zIndex={1}
      >
        <Paper>
          <Box display={'flex'} justifyContent={'center'} p={1}>
            <CanvasWithBackground canvasRef={canvasRef} canCopy={canCopyCanvas}/>
          </Box>
        </Paper>
      </Box>
      <BackgroundColoursTable/>
    </Box>
  );
}
