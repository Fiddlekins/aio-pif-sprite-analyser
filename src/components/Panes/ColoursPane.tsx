import {Box, Paper, Typography} from "@mui/material";
import {useContext} from "react";
import {AnalysisContext} from "../../contexts/AnalysisContext.tsx";
import {ColoursTable} from "../Tables/ColoursTable.tsx";


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
          flexDirection={'row'}
          gap={2}
          p={2}
        >
          <Typography variant={'h5'}>
            {`Colour Count: ${colourReport?.analysis.coloursCount || 0}`}
          </Typography>
        </Box>
      </Paper>
      <ColoursTable/>
    </Box>
  )
}
