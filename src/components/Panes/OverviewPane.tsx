import {Box, BoxProps, styled} from "@mui/material";
import {useContext, useEffect, useRef} from "react";
import {AnalysisContext} from "../../contexts/AnalysisContext.tsx";
import {getPngInfoSummary} from "../../utils/getPngInfoSummary.ts";
import {applyHighlightColours} from "../../utils/image/applyHighlightColours.ts";
import {getPixelFromColourKey} from "../../utils/image/conversion/getPixelFromColourKey.ts";
import {getPixelFromRgbaColor} from "../../utils/image/conversion/getPixelFromRgbaColor.ts";
import {CanvasWithBackground} from "../CanvasWithBackground.tsx";
import {PngInfoTooltip} from "../PngInfoTooltip.tsx";
import {PokemonSummary} from "../PokemonSummary.tsx";
import {BackgroundPane} from "./BackgroundPane.tsx";

const OverviewBox = styled(Box)<BoxProps>(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: theme.spacing(2),
  height: '100%',
}));

export function OverviewPane() {
  const {spriteInput, highlightedColourState, highlightMode, highlightColour} = useContext(AnalysisContext);
  const canCopyCanvas = Boolean(highlightedColourState.render && highlightedColourState.highlightedColours.length);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && spriteInput?.imageData) {
      const ctx = canvas.getContext('2d', {colorSpace: 'srgb'});
      if (ctx) {
        let imageData = spriteInput.imageData;
        if (highlightedColourState.render && highlightedColourState.highlightedColours.length) {
          const coloursToHighlight = highlightedColourState.highlightedColours.map((colourKey) => getPixelFromColourKey(colourKey));
          imageData = applyHighlightColours(imageData, coloursToHighlight, getPixelFromRgbaColor(highlightColour), highlightMode);
        }
        ctx.putImageData(imageData, 0, 0);
      }
    }
  }, [canvasRef, spriteInput, highlightedColourState, highlightMode, highlightColour]);

  return (
    <OverviewBox py={2}>
      <Box display={'flex'} flexDirection={'row'} alignItems={'center'} px={4}>
        {spriteInput
          ? (
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={0.5}>
              {`Input File: ${getPngInfoSummary(spriteInput.info)}`}
              <PngInfoTooltip info={spriteInput.info}/>
            </Box>
          )
          : 'Awaiting input'
        }
      </Box>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <PokemonSummary/>
      </Box>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <CanvasWithBackground canvasRef={canvasRef} canCopy={canCopyCanvas} minSize={288}/>
      </Box>
      <BackgroundPane/>
    </OverviewBox>
  );
}
