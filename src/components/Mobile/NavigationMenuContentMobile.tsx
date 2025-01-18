import {observer} from "@legendapp/state/react";
import {Trans} from "@lingui/react/macro";
import {Box} from "@mui/material";
import {analysis$} from "../../state/analysis.ts";
import {HighlightedCanvasWithBackground} from "../HighlightedCanvasWithBackground.tsx";
import {BackgroundPane} from "../Panes/BackgroundPane.tsx";
import {PngInfoSummary} from "../PngInfo/PngInfoSummary.tsx";
import {PngInfoTooltip} from "../PngInfo/PngInfoTooltip.tsx";
import {PokemonSummary} from "../PokemonSummary.tsx";

export interface NavigationMenuContentMobileProps {
  view: string;
}

export const NavigationMenuContentMobile = observer(function NavigationMenuContentMobile() {
  const spriteInputInfo = analysis$.spriteInput.info.get();

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      p={2}
    >
      <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
        {spriteInputInfo
          ? (
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={0.5}>
              <Trans>
                Input File: <PngInfoSummary pngInfo={spriteInputInfo}/>
              </Trans>
              <PngInfoTooltip pngInfo={spriteInputInfo}/>
            </Box>
          )
          : (
            <Trans>
              Awaiting input
            </Trans>
          )
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
          <HighlightedCanvasWithBackground/>
          <BackgroundPane/>
        </Box>
      </Box>
    </Box>
  );
});
