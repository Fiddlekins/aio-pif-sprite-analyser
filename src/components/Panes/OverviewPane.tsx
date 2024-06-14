import {Box, BoxProps, styled} from "@mui/material";
import {useContext, useEffect, useRef} from "react";
import {AnalysisContext} from "../../contexts/AnalysisContext.tsx";
import {applyHighlightColours} from "../../utils/image/applyHighlightColours.ts";
import {getPixelFromHex8} from "../../utils/image/getPixelFromHex8.ts";
import {Pixel} from "../../utils/image/types.ts";
import {CanvasWithBackground} from "../CanvasWithBackground.tsx";
import {PokemonSummary} from "../PokemonSummary.tsx";
import {BackgroundPane} from "./BackgroundPane.tsx";

const highlightColour: Pixel = [255, 0, 0, 255];

const OverviewBox = styled(Box)<BoxProps>(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: theme.spacing(2),
  height: '100%',
}));

export function OverviewPane() {
  const {spriteInput, highlightedColourState, highlightMode} = useContext(AnalysisContext);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && spriteInput?.imageData) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        let imageData = spriteInput.imageData;
        if (highlightedColourState.render && highlightedColourState.highlightedColours.length) {
          const coloursToHighlight = highlightedColourState.highlightedColours.map((colourKey) => getPixelFromHex8(colourKey));
          imageData = applyHighlightColours(imageData, coloursToHighlight, highlightColour, highlightMode);
        }
        ctx.putImageData(imageData, 0, 0);
      }
    }
  }, [canvasRef, spriteInput, highlightedColourState, highlightMode]);

  return (
    <OverviewBox py={2}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <PokemonSummary/>
      </Box>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <CanvasWithBackground canvasRef={canvasRef}/>
      </Box>
      <BackgroundPane/>
    </OverviewBox>
  );
}
