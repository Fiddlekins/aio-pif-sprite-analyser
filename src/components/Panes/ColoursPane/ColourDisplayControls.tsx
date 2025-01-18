import {ObservableHint, OpaqueObject} from "@legendapp/state";
import {Memo, observer, useObservable} from "@legendapp/state/react";
import {Trans} from "@lingui/react/macro";
import {ColorizeSharp} from "@mui/icons-material";
import {alpha, Box, Button, ButtonProps, Popover, styled, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {MouseEvent} from "react";
import {RgbaColor} from "react-colorful";
import {ui$, uiSettings$} from "../../../state/ui.ts";
import {getCssFromRgbaColor} from "../../../utils/image/conversion/getCssFromRgbaColor.ts";
import {ColourPicker} from "../../ColourPicker/ColourPicker.tsx";
import {ColourSpace} from "../types.ts";

interface StyledButtonProps extends ButtonProps {
  colour?: RgbaColor;
}

const StyledButton = styled(Button, {
  shouldForwardProp(propName: PropertyKey) {
    return propName !== 'colour';
  }
})<StyledButtonProps>(({theme, colour}) => {
  const colourCss = colour ? getCssFromRgbaColor(colour) : undefined;
  return {
    minWidth: '24px',
    width: '24px',
    height: '24px',
    backgroundColor: colourCss,
    outlineColor: alpha(theme.palette.primary.main, 0.54),
    outlineStyle: 'solid',
    outlineWidth: '1px',
    ['&:hover']: {
      outlineColor: alpha(theme.palette.primary.dark, 0.54),
      backgroundColor: (colour && colourCss) ? alpha(colourCss, colour.a * 0.8) : undefined,
    }
  };
});

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

export const ColourDisplayControls = observer(function ColourDisplayControls() {
  const state$ = useObservable({
    colourPickerAnchorEl: null as OpaqueObject<HTMLButtonElement> | null,
    onHighlightColourButtonClick: (event: MouseEvent<HTMLButtonElement>) => {
      state$.colourPickerAnchorEl.set(ObservableHint.opaque(event.currentTarget));
    },
    onHighlightColourSelectorClose: () => {
      state$.colourPickerAnchorEl.set(null);
    }
  });

  return (
    <Memo>
      {() => {
        const isMobile = ui$.isMobile.get();
        const highlightMode = uiSettings$.highlightMode.get();
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
              onChange={(_event: MouseEvent<HTMLElement>, highlightModeNew: string | null) => {
                if (highlightModeNew) {
                  uiSettings$.highlightMode.set(highlightModeNew);
                }
              }}
            >
              <ToggleButton value="monotone">
                <Box
                  display={'flex'}
                  gap={1}
                >
                  <Trans>
                    Monotone
                  </Trans>
                  <Memo>
                    {() => {
                      return (
                        <StyledButton
                          colour={uiSettings$.highlightColour.get()}
                          component={'div'}
                          onClick={state$.onHighlightColourButtonClick}
                        >
                          <ColorizeSharp color={'action'}/>
                        </StyledButton>
                      );
                    }}
                  </Memo>
                  <Memo>
                    {() => {
                      const colourPickerAnchorEl = state$.colourPickerAnchorEl.get() as HTMLButtonElement | null;
                      return (
                        <Popover
                          open={Boolean(colourPickerAnchorEl)}
                          anchorEl={colourPickerAnchorEl}
                          onClose={state$.onHighlightColourSelectorClose}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                          }}
                        >
                          <Box
                            p={1}
                          >
                            <ColourPicker
                              colour$={uiSettings$.highlightColour}
                              presetColours={pickerPresetColours}
                            />
                          </Box>
                        </Popover>
                      );
                    }}
                  </Memo>
                </Box>
              </ToggleButton>
              <ToggleButton value="negative">
                <Trans>
                  Negative
                </Trans>
              </ToggleButton>
              <ToggleButton value="rotate">
                <Trans>
                  Rotate
                </Trans>
              </ToggleButton>
            </ToggleButtonGroup>
            <Memo>
              {() => {
                return (
                  <ToggleButtonGroup
                    value={uiSettings$.colourSpace.get()}
                    exclusive
                    color="primary"
                    size={ui$.isMobile.get() ? 'small' : 'medium'}
                    onChange={(_event: MouseEvent<HTMLElement>, colourSpaceNew: ColourSpace | null) => {
                      if (colourSpaceNew) {
                        uiSettings$.colourSpace.set(colourSpaceNew);
                      }
                    }}
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
                );
              }}
            </Memo>
            <Memo>
              {() => {
                return (
                  <Button
                    variant={'outlined'}
                    onClick={() => ui$.highlight.clearColoursFromCurrent()}
                  >
                    <Trans>
                      Clear Highlights
                    </Trans>
                  </Button>
                );
              }}
            </Memo>
          </Box>
        );
      }}
    </Memo>
  );
});
