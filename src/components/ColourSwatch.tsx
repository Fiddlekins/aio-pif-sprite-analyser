import {Box} from "@mui/material";

export interface ColourSwatchProps {
  colour: string;
}

export function ColourSwatch({colour}: ColourSwatchProps) {
  return (
    <Box
      height={'16px'}
      width={'16px'}
      sx={{
        backgroundColor: colour,
        outline: '1px solid black',
      }}
    />
  )
}
