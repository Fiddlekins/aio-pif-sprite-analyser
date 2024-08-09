import {Box, Paper} from "@mui/material";
import {ColoursTable} from "../../Tables/ColoursTable.tsx";
import {SimilarityTable} from "../../Tables/SimilarityTable.tsx";
import {ColourCountVerdict} from "./ColourCountVerdict.tsx";
import {ColourDisplayControls} from "./ColourDisplayControls.tsx";
import {ColourSimilarityVerdict} from "./ColourSimilarityVerdict.tsx";

export function ColoursPane() {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      sx={{overflowY: 'auto'}}
      p={4}
    >
      <Paper>
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={2}
          p={2}
        >
          <ColourCountVerdict/>
          <ColourSimilarityVerdict/>
        </Box>
      </Paper>
      <Paper>
        <Box
          p={2}
        >
          <ColourDisplayControls/>
        </Box>
      </Paper>
      <ColoursTable/>
      <SimilarityTable/>
    </Box>
  )
}
