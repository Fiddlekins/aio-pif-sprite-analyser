import {Box, Typography} from "@mui/material";
import {useContext} from "react";
import {AnalysisContext} from "../../../contexts/AnalysisContext.tsx";
import {VerdictIcon} from "../../VerdictIcon.tsx";

export function ColourSimilarityVerdict() {
  const {colourReport} = useContext(AnalysisContext);
  return (
    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
      <VerdictIcon verdict={colourReport?.analysis.getColourSimilarityVerdict() || null}/>
      <Typography variant={'h5'} textAlign={'start'}>
        {colourReport?.analysis.similaritySkipped !== true
          ? `Pairs of similar colours: ${colourReport?.analysis.similarColourPairMap.size || 0}`
          : 'Skipped due to colour count exceeding 256'
        }
      </Typography>
    </Box>
  );
}
