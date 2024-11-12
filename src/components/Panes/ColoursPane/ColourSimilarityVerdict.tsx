import {observer} from "@legendapp/state/react";
import {HelpOutlineSharp} from "@mui/icons-material";
import {Box, Typography} from "@mui/material";
import {Fragment} from "react";
import {analysis$} from "../../../state/analysis.ts";
import {StyledTooltip} from "../../StyledTooltip.tsx";
import {VerdictIcon} from "../../VerdictIcon.tsx";

export const ColourSimilarityVerdict = observer(function ColourSimilarityVerdict() {
  const colourReport = analysis$.colourReport.get();
  return (
    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
      <VerdictIcon verdict={colourReport?.analysis.getColourSimilarityVerdict() || null}/>
      <Typography variant={'h5'} textAlign={'start'}>
        {colourReport?.analysis.similaritySkipped !== true
          ? `Pairs of similar colours: ${colourReport?.analysis.similarColourPairMap.size || 0}`
          : 'Skipped due to colour count exceeding 256'
        }
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
                {`This is the number of pairs of colours that are considered to be too visually similar to one another.`}
              </Typography>
              <Typography variant={'body2'}>
                {`This is an imprecise metric due to being quite subjective, and some pokemon palettes are more prone to high similarity than others.`}
              </Typography>
              <Typography variant={'body2'}>
                {`The sprite guidelines require artists to reduce this number where possible, and then check with other artists if they think the remaining similar colours are important to keep.`}
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
