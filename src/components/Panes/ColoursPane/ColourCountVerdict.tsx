import {Box, Typography} from "@mui/material";
import {useContext} from "react";
import {AnalysisContext} from "../../../contexts/AnalysisContext.tsx";
import {VerdictIcon} from "../../VerdictIcon.tsx";

export function ColourCountVerdict() {
  const {colourReport} = useContext(AnalysisContext);
  return (
    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
      <VerdictIcon verdict={colourReport?.analysis.getColourCountVerdict() || null}/>
      <Typography variant={'h5'} textAlign={'start'}>
        {`Colour Count: ${colourReport?.analysis.coloursCount || 0}`}
      </Typography>
    </Box>
  );
}
