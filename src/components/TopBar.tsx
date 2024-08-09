import {SettingsSharp} from "@mui/icons-material";
import {AppBar, AppBarProps, Box, Button, Link, styled, Toolbar, ToolbarProps, Typography} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {useCallback, useContext} from "react";
import logoUrl from '../assets/logo.svg';
import {AnalysisContext} from "../contexts/AnalysisContext.tsx";
import {SettingsContext} from "../contexts/SettingsContext.tsx";
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

export function TopBar() {
  const {setIsImportModalOpen, setIsExportModalOpen, spriteInput} = useContext(AnalysisContext);
  const {setIsSettingsModalOpen} = useContext(SettingsContext);

  const openImportModal = useCallback(() => {
    setIsImportModalOpen(true);
  }, [setIsImportModalOpen]);

  const openExportModal = useCallback(() => {
    setIsExportModalOpen(true);
  }, [setIsExportModalOpen]);

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
            <TopBarTitle spriteInput={spriteInput}/>
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
              <Button
                color="inherit"
                variant={'outlined'}
                onClick={openExportModal}
              >
                Export
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
}
