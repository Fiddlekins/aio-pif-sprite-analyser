import {AppBar, AppBarProps, Box, Button, Link, styled, Toolbar, ToolbarProps, Typography} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {useCallback, useContext} from "react";
import logoUrl from '../assets/logo.svg';
import {AnalysisContext} from "../contexts/AnalysisContext.tsx";

const StyledAppBar = styled(AppBar)<AppBarProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledToolbar = styled(Toolbar)<ToolbarProps>(({theme}) => ({
  width: '100%',
  maxWidth: theme.breakpoints.values.lg,
}));

export function TopBar() {
  const {setIsImportModalOpen, spriteInput} = useContext(AnalysisContext);

  const openImportModal = useCallback(() => {
    setIsImportModalOpen(true);
  }, [setIsImportModalOpen]);

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
              <img src={logoUrl} alt={'logo'} style={{height: '3rem', width: '3rem', border:'2px solid white'}}/>
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
            >
              <Box flexGrow={1}/>
              {spriteInput?.sourceUrl ? (
                <Typography >
                  <Link href={spriteInput.sourceUrl} color={'primary.contrastText'} target="_blank" rel="noreferrer">
                    {spriteInput?.name}
                  </Link>
                </Typography>
              ) : (
                <Typography>
                  {spriteInput?.name}
                </Typography>
              )}
              <Box flexGrow={1}/>
            </Box>
          </Grid>
          <Grid xs={3}>
            <Box
              display={'flex'}
              height={'100%'}
              alignItems={'center'}
            >
              <Box flexGrow={1}/>
              <Button
                color="inherit"
                variant={'outlined'}
                onClick={openImportModal}
              >
                Import
              </Button>
            </Box>
          </Grid>
        </Grid>
      </StyledToolbar>
    </StyledAppBar>
  )
    ;
}
