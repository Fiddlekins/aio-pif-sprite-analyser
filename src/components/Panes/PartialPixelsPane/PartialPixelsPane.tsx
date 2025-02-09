import {Box} from "@mui/material";
import {PartialPixelsVerdict} from "./PartialPixelsVerdict.tsx";

export function PartialPixelsPane() {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      sx={{overflowY: 'auto'}}
      p={4}
    >
      <PartialPixelsVerdict/>
    </Box>
  )
}
