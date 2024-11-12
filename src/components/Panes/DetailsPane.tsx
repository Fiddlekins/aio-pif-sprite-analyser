import {observer} from "@legendapp/state/react";
import {Box, styled, Tab, tabClasses, TabProps, Tabs} from "@mui/material";
import {ReactNode, SyntheticEvent, useCallback, useEffect, useRef, useState} from "react";
import {analysis$} from "../../state/analysis.ts";
import {settings$} from "../../state/settings.ts";
import {ui$} from "../../state/ui.ts";
import {VerdictIcon} from "../VerdictIcon.tsx";
import {ColouredTransparencyPane} from "./ColouredTransparencyPane/ColouredTransparencyPane.tsx";
import {ColoursPane} from "./ColoursPane/ColoursPane.tsx";
import {PartialPixelsPane} from "./PartialPixelsPane/PartialPixelsPane.tsx";
import {TransparencyPane} from "./TransparencyPane/TransparencyPane.tsx";

interface TabPanelProps {
  index: number;
  value: number;
  children?: ReactNode;
}

function TabPanel({value, index, children}: TabPanelProps) {
  return (
    <Box>
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </Box>
  );
}

const StyledTab = styled(Tab)<TabProps>(() => ({
  height: '48px',
  minHeight: '48px',
  [`&.${tabClasses.fullWidth}`]: {
    gap: '8px',
  },
}));

const TabIndexes = {
  PartialPixels: 0,
  SemiTransparency: 1,
  ColouredTransparency: 2,
  Colours: 3,
}

export const DetailsPane = observer(function DetailsPane() {
  const spriteInput = analysis$.spriteInput.get();
  const partialPixelReport = analysis$.partialPixelReport.get();
  const transparencyReport = analysis$.transparencyReport.get();
  const colourReport = analysis$.colourReport.get();
  const isIgnoreColouredTransparencyEnabled = settings$.isIgnoreColouredTransparencyEnabled.get();

  const lastHandledSpriteId = useRef('');
  const [tabIndex, setTabIndex] = useState(0);

  const updateTabIndex = useCallback((tabIndexNew: number) => {
    switch (tabIndexNew) {
      case TabIndexes.ColouredTransparency:
        ui$.highlight.currentView.set('backgroundColours');
        break;
      case TabIndexes.Colours:
        ui$.highlight.currentView.set('spriteColours');
        break;
      default:
        ui$.highlight.currentView.set('disabled');
    }
    setTabIndex(tabIndexNew);
  }, [setTabIndex]);

  const handleChange = useCallback((_event: SyntheticEvent, newValue: number) => {
    updateTabIndex(newValue);
  }, [updateTabIndex]);

  useEffect(() => {
    // Use a ref to store the last sprite ID that was handled
    // This avoids updating the tab index whenever the reports are regenerated until spriteInput itself changes
    if (spriteInput && spriteInput.id !== lastHandledSpriteId.current) {
      lastHandledSpriteId.current = spriteInput.id;
      if (partialPixelReport?.verdict !== 'success') {
        updateTabIndex(TabIndexes.PartialPixels);
      } else if (transparencyReport?.semiTransparentVerdict !== 'success') {
        updateTabIndex(TabIndexes.SemiTransparency);
      } else if (!isIgnoreColouredTransparencyEnabled && transparencyReport?.colouredTransparentVerdict !== 'success') {
        updateTabIndex(TabIndexes.ColouredTransparency);
      } else {
        updateTabIndex(TabIndexes.Colours);
      }
    }
  }, [spriteInput, partialPixelReport, transparencyReport, updateTabIndex, isIgnoreColouredTransparencyEnabled]);

  return (
    <Box
      height={'100%'}
      display={'flex'}
      flexDirection={'column'}
    >
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        variant="fullWidth"
        sx={{boxShadow: 2, zIndex: 1}}
      >
        <StyledTab
          label="Partial Pixels"
          icon={(<VerdictIcon verdict={partialPixelReport?.verdict || null}/>)}
          iconPosition={'start'}
        />
        <StyledTab
          label="Transparency"
          icon={(<VerdictIcon verdict={transparencyReport?.semiTransparentVerdict || null}/>)}
          iconPosition={'start'}
        />
        <StyledTab
          label="Background"
          icon={(<VerdictIcon verdict={transparencyReport?.colouredTransparentVerdict || null}/>)}
          iconPosition={'start'}
          sx={{opacity: isIgnoreColouredTransparencyEnabled ? 0.5 : 1}}
        />
        <StyledTab
          label="Colours"
          icon={(<VerdictIcon verdict={colourReport?.verdict || null}/>)}
          iconPosition={'start'}
        />
      </Tabs>
      <Box sx={{overflowY: 'auto'}}>
        <TabPanel value={tabIndex} index={TabIndexes.PartialPixels}>
          <PartialPixelsPane/>
        </TabPanel>
        <TabPanel value={tabIndex} index={TabIndexes.SemiTransparency}>
          <TransparencyPane/>
        </TabPanel>
        <TabPanel value={tabIndex} index={TabIndexes.ColouredTransparency}>
          <ColouredTransparencyPane/>
        </TabPanel>
        <TabPanel value={tabIndex} index={TabIndexes.Colours}>
          <ColoursPane/>
        </TabPanel>
      </Box>
    </Box>
  );
});
