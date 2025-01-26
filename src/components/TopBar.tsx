import {observer} from "@legendapp/state/react";
import {Trans} from "@lingui/react/macro";
import {SettingsSharp} from "@mui/icons-material";
import {AppBar, AppBarProps, Box, Button, Link, styled, Toolbar, ToolbarProps, Typography} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {useCallback} from "react";
import logoUrl from '../assets/logo.svg';
import {analysis$} from "../state/analysis.ts";
import {ui$} from "../state/ui.ts";
import {StyledIconButton} from "./StyledIconButton.tsx";
import {TopBarTitle} from "./TopBarTitle.tsx";

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

export const TopBar = observer(function TopBar() {
  const spriteInput = analysis$.spriteInput.get();

  const openImportModal = useCallback(() => {
    ui$.isImportModalOpen.set(true);
  }, []);

  const openExportModal = useCallback(() => {
    ui$.isExportModalOpen.set(true);
  }, []);

  const openSettingsModal = useCallback(() => {
    ui$.isSettingsModalOpen.set(true);
  }, []);

  return (
    <StyledAppBar position={'sticky'}>
      <StyledToolbar>
        <Grid container width={'100%'}>
          <Grid xs={4}>
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
          <Grid xs={4}>
            <TopBarTitle spriteInput={spriteInput}/>
          </Grid>
          <Grid xs={4}>
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
                <Trans>
                  Import
                </Trans>
              </Button>
              <Button
                color="inherit"
                variant={'outlined'}
                onClick={openExportModal}
              >
                <Trans>
                  Export
                </Trans>
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
  );
});
