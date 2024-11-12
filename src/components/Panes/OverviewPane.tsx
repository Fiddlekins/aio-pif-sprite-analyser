import {observer} from "@legendapp/state/react";
import {Box, BoxProps, styled} from "@mui/material";
import {HighlightedCanvasWithBackground} from "../HighlightedCanvasWithBackground.tsx";
import {analysis$} from "../../state/analysis.ts";
import {getPngInfoSummary} from "../../utils/getPngInfoSummary.ts";
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

export const OverviewPane = observer(function OverviewPane() {
  const spriteInputInfo = analysis$.spriteInput.info.get();
  return (
    <OverviewBox py={2}>
      <Box display={'flex'} flexDirection={'row'} alignItems={'center'} px={4}>
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
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <PokemonSummary/>
      </Box>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <HighlightedCanvasWithBackground minSize={288}/>
      </Box>
      <BackgroundPane/>
    </OverviewBox>
  );
});
