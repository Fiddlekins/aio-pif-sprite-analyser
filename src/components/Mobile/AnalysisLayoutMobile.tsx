import {observer, Show} from "@legendapp/state/react";
import {Box, BoxProps, Paper, PaperProps, styled} from "@mui/material";
import {useCallback, useEffect, useRef, useState} from "react";
import {analysis$} from "../../state/analysis.ts";
import {settings$} from "../../state/settings.ts";
import {ui$} from "../../state/ui.ts";
import {BackgroundModal} from "../Modals/BackgroundModal/BackgroundModal.tsx";
import {SettingsModal} from "../Modals/SettingsModal/SettingsModal.tsx";
import {SpriteExportModal} from "../Modals/SpriteExportModal/SpriteExportModal.tsx";
import {SpriteImportModal} from "../Modals/SpriteImportModal.tsx";
import {ColourCountBox} from "./ColourCountBox.tsx";
import {ColouredTransparencyBox} from "./ColouredTransparencyBox.tsx";
import {ColourSimilarityBox} from "./ColourSimilarityBox.tsx";
import {NavigationMenuMobile} from "./NavigationMenuMobile.tsx";
import {PartialPixelsBox} from "./PartialPixelsBox.tsx";
import {SemiTransparencyBox} from "./SemiTransparencyBox.tsx";
import {TopBarMobile} from "./TopBarMobile.tsx";

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

const ContentBox = styled(Box)<BoxProps>(({theme}) => ({
  flexGrow: 1,
  height: '100%',
  minHeight: 0,
  paddingTop: theme.spacing(0),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  overflowY: 'auto',
}));

export const AnalysisLayoutMobile = observer(function AnalysisLayoutMobile() {
  const spriteInput = analysis$.spriteInput.get();
  const partialPixelReport = analysis$.partialPixelReport.get();
  const transparencyReport = analysis$.transparencyReport.get();
  const colourReport = analysis$.colourReport.get();
  const isIgnoreColouredTransparencyEnabled = settings$.isIgnoreColouredTransparencyEnabled.get();

  const lastHandledSpriteId = useRef('');
  const [isNavigationMenuOpen, setIsNavigationMenuOpen] = useState(true);
  const [view, setView] = useState<string>('');

  const updateView = useCallback((viewNew: string) => {
    switch (viewNew) {
      case 'colouredTransparency':
        ui$.highlight.currentView.set('backgroundColours');
        break;
      case 'colourCount':
      case 'colourSimilarity':
        ui$.highlight.currentView.set('spriteColours');
        break;
      default:
        ui$.highlight.currentView.set('disabled');
    }
    setView(viewNew);
  }, [setView]);

  useEffect(() => {
    // Use a ref to store the last sprite ID that was handled
    // This avoids updating the tab index whenever the reports are regenerated until spriteInput itself changes
    if (spriteInput && spriteInput.id !== lastHandledSpriteId.current && partialPixelReport && transparencyReport && colourReport) {
      lastHandledSpriteId.current = spriteInput.id;
      if (partialPixelReport.verdict !== 'success') {
        updateView('partialPixels');
      } else if (transparencyReport.semiTransparentVerdict !== 'success') {
        updateView('semiTransparent');
      } else if (!isIgnoreColouredTransparencyEnabled && transparencyReport.colouredTransparentVerdict !== 'success') {
        updateView('colouredTransparency');
      } else if (colourReport.spriteColourCountVerdict !== 'success') {
        updateView('colourCount');
      } else {
        updateView('colourSimilarity');
      }
    }
  }, [spriteInput, partialPixelReport, transparencyReport, updateView, colourReport, isIgnoreColouredTransparencyEnabled]);

  const closeNavigationMenu = useCallback(() => {
    setIsNavigationMenuOpen(false);
  }, [setIsNavigationMenuOpen]);

  return (
    <>
      <Container>
        <GutteredBox>
          <TopBarMobile
            setIsNavigationMenuOpen={setIsNavigationMenuOpen}
          />
          <ContentBox>
            <Show if={view === 'partialPixels'}>
              <PartialPixelsBox/>
            </Show>
            <Show if={view === 'semiTransparent'}>
              <SemiTransparencyBox/>
            </Show>
            <Show if={view === 'colouredTransparency'}>
              <ColouredTransparencyBox/>
            </Show>
            <Show if={view === 'colourCount'}>
              <ColourCountBox/>
            </Show>
            <Show if={view === 'colourSimilarity'}>
              <ColourSimilarityBox/>
            </Show>
          </ContentBox>
        </GutteredBox>
      </Container>
      <NavigationMenuMobile
        isOpen={isNavigationMenuOpen}
        close={closeNavigationMenu}
        view={view}
        setView={updateView}
      />
      <SpriteImportModal/>
      <SpriteExportModal/>
      <BackgroundModal/>
      <SettingsModal/>
    </>
  );
});
