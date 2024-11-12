import {observer} from "@legendapp/state/react";
import {HelpOutlineSharp} from "@mui/icons-material";
import {Box, Link, styled, Typography, TypographyProps} from "@mui/material";
import {SpriteInput} from "../state/analysis.ts";
import {ui$} from "../state/ui.ts";
import {getShortId} from "../utils/getShortId.ts";
import {IdTooltipContent} from "./IdTooltipContent.tsx";
import {StyledTooltip} from "./StyledTooltip.tsx";

const CollapsibleTypography = styled(Typography)<TypographyProps>(() => ({
  textOverflow: 'ellipsis',
  whiteSpace: 'break-spaces',
  overflow: 'hidden',
}));

export interface TopBarTitleProps {
  spriteInput?: SpriteInput;
}

export const TopBarTitle = observer(function TopBarTitle(
  {
    spriteInput
  }: TopBarTitleProps
) {
  const isMobile = ui$.isMobile.get();
  return (
    <Box
      display={'flex'}
      flexDirection={isMobile ? 'column' : 'row'}
      height={'100%'}
      alignItems={'center'}
      gap={isMobile ? 0 : 2}
      minWidth={0}
    >
      <Box flexGrow={1}/>
      {spriteInput && (
        <>
          {spriteInput.sourceUrl ? (
            <CollapsibleTypography variant={isMobile ? 'body2' : 'body1'} width={isMobile ? '100%' : undefined}>
              <Link
                href={spriteInput.sourceUrl}
                color={'inherit'}
                target="_blank"
                rel="noreferrer"
              >
                {spriteInput.name}
              </Link>
            </CollapsibleTypography>
          ) : (
            <CollapsibleTypography variant={isMobile ? 'body2' : 'body1'} width={isMobile ? '100%' : undefined}>
              {spriteInput.name}
            </CollapsibleTypography>
          )}
          {isMobile ? null : '•︎'}
          <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            gap={0.5}
          >
            <Typography variant={isMobile ? 'body2' : 'body1'}>
              {getShortId(spriteInput.id)}
            </Typography>
            <StyledTooltip
              title={(
                <IdTooltipContent id={spriteInput.id}/>
              )}
              placement={'bottom'}
              arrow
            >
              <HelpOutlineSharp fontSize={'small'}/>
            </StyledTooltip>
          </Box>
        </>
      )}
      <Box flexGrow={1}/>
    </Box>
  );
});
