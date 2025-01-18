import {Trans} from "@lingui/react/macro";
import {Box, Typography} from "@mui/material";
import {Fragment} from "react";

export interface IdTooltipContentProps {
  id: string;
}

export function IdTooltipContent(
  {
    id,
  }: IdTooltipContentProps
) {
  return (
    <Fragment>
      <Typography variant={'h6'}>
        <Trans>
          Sprite ID
        </Trans>
      </Typography>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={2}
      >
        <Typography variant={'body2'}>
          <Trans>
            This is an ID generated from the raw pixel data of the sprite after it has been decoded and, if necessary,
            scaled to 288x288.
          </Trans>
        </Typography>
        <Typography variant={'body2'}>
          <Trans>
            The full ID is:
            <br/>
            {id}
          </Trans>
        </Typography>
      </Box>
    </Fragment>
  );
}
