import {observer} from "@legendapp/state/react";
import {Box} from "@mui/material";
import {HighlightedCanvasWithBackground} from "../HighlightedCanvasWithBackground.tsx";
import {analysis$} from "../../state/analysis.ts";
import {getPngInfoSummary} from "../../utils/getPngInfoSummary.ts";
import {BackgroundPane} from "../Panes/BackgroundPane.tsx";
import {PngInfoTooltip} from "../PngInfoTooltip.tsx";
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
              {`Input File: ${getPngInfoSummary(spriteInputInfo)}`}
              <PngInfoTooltip info={spriteInputInfo}/>
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
          <HighlightedCanvasWithBackground/>
          <BackgroundPane/>
        </Box>
      </Box>
    </Box>
  );
});
