import {Box, Paper, Typography} from "@mui/material";
import {useContext} from "react";
import {AnalysisContext} from "../../contexts/AnalysisContext.tsx";
import {ColoursTable} from "../Tables/ColoursTable.tsx";
import {SimilarityTable} from "../Tables/SimilarityTable.tsx";
import {VerdictIcon} from "../VerdictIcon.tsx";


export function ColoursPane() {
  const {colourReport} = useContext(AnalysisContext);

  // console.log(colourReport);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      sx={{overflowY: 'auto'}}
      p={4}
    >
      <Paper>
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={2}
          p={2}
        >
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
            <VerdictIcon verdict={colourReport?.analysis.getColourCountVerdict() || null}/>
            <Typography variant={'h5'}>
              {`Colour Count: ${colourReport?.analysis.coloursCount || 0}`}
            </Typography>
          </Box>
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
            <VerdictIcon verdict={colourReport?.analysis.getColourSimilarityVerdict() || null}/>
            <Typography variant={'h5'}>
              {colourReport?.analysis.similaritySkipped !== true
                ? `Pairs of similar colours: ${colourReport?.analysis.similarColourPairMap.size || 0}`
                : 'Skipped due to colour count exceeding 256'
              }
            </Typography>
          </Box>
        </Box>
      </Paper>
      <ColoursTable/>
      <SimilarityTable/>
    </Box>
  )
}
