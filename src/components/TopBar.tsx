import {HelpOutlineSharp, SettingsSharp} from "@mui/icons-material";
import {
  AppBar,
  AppBarProps,
  Box,
  Button,
  Link,
  styled,
  Toolbar,
  ToolbarProps,
  Tooltip,
  Typography
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {Fragment, useCallback, useContext} from "react";
import logoUrl from '../assets/logo.svg';
import {AnalysisContext} from "../contexts/AnalysisContext.tsx";
import {SettingsContext} from "../contexts/SettingsContext.tsx";
import {getShortId} from "../utils/getShortId.ts";
import {StyledIconButton} from "./StyledIconButton.tsx";

const StyledAppBar = styled(AppBar)<AppBarProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledToolbar = styled(Toolbar)<ToolbarProps>(({theme}) => ({
  width: '100%',
  maxWidth: theme.breakpoints.values.lg,
}));

const StyledLogo = styled('img')(() => ({
  height: '3rem',
  width: '3rem',
  border: '2px solid white',
}));

const styledIconButtonSx = {width: '36.5px', height: '36.5px'};

interface IdTooltipContentProps {
  id: string;
}

function IdTooltipContent(
  {
    id,
  }: IdTooltipContentProps
) {
  return (
    <Fragment>
      <Typography variant={'h6'}>
        Sprite ID
      </Typography>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={2}
      >
        <Typography variant={'body2'}>
          {'This is an ID generated from the raw pixel data of the sprite after it has been decoded and, if necessary, scaled to 288x288.'}
        </Typography>
        <Typography variant={'body2'}>
          {`The full ID is:\n ${id}`}
        </Typography>
      </Box>
    </Fragment>
  );
}

export function TopBar() {
  const {setIsImportModalOpen, spriteInput} = useContext(AnalysisContext);
  const {setIsSettingsModalOpen} = useContext(SettingsContext);

  const openImportModal = useCallback(() => {
    setIsImportModalOpen(true);
  }, [setIsImportModalOpen]);

  const openSettingsModal = useCallback(() => {
    setIsSettingsModalOpen(true);
  }, [setIsSettingsModalOpen]);

  return (
    <StyledAppBar position={'sticky'}>
      <StyledToolbar>
        <Grid container width={'100%'}>
          <Grid xs={3}>
            <Box
              display={'flex'}
              height={'100%'}
              alignItems={'center'}
              gap={2}
            >
              <Link href={`${window.location.origin}${window.location.pathname}`} sx={{lineHeight: 0}}>
                <StyledLogo src={logoUrl} alt={'logo'}/>
              </Link>
              <Typography variant={'h3'}>
                APSA
              </Typography>
            </Box>
          </Grid>
          <Grid xs={6}>
            <Box
              display={'flex'}
              height={'100%'}
              alignItems={'center'}
              gap={2}
            >
              <Box flexGrow={1}/>
              {spriteInput && (
                <>
                  {spriteInput.sourceUrl ? (
                    <Typography>
                      <Link
                        href={spriteInput.sourceUrl}
                        color={'primary.contrastText'}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {spriteInput.name}
                      </Link>
                    </Typography>
                  ) : (
                    <Typography>
                      {spriteInput.name}
                    </Typography>
                  )}
                  {'•︎'}
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={'center'}
                    gap={0.5}
                  >
                    <Typography>
                      {getShortId(spriteInput.id)}
                    </Typography>
                    <Tooltip
                      title={(
                        <IdTooltipContent id={spriteInput.id}/>
                      )}
                      placement={'bottom'}
                      arrow
                    >
                      <HelpOutlineSharp fontSize={'small'}/>
                    </Tooltip>
                  </Box>
                </>
              )}
              <Box flexGrow={1}/>
            </Box>
          </Grid>
          <Grid xs={3}>
            <Box
              display={'flex'}
              height={'100%'}
              alignItems={'center'}
              gap={2}
            >
              <Box flexGrow={1}/>
              <Button
                color="inherit"
                variant={'outlined'}
                onClick={openImportModal}
              >
                Import
              </Button>
              <StyledIconButton
                variant={'outlined'}
                color="inherit"
                onClick={openSettingsModal}
                sx={styledIconButtonSx}
              >
                <SettingsSharp/>
              </StyledIconButton>
            </Box>
          </Grid>
        </Grid>
      </StyledToolbar>
    </StyledAppBar>
  )
    ;
}
