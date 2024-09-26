import {Box} from "@mui/material";
import {useContext, useEffect, useRef} from "react";
import {AnalysisContext} from "../../contexts/AnalysisContext.tsx";
import {getPngInfoSummary} from "../../utils/getPngInfoSummary.ts";
import {applyHighlightColours} from "../../utils/image/applyHighlightColours.ts";
import {getPixelFromColourKey} from "../../utils/image/conversion/getPixelFromColourKey.ts";
import {getPixelFromRgbaColor} from "../../utils/image/conversion/getPixelFromRgbaColor.ts";
import {CanvasWithBackground} from "../CanvasWithBackground.tsx";
import {BackgroundPane} from "../Panes/BackgroundPane.tsx";
import {PngInfoTooltip} from "../PngInfoTooltip.tsx";
import {PokemonSummary} from "../PokemonSummary.tsx";

export interface NavigationMenuContentMobileProps {
  view: string;
}

export function NavigationMenuContentMobile(
  {
    view,
  }: NavigationMenuContentMobileProps
) {
  const {
    spriteInput,
    highlightedColourState,
    highlightMode,
    highlightColour
  } = useContext(AnalysisContext);
  const renderHighlight = view === 'colourCount' || view === 'colourSimilarity';
  const canCopyCanvas = Boolean(renderHighlight && highlightedColourState.highlightedColours.length);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && spriteInput?.imageData) {
      const ctx = canvas.getContext('2d', {colorSpace: 'srgb'});
      if (ctx) {
        let imageData = spriteInput.imageData;
        if (renderHighlight && highlightedColourState.highlightedColours.length) {
          const coloursToHighlight = highlightedColourState.highlightedColours.map((colourKey) => getPixelFromColourKey(colourKey));
          imageData = applyHighlightColours(imageData, coloursToHighlight, getPixelFromRgbaColor(highlightColour), highlightMode);
        }
        ctx.putImageData(imageData, 0, 0);
      }
    }
  }, [canvasRef, spriteInput, highlightedColourState, highlightMode, highlightColour, renderHighlight]);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      p={2}
    >
      <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
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
      <Box
        display={'flex'}
        flexDirection={'row'}
        gap={2}
      >
        <PokemonSummary/>
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={2}
        >
          <CanvasWithBackground canvasRef={canvasRef} canCopy={canCopyCanvas}/>
          <BackgroundPane/>
        </Box>
      </Box>
    </Box>
  );
}
