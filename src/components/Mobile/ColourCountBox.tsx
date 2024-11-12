import {Box, Paper} from "@mui/material";
import {HighlightedCanvasWithBackground} from "../HighlightedCanvasWithBackground.tsx";
import {ColourCountVerdict} from "../Panes/ColoursPane/ColourCountVerdict.tsx";
import {ColourDisplayControls} from "../Panes/ColoursPane/ColourDisplayControls.tsx";
import {SpriteColoursTable} from "../Tables/SpriteColoursTable.tsx";

export function ColourCountBox() {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      pt={2}
    >
      <Paper>
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={2}
          p={2}
        >
          <ColourCountVerdict/>
          <ColourDisplayControls/>
        </Box>
      </Paper>
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
            <HighlightedCanvasWithBackground/>
          </Box>
        </Paper>
      </Box>
      <SpriteColoursTable/>
    </Box>
  );
}
