import {Box} from "@mui/material";
import {SemiTransparencyVerdict} from "./SemiTransparencyVerdict.tsx";

export function TransparencyPane() {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      sx={{overflowY: 'auto'}}
      p={4}
    >
      <SemiTransparencyVerdict/>
    </Box>
  )
}
