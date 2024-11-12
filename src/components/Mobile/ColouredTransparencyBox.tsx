import {Box, Paper} from "@mui/material";
import {HighlightedCanvasWithBackground} from "../HighlightedCanvasWithBackground.tsx";
import {ColouredTransparencyVerdict} from "../Panes/ColouredTransparencyPane/ColouredTransparencyVerdict.tsx";
import {ColouredTransparencyWarning} from "../Panes/ColouredTransparencyPane/ColouredTransparencyWarning.tsx";
import {ColourDisplayControls} from "../Panes/ColoursPane/ColourDisplayControls.tsx";
import {BackgroundColoursTable} from "../Tables/BackgroundColoursTable.tsx";

export function ColouredTransparencyBox() {
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
            <HighlightedCanvasWithBackground/>
          </Box>
        </Paper>
      </Box>
      <BackgroundColoursTable/>
    </Box>
  );
}
