import {Alert, Box, Typography} from "@mui/material";

export function ColouredTransparencyWarning() {
  return (
    <Alert severity="warning">
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={1}
      >
        <Typography variant={'body2'} textAlign={'left'}>
          {'Note: The following analysis can be helpful but is not required to pass for a sprite to be considered valid.'}
        </Typography>
        <Typography variant={'body2'} textAlign={'left'}>
          {'If fixing this is desired you can use the "Normalise Transparency" option in the Export menu to save a copy of your sprite with the coloured transparency removed.'}
        </Typography>
        <Typography variant={'body2'} textAlign={'left'}>
          {'For users that frequently find their software is introducing coloured transparency, you might prefer to ignore these warnings. You can find an option to suppress them in the Settings menu.'}
        </Typography>
      </Box>
    </Alert>
  );
}
