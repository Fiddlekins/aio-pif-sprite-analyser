import {observer} from "@legendapp/state/react";
import {Trans, useLingui} from "@lingui/react/macro";
import {CloseSharp, SettingsSharp} from "@mui/icons-material";
import {
  AppBar,
  AppBarProps,
  Box,
  Button,
  Link,
  Paper,
  PaperProps,
  styled,
  Toolbar,
  ToolbarProps,
  Typography
} from "@mui/material";
import {useCallback} from "react";
import logoUrl from "../../assets/logo.svg";
import {analysis$} from "../../state/analysis.ts";
import {settings$} from "../../state/settings.ts";
import {ui$} from "../../state/ui.ts";
import {Verdict} from "../../utils/image/types.ts";
import {StyledIconButton} from "../StyledIconButton.tsx";
import {TopBarTitle} from "../TopBarTitle.tsx";
import {VerdictIcon} from "../VerdictIcon.tsx";
import {NavigationMenuContentMobile} from "./NavigationMenuContentMobile.tsx";

const StyledBox = styled(Paper)<PaperProps>(({theme}) => ({
  position: 'fixed',
  zIndex: 10000,
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  backgroundColor: theme.palette.background.paper,
  backgroundImage: 'none',
  overflowY: 'auto',
}));

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
  height: '2.5rem',
  width: '2.5rem',
  border: '2px solid white',
}));

const styledIconButtonSx = {width: '36.5px', height: '36.5px'};

interface NavigationOptionsProps {
  verdict: Verdict | null;
  id: string;
  title: string;
  active: boolean;
  dimmed?: boolean;
  onViewChange: (viewNew: string) => void;
}

function NavigationOptions(
  {
    verdict,
    id,
    title,
    active,
    dimmed,
    onViewChange,
  }: NavigationOptionsProps
) {
  return (
    <Button
      variant={active ? 'contained' : 'outlined'}
      onClick={() => {
        onViewChange(id)
      }}
      sx={{opacity: dimmed ? 0.5 : 1}}
    >
      <Box
        display={'flex'}
        width={'100%'}
        gap={1}
      >
        <VerdictIcon verdict={verdict}/>
        <Typography>
          {title}
        </Typography>
        <Box flexGrow={1}/>
      </Box>
    </Button>
  );
}

export interface NavigationMenuMobileProps {
  isOpen: boolean;
  close: () => void;
  view: string;
  setView: (viewNew: string) => void;
}

export const NavigationMenuMobile = observer(function NavigationMenuMobile(
  {
    isOpen,
    close,
    view,
    setView,
  }: NavigationMenuMobileProps
) {
  const spriteInput = analysis$.spriteInput.get();
  const partialPixelReport = analysis$.partialPixelReport.get();
  const transparencyReport = analysis$.transparencyReport.get();
  const colourReport = analysis$.colourReport.get();
  const isIgnoreColouredTransparencyEnabled = settings$.isIgnoreColouredTransparencyEnabled.get();

  const {t} = useLingui();

  const openImportModal = useCallback(() => {
    ui$.isImportModalOpen.set(true);
  }, []);

  const openExportModal = useCallback(() => {
    ui$.isExportModalOpen.set(true);
  }, []);

  const openSettingsModal = useCallback(() => {
    ui$.isSettingsModalOpen.set(true);
  }, []);

  const onViewChange = useCallback((viewNew: string) => {
    setView(viewNew);
    close();
  }, [close, setView]);

  if (!isOpen) {
    return null;
  }
  return (
    <StyledBox>
      <StyledAppBar position={'sticky'}>
        <StyledToolbar>
          <Box
            display={'flex'}
            flexDirection={'column'}
            width={'100%'}
            gap={1}
            py={1}
          >
            <Box
              display={'flex'}
              width={'100%'}
              alignItems={'center'}
              justifyContent={'space-between'}
              gap={2}
            >
              <Box
                display={'flex'}
                height={'100%'}
                alignItems={'center'}
                gap={2}
              >
                <Link href={`${window.location.origin}${window.location.pathname}`} sx={{lineHeight: 0}}>
                  <StyledLogo src={logoUrl} alt={'logo'}/>
                </Link>
              </Box>
              <TopBarTitle spriteInput={spriteInput}/>
              <Box
                display={'flex'}
                height={'100%'}
                alignItems={'center'}
                gap={2}
              >
                <StyledIconButton
                  variant={'outlined'}
                  color="inherit"
                  onClick={close}
                  sx={styledIconButtonSx}
                >
                  <CloseSharp/>
                </StyledIconButton>
              </Box>
            </Box>
            <Box
              display={'flex'}
              width={'100%'}
              alignItems={'center'}
              gap={2}
            >
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
              <Box flexGrow={1}/>
              <StyledIconButton
                variant={'outlined'}
                color="inherit"
                onClick={openSettingsModal}
                sx={styledIconButtonSx}
              >
                <SettingsSharp/>
              </StyledIconButton>
            </Box>
          </Box>
        </StyledToolbar>
      </StyledAppBar>
      <NavigationMenuContentMobile/>
      <Box p={2}>
        <Paper>
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'stretch'}
            gap={1}
            p={2}
          >
            <Typography variant={'h5'} align={'left'}>
              <Trans>
                Analysis Report
              </Trans>
            </Typography>
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'stretch'}
              gap={1}
            >
              <NavigationOptions
                id={'partialPixels'}
                title={t`Partial Pixels`}
                verdict={partialPixelReport?.verdict || null}
                active={view === 'partialPixels'}
                onViewChange={onViewChange}
              />
              <NavigationOptions
                id={'semiTransparent'}
                title={t`Semi-Transparency`}
                verdict={transparencyReport?.semiTransparentVerdict || null}
                active={view === 'semiTransparent'}
                onViewChange={onViewChange}
              />
              <NavigationOptions
                id={'colouredTransparency'}
                title={t`Coloured Transparency`}
                verdict={transparencyReport?.colouredTransparentVerdict || null}
                active={view === 'colouredTransparency'}
                dimmed={isIgnoreColouredTransparencyEnabled}
                onViewChange={onViewChange}
              />
              <NavigationOptions
                id={'colourCount'}
                title={t`Colour Count`}
                verdict={colourReport?.spriteColourCountVerdict || null}
                active={view === 'colourCount'}
                onViewChange={onViewChange}
              />
              <NavigationOptions
                id={'colourSimilarity'}
                title={t`Colour Similarity`}
                verdict={colourReport?.colourSimilarityVerdict || null}
                active={view === 'colourSimilarity'}
                onViewChange={onViewChange}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    </StyledBox>
  );
});
