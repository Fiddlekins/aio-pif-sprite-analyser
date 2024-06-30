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
  outlineColor: alpha(theme.palette.primary.main, 0.54),
  outlineStyle: 'solid',
  ['&:hover']: {
    outlineColor: alpha(theme.palette.primary.dark, 0.54),
    backgroundColor: colour ? alpha(getCssFromRgbaColor(colour), colour.a * 0.8) : undefined,
  }
}));

export interface ColourPickerProps {
  colour: RgbaColor;
  onColourChange: (colourNew: RgbaColor) => void;
  presetColours?: RgbaColor[];
}

export function ColourPicker(
  {
    colour,
    onColourChange,
    presetColours,
  }: ColourPickerProps
) {

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
          <RgbaColorPicker
            color={colour}
            onChange={onColourChange}
          />
          <StyledBox colour={colour}/>
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'space-between'}
          gap={1}
          width={'100px'}
        >
          <IntegerInput
            label={'R'}
            value={colour.r}
            showArrowControls
            min={0}
            max={255}
            onValueChange={(valueNew) => {
              const colourNew = {...colour, r: valueNew};
              onColourChange(colourNew);
            }}
          />
          <IntegerInput
            label={'G'}
            value={colour.g}
            showArrowControls
            min={0}
            max={255}
            onValueChange={(valueNew) => {
              const colourNew = {...colour, g: valueNew};
              onColourChange(colourNew);
            }}
          />
          <IntegerInput
            label={'B'}
            value={colour.b}
            showArrowControls
            min={0}
            max={255}
            onValueChange={(valueNew) => {
              const colourNew = {...colour, b: valueNew};
              onColourChange(colourNew);
            }}
          />
          <IntegerInput
            label={'A'}
            value={Math.round(colour.a * 100)}
            showArrowControls
            min={0}
            max={100}
            onValueChange={(valueNew) => {
              const colourNew = {...colour, a: valueNew / 100};
              onColourChange(colourNew);
            }}
          />
        </Box>
      </Box>
      {presetColours && (
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
                  onColourChange(colour);
                }}
              />
            );
          })}
        </Box>
      )}
    </Box>
  )
}
