import {linked, Observable} from "@legendapp/state";
import {Computed, Memo, observer, Show, useObservable} from "@legendapp/state/react";
import {alpha, Box, BoxProps, Button, ButtonProps, styled} from "@mui/material";
import {RgbaColor, RgbaColorPicker} from "react-colorful";
import {getCssFromRgbaColor} from "../../utils/image/conversion/getCssFromRgbaColor.ts";
import {IntegerInput} from "../IntegerInput.tsx";
import './ColourPicker.css';

interface StyledBoxProps extends BoxProps {
  colour: RgbaColor;
}

const StyledBox = styled(Box, {
  shouldForwardProp(propName: PropertyKey) {
    return propName !== 'colour';
  }
})<StyledBoxProps>(({colour}) => ({
  height: '24px',
  width: '24px',
  minWidth: '24px',
  backgroundColor: getCssFromRgbaColor(colour),
  border: '1px solid rgba(0 0 0 / 20%)',
  position: 'absolute',
  right: '0',
  bottom: '0',
}));

interface StyledButtonProps extends ButtonProps {
  colour: RgbaColor | null;
}

const StyledButton = styled(Button, {
  shouldForwardProp(propName: PropertyKey) {
    return propName !== 'colour' && propName !== 'selected';
  }
})<StyledButtonProps>(({theme, colour}) => ({
  minWidth: 0,
  aspectRatio: 1,
  backgroundColor: colour ? getCssFromRgbaColor(colour) : undefined,
  outlineWidth: '1px',
  outlineColor: alpha(theme.palette.primary.main, 0.54),
  outlineStyle: 'solid',
  ['&:hover']: {
    outlineColor: alpha(theme.palette.primary.dark, 0.54),
    backgroundColor: colour ? alpha(getCssFromRgbaColor(colour), colour.a * 0.8) : undefined,
  }
}));

export interface ColourPickerProps {
  colour$: Observable<RgbaColor>;
  presetColours?: RgbaColor[];
}

export const ColourPicker = observer(function ColourPicker(
  {
    colour$,
    presetColours = [],
  }: ColourPickerProps
) {
  const alphaPercent$ = useObservable(linked({
    get: () => {
      return Math.round(colour$.a.get() * 100);
    },
    set: ({value}) => {
      colour$.a.set(value / 100);
    },
  }));
  return (
    <Box
      className={'colour-picker'}
      display={'flex'}
      flexDirection={'column'}
      gap={1}
    >
      <Box
        display={'flex'}
        flexDirection={'row'}
        gap={1}
      >
        <Box position={'relative'}>
          <Memo>
            {() => {
              const {r, g, b, a} = colour$.get();
              const colour = {r, g, b, a};
              return (
                <>
                  <RgbaColorPicker
                    color={colour}
                    onChange={(colourNew) => {
                      colour$.assign(colourNew);
                    }}
                  />
                  <StyledBox colour={colour}/>
                </>
              )
            }}
          </Memo>
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'space-between'}
          gap={1}
          width={'100px'}
        >
          <Memo>
            {() => {
              return (
                <IntegerInput
                  label={'R'}
                  value$={colour$.r}
                  showArrowControls
                  min={0}
                  max={255}
                />
              );
            }}
          </Memo>
          <Memo>
            {() => {
              return (
                <IntegerInput
                  label={'G'}
                  value$={colour$.g}
                  showArrowControls
                  min={0}
                  max={255}
                />
              );
            }}
          </Memo>
          <Memo>
            {() => {
              return (
                <IntegerInput
                  label={'B'}
                  value$={colour$.b}
                  showArrowControls
                  min={0}
                  max={255}
                />
              );
            }}
          </Memo>
          <Memo>
            {() => {
              return (
                <IntegerInput
                  label={'A'}
                  value$={alphaPercent$}
                  showArrowControls
                  min={0}
                  max={100}
                />
              );
            }}
          </Memo>
        </Box>
      </Box>
      <Computed>
        {() => {
          return (
            <Show if={presetColours.length > 0}>
              <Box
                display={'flex'}
                flexDirection={'row'}
                gap={1}
              >
                {presetColours.map((colour) => {
                  return (
                    <StyledButton
                      key={getCssFromRgbaColor(colour)}
                      colour={colour}
                      onClick={() => {
                        colour$.assign(colour);
                      }}
                    />
                  );
                })}
              </Box>
            </Show>
          );
        }}
      </Computed>
    </Box>
  )
});
