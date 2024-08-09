import {ColorizeSharp} from "@mui/icons-material";
import {alpha, Box, Button, ButtonProps, Popover, styled, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {MouseEvent, useCallback, useContext, useState} from "react";
import {RgbaColor} from "react-colorful";
import {AnalysisContext} from "../../../contexts/AnalysisContext.tsx";
import {SettingsContext} from "../../../contexts/SettingsContext.tsx";
import {getCssFromRgbaColor} from "../../../utils/image/conversion/getCssFromRgbaColor.ts";
import {ColourPicker} from "../../ColourPicker/ColourPicker.tsx";
import {ColourSpace} from "../types.ts";

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

export function ColourDisplayControls() {
  const {isMobile} = useContext(SettingsContext);
  const {
    dispatchHighlightedColourState,
    highlightMode,
    setHighlightMode,
    highlightColour,
    setHighlightColour,
    colourSpace,
    setColourSpace
  } = useContext(AnalysisContext);
  const [colourPickerAnchorEl, setColourPickerAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleColourSpaceChange = useCallback((
    _event: MouseEvent<HTMLElement>,
    colourSpaceNew: ColourSpace | null,
  ) => {
    if (colourSpaceNew) {
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
      flexDirection={'row'}
      flexWrap={'wrap'}
      gap={isMobile ? 1 : 2}
    >
      <ToggleButtonGroup
        value={highlightMode}
        exclusive
        color="primary"
        size={isMobile ? 'small' : 'medium'}
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
      <ToggleButtonGroup
        value={colourSpace}
        exclusive
        color="primary"
        size={isMobile ? 'small' : 'medium'}
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
      <Button
        variant={'outlined'}
        onClick={onClearHighlights}
      >
        Clear Highlights
      </Button>
    </Box>
  );
}
