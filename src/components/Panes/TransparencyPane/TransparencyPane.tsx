import {Box} from "@mui/material";
import {ColouredTransparencyBox} from "./ColouredTransparencyBox.tsx";
import {SemiTransparencyBox} from "./SemiTransparencyBox.tsx";

export function TransparencyPane() {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      sx={{overflowY: 'auto'}}
      p={4}
    >
      <SemiTransparencyBox/>
      <ColouredTransparencyBox/>
    </Box>
  )
}
