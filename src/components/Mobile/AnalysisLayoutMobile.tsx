import {Box, BoxProps, Paper, PaperProps, styled} from "@mui/material";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {AnalysisContext} from "../../contexts/AnalysisContext.tsx";
import {SettingsContext} from "../../contexts/SettingsContext.tsx";
import {BackgroundModal} from "../Modals/BackgroundModal.tsx";
import {SettingsModal} from "../Modals/SettingsModal.tsx";
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

export function AnalysisLayoutMobile() {
  const {
    spriteInput,
    partialPixelReport,
    transparencyReport,
    colourReport,
  } = useContext(AnalysisContext);
  const {
    ignoreColouredTransparencyEnabled,
  } = useContext(SettingsContext);

  const lastHandledSpriteId = useRef('');
  const [isNavigationMenuOpen, setIsNavigationMenuOpen] = useState(true);
  const [view, setView] = useState<string>('');

  useEffect(() => {
    // Use a ref to store the last sprite ID that was handled
    // This avoids updating the tab index whenever the reports are regenerated until spriteInput itself changes
    if (spriteInput && spriteInput.id !== lastHandledSpriteId.current && partialPixelReport && transparencyReport && colourReport) {
      lastHandledSpriteId.current = spriteInput.id;
      if (partialPixelReport.verdict !== 'success') {
        setView('partialPixels');
      } else if (transparencyReport.semiTransparentVerdict !== 'success') {
        setView('semiTransparent');
      } else if (!ignoreColouredTransparencyEnabled && transparencyReport.colouredTransparentVerdict !== 'success') {
        setView('colouredTransparency');
      } else if (colourReport.spriteColourCountVerdict !== 'success') {
        setView('colourCount');
      } else {
        setView('colourSimilarity');
      }
    }
  }, [spriteInput, partialPixelReport, transparencyReport, setView, colourReport, ignoreColouredTransparencyEnabled]);

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
            {view === 'partialPixels' && (<PartialPixelsBox/>)}
            {view === 'semiTransparent' && (<SemiTransparencyBox/>)}
            {view === 'colouredTransparency' && (<ColouredTransparencyBox/>)}
            {view === 'colourCount' && (<ColourCountBox/>)}
            {view === 'colourSimilarity' && (<ColourSimilarityBox/>)}
          </ContentBox>
        </GutteredBox>
      </Container>
      <NavigationMenuMobile
        isOpen={isNavigationMenuOpen}
        close={closeNavigationMenu}
        view={view}
        setView={setView}
      />
      <SpriteImportModal/>
      <SpriteExportModal/>
      <BackgroundModal/>
      <SettingsModal/>
    </>
  );
}
