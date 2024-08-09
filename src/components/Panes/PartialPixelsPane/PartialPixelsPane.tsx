import {Box} from "@mui/material";
import {PartialPixelsBox} from "./PartialPixelsBox.tsx";

export function PartialPixelsPane() {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      sx={{overflowY: 'auto'}}
      p={4}
    >
      <PartialPixelsBox/>
    </Box>
  )
}
