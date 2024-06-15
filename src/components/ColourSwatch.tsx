import {Box, BoxProps, styled} from "@mui/material";

interface StyledBoxProps extends BoxProps {
  colour: string;
}

const StyledBox = styled(Box, {
  shouldForwardProp(propName: PropertyKey) {
    return propName !== 'colour';
  }
})<StyledBoxProps>(({colour}) => ({
  height: '16px',
  width: '16px',
  minWidth: '16px',
  backgroundColor: colour,
  outline: '1px solid black',
}));

export interface ColourSwatchProps {
  colour: string;
}

export function ColourSwatch({colour}: ColourSwatchProps) {
  return (
    <StyledBox
      colour={colour}
    />
  )
}
