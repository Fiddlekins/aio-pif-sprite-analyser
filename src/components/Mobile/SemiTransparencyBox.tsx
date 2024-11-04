import {Box} from "@mui/material";
import {SemiTransparencyVerdict} from "../Panes/TransparencyPane/SemiTransparencyVerdict.tsx";

export function SemiTransparencyBox() {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      pt={2}
    >
      <SemiTransparencyVerdict/>
    </Box>
  );
}
