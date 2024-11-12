import {observer} from "@legendapp/state/react";
import {HelpOutlineSharp} from "@mui/icons-material";
import {Box, Typography} from "@mui/material";
import {Fragment} from "react";
import {analysis$} from "../../../state/analysis.ts";
import {spriteColourCountLimit} from "../../../utils/image/ColourAnalysis.ts";
import {StyledTooltip} from "../../StyledTooltip.tsx";
import {VerdictIcon} from "../../VerdictIcon.tsx";

export const ColourCountVerdict = observer(function ColourCountVerdict() {
  const colourReport = analysis$.colourReport.get();
  return (
    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
      <VerdictIcon verdict={colourReport?.spriteColourCountVerdict || null}/>
      <Typography variant={'h5'} textAlign={'start'}>
        {`Colour Count: ${colourReport?.analysis.spriteColourCount || 0}`}
      </Typography>
      <StyledTooltip
        title={(
          <Fragment>
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'left'}
              gap={0.5}
            >
              <Typography variant={'h6'}>
                Colour Count
              </Typography>
              <Typography variant={'body2'}>
                {`This is the number of "sprite colours" present, where a "sprite colour" refers to a colour that isn't fully transparent.`}
              </Typography>
              <Typography variant={'body2'}>
                {`The sprite guidelines limit this to ${spriteColourCountLimit} colours, but fewer is preferable for typical sprites.`}
              </Typography>
            </Box>
          </Fragment>
        )}
        placement={'top'}
        arrow
      >
        <HelpOutlineSharp fontSize={'small'}/>
      </StyledTooltip>
    </Box>
  );
});
