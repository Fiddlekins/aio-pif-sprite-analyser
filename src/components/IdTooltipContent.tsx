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
        Sprite ID
      </Typography>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={2}
      >
        <Typography variant={'body2'}>
          {'This is an ID generated from the raw pixel data of the sprite after it has been decoded and, if necessary, scaled to 288x288.'}
        </Typography>
        <Typography variant={'body2'}>
          {`The full ID is:\n ${id}`}
        </Typography>
      </Box>
    </Fragment>
  );
}
