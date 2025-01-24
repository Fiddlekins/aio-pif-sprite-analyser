import {HelpOutlineSharp} from "@mui/icons-material";
import {Box, BoxProps, styled} from "@mui/material";
import {ReactNode} from "react";
import {StyledTooltip} from "../../StyledTooltip.tsx";


const SettingBoxContainer = styled(Box)<BoxProps>(() => ({
  '& > :first-of-type': {
    // flexGrow: 1,
  },
  '& > :last-of-type': {
    // flexBasis: '20%',
    // flexGrow: 1,
  },
}));

export interface SettingProps {
  label: ReactNode;
  control: ReactNode;
  tooltip?: ReactNode;
}

export function Setting(
  {
    label,
    control,
    tooltip,
  }: SettingProps
) {
  return (
    <SettingBoxContainer
      display={'flex'}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      flexWrap={'wrap'}
      gap={2}
    >
      <Box
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        gap={0.5}
      >
        {label}
        {tooltip ? (
          <StyledTooltip
            title={tooltip}
            placement={'top'}
            arrow
          >
            <HelpOutlineSharp fontSize={'small'}/>
          </StyledTooltip>
        ) : null}
      </Box>
      {control}
    </SettingBoxContainer>
  );
}
