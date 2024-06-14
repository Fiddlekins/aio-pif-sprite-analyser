import {Button, ButtonProps, styled} from "@mui/material";

export const StyledIconButton = styled(Button)<ButtonProps>(({theme}) => ({
  padding: theme.spacing(0.5),
  minWidth: 0,
}));
