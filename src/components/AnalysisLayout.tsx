import {Box, BoxProps, Paper, PaperProps, styled} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {BackgroundModal} from "./Modals/BackgroundModal/BackgroundModal.tsx";
import {SettingsModal} from "./Modals/SettingsModal.tsx";
import {SpriteExportModal} from "./Modals/SpriteExportModal/SpriteExportModal.tsx";
import {SpriteImportModal} from "./Modals/SpriteImportModal.tsx";
import {DetailsPane} from "./Panes/DetailsPane.tsx";
import {OverviewPane} from "./Panes/OverviewPane.tsx";
import {TopBar} from "./TopBar.tsx";

const Container = styled(Box)<BoxProps>(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const GutteredBox = styled(Paper)<PaperProps>(({theme}) => ({
  width: '100%',
  maxWidth: theme.breakpoints.values.lg,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
}));

const ContentBox = styled(Box)<BoxProps>(() => ({
  flexGrow: 1,
  height: '100%',
  minHeight: 0,
}));

export function AnalysisLayout() {
  return (
    <>
      <Container>
        <GutteredBox>
          <TopBar/>
          <ContentBox>
            <Grid container height={'100%'}>
              <Grid
                xs={4}
                height={'100%'}
                sx={{boxShadow: 2, zIndex: 2, bgcolor: 'background.default'}}
              >
                <OverviewPane/>
              </Grid>
              <Grid xs={8} height={'100%'}>
                <DetailsPane/>
              </Grid>
            </Grid>
          </ContentBox>
        </GutteredBox>
      </Container>
      <SpriteImportModal/>
      <SpriteExportModal/>
      <BackgroundModal/>
      <SettingsModal/>
    </>
  );
}
