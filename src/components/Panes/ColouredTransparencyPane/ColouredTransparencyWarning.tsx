import {Trans, useLingui} from "@lingui/react/macro";
import {Alert, Box, Typography} from "@mui/material";

export function ColouredTransparencyWarning() {
  const {t} = useLingui();
  const exportOptionName = t`Normalise Transparency`;
  return (
    <Alert severity="warning">
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={1}
      >
        <Typography variant={'body2'} textAlign={'left'}>
          <Trans>
            Note: The following analysis can be helpful but is not required to pass for a sprite to be considered valid.
          </Trans>
        </Typography>
        <Typography variant={'body2'} textAlign={'left'}>
          <Trans>
            If fixing this is desired you can use the "{exportOptionName}" option in the Export menu to save a copy of
            your sprite with the coloured transparency removed.
          </Trans>
        </Typography>
        <Typography variant={'body2'} textAlign={'left'}>
          <Trans>
            For users that frequently find their software is introducing coloured transparency, you might prefer to
            ignore these warnings. You can find an option to suppress them in the Settings menu.
          </Trans>
        </Typography>
      </Box>
    </Alert>
  );
}
