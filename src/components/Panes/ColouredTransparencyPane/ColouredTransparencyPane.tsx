import {Box, Paper} from "@mui/material";
import {BackgroundColoursTable} from "../../Tables/BackgroundColoursTable.tsx";
import {ColourDisplayControls} from "../ColoursPane/ColourDisplayControls.tsx";
import {ColouredTransparencyVerdict} from "./ColouredTransparencyVerdict.tsx";
import {ColouredTransparencyWarning} from "./ColouredTransparencyWarning.tsx";

export function ColouredTransparencyPane() {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      sx={{overflowY: 'auto'}}
      p={4}
    >
      <ColouredTransparencyWarning/>
      <ColouredTransparencyVerdict/>
      <Paper>
        <Box
          p={2}
        >
          <ColourDisplayControls/>
        </Box>
      </Paper>
      <BackgroundColoursTable/>
    </Box>
  )
}
