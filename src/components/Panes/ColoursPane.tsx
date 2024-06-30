import {ColorizeSharp} from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  ButtonProps,
  Paper,
  Popover,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import {MouseEvent, useCallback, useContext, useState} from "react";
import {RgbaColor} from "react-colorful";
import {AnalysisContext} from "../../contexts/AnalysisContext.tsx";
import {getCssFromRgbaColor} from "../../utils/image/conversion/getCssFromRgbaColor.ts";
import {retrieveTyped} from "../../utils/localStorage/retrieveTyped.ts";
import {storeString} from "../../utils/localStorage/storeString.ts";
import {ColourPicker} from "../ColourPicker/ColourPicker.tsx";
import {ColoursTable} from "../Tables/ColoursTable.tsx";
import {SimilarityTable} from "../Tables/SimilarityTable.tsx";
import {VerdictIcon} from "../VerdictIcon.tsx";
import {ColourSpace} from "./types.ts";

interface StyledButtonProps extends ButtonProps {
  colour: RgbaColor | null;
}

const StyledButton = styled(Button)<StyledButtonProps>(({theme, colour}) => ({
  minWidth: '24px',
  width: '24px',
  height: '24px',
  backgroundColor: colour ? getCssFromRgbaColor(colour) : undefined,
  outlineColor: alpha(theme.palette.primary.main, 0.54),
  outlineStyle: 'solid',
  outlineWidth: '1px',
  ['&:hover']: {
    outlineColor: alpha(theme.palette.primary.dark, 0.54),
    backgroundColor: colour ? alpha(getCssFromRgbaColor(colour), colour.a * 0.8) : undefined,
  }
}));

const pickerPresetColours: RgbaColor[] = [
  {r: 255, g: 0, b: 0, a: 1},
  {r: 255, g: 115, b: 0, a: 1},
  {r: 255, g: 234, b: 0, a: 1},
  {r: 0, g: 255, b: 0, a: 1},
  {r: 0, g: 0, b: 255, a: 1},
  {r: 94, g: 0, b: 255, a: 1},
  {r: 255, g: 0, b: 255, a: 1},
  {r: 0, g: 0, b: 0, a: 0},
];

function getStoredColourSpace() {
  return retrieveTyped<ColourSpace>('ColoursTable.colourSpace', (value: string | null) => {
    switch (value) {
      case 'RGB':
      case 'HSV':
      case 'HSL':
        return value;
      default:
        return 'RGB';
    }
  });
}

export function ColoursPane() {
  const {
    colourReport,
    dispatchHighlightedColourState,
    highlightMode,
    setHighlightMode,
    highlightColour,
    setHighlightColour,
  } = useContext(AnalysisContext);

  const [colourSpace, setColourSpace] = useState<ColourSpace>(getStoredColourSpace());
  const [colourPickerAnchorEl, setColourPickerAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleColourSpaceChange = useCallback((
    _event: MouseEvent<HTMLElement>,
    colourSpaceNew: ColourSpace | null,
  ) => {
    if (colourSpaceNew) {
      storeString('ColoursTable.colourSpace', colourSpaceNew);
      setColourSpace(colourSpaceNew);
    }
  }, [setColourSpace])

  const handleHighlightStyleChange = useCallback((
    _event: MouseEvent<HTMLElement>,
    highlightModeNew: string | null,
  ) => {
    if (highlightModeNew) {
      setHighlightMode(highlightModeNew);
    }
  }, [setHighlightMode])

  const onClearHighlights = useCallback(() => {
    dispatchHighlightedColourState({operation: 'reset'});
  }, [dispatchHighlightedColourState]);

  const onHighlightColourButtonClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    setColourPickerAnchorEl(event.currentTarget);
  }, [setColourPickerAnchorEl]);

  const onHighlightColourSelectorClose = useCallback(() => {
    setColourPickerAnchorEl(null);
  }, [setColourPickerAnchorEl]);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      sx={{overflowY: 'auto'}}
      p={4}
    >
      <Paper>
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={2}
          p={2}
        >
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
            <VerdictIcon verdict={colourReport?.analysis.getColourCountVerdict() || null}/>
            <Typography variant={'h5'}>
              {`Colour Count: ${colourReport?.analysis.coloursCount || 0}`}
            </Typography>
          </Box>
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
            <VerdictIcon verdict={colourReport?.analysis.getColourSimilarityVerdict() || null}/>
            <Typography variant={'h5'}>
              {colourReport?.analysis.similaritySkipped !== true
                ? `Pairs of similar colours: ${colourReport?.analysis.similarColourPairMap.size || 0}`
                : 'Skipped due to colour count exceeding 256'
              }
            </Typography>
          </Box>
        </Box>
      </Paper>
      <Paper>
        <Box
          display={'flex'}
          flexDirection={'row'}
          gap={2}
          p={2}
        >
          <ToggleButtonGroup
            value={colourSpace}
            exclusive
            color="primary"
            onChange={handleColourSpaceChange}
          >
            <ToggleButton value="RGB">
              RGB
            </ToggleButton>
            <ToggleButton value="HSV">
              HSV
            </ToggleButton>
            <ToggleButton value="HSL">
              HSL
            </ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup
            value={highlightMode}
            exclusive
            color="primary"
            onChange={handleHighlightStyleChange}
          >
            <ToggleButton value="monotone">
              <Box
                display={'flex'}
                gap={1}
              >
                Monotone
                <StyledButton
                  colour={highlightColour}
                  component={'div'}
                  onClick={onHighlightColourButtonClick}
                >
                  <ColorizeSharp color={'action'}/>
                </StyledButton>
                <Popover
                  open={Boolean(colourPickerAnchorEl)}
                  anchorEl={colourPickerAnchorEl}
                  onClose={onHighlightColourSelectorClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <Box
                    p={1}
                  >
                    <ColourPicker
                      colour={highlightColour}
                      onColourChange={setHighlightColour}
                      presetColours={pickerPresetColours}
                    />
                  </Box>
                </Popover>
              </Box>
            </ToggleButton>
            <ToggleButton value="negative">
              Negative
            </ToggleButton>
            <ToggleButton value="rotate">
              Rotate
            </ToggleButton>
          </ToggleButtonGroup>
          <Button
            variant={'outlined'}
            onClick={onClearHighlights}
          >
            Clear Highlights
          </Button>
        </Box>
      </Paper>
      <ColoursTable colourSpace={colourSpace}/>
      <SimilarityTable/>
    </Box>
  )
}
