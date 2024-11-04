import {Box} from "@mui/material";
import {PartialPixelsVerdict} from "../Panes/PartialPixelsPane/PartialPixelsVerdict.tsx";

export function PartialPixelsBox() {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      pt={2}
    >
      <PartialPixelsVerdict/>
    </Box>
  );
}
