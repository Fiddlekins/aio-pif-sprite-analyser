import {Box, styled, Tab, tabClasses, TabProps, Tabs} from "@mui/material";
import {ReactNode, SyntheticEvent, useCallback, useContext, useEffect, useState} from "react";
import {AnalysisContext} from "../../contexts/AnalysisContext.tsx";
import {VerdictIcon} from "../VerdictIcon.tsx";
import {ColoursPane} from "./ColoursPane.tsx";
import {PartialPixelsPane} from "./PartialPixelsPane.tsx";
import {TransparencyPane} from "./TransparencyPane.tsx";

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
  Transparency: 1,
  Colours: 2,
}

export function DetailsPane() {
  const {
    spriteInput,
    partialPixelReport,
    transparencyReport,
    colourReport,
    dispatchHighlightedColourState,
  } = useContext(AnalysisContext);

  const [tabIndex, setTabIndex] = useState(0);

  const updateTabIndex = useCallback((tabIndexNew: number) => {
    setTabIndex(tabIndexNew);
    if (tabIndexNew == TabIndexes.Colours) {
      dispatchHighlightedColourState({operation: 'renderOn'});
    } else {
      dispatchHighlightedColourState({operation: 'renderOff'});
    }
  }, [setTabIndex, dispatchHighlightedColourState])

  const handleChange = useCallback((_event: SyntheticEvent, newValue: number) => {
    updateTabIndex(newValue);
  }, [updateTabIndex]);

  useEffect(() => {
    // Check if current time is sufficiently close to when spriteInput last changed
    // This avoids updating the tab index whenever the reports are regenerated until spriteInput itself changes
    if (Date.now() - (spriteInput?.timestamp || 0) < 100) {
      if (partialPixelReport?.verdict !== 'success') {
        updateTabIndex(TabIndexes.PartialPixels);
      } else if (transparencyReport?.verdict !== 'success') {
        updateTabIndex(TabIndexes.Transparency);
      } else {
        updateTabIndex(TabIndexes.Colours);
      }
    }
  }, [spriteInput, partialPixelReport, transparencyReport, updateTabIndex]);

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
          icon={(<VerdictIcon verdict={transparencyReport?.verdict || null}/>)}
          iconPosition={'start'}
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
        <TabPanel value={tabIndex} index={TabIndexes.Transparency}>
          <TransparencyPane/>
        </TabPanel>
        <TabPanel value={tabIndex} index={TabIndexes.Colours}>
          <ColoursPane/>
        </TabPanel>
      </Box>
    </Box>
  );
}
