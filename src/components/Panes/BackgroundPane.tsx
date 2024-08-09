import {SettingsSharp, TuneSharp} from "@mui/icons-material";
import {alpha, Box, BoxProps, Button, ButtonProps, Popover, styled, Typography} from "@mui/material";
import {ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {RgbaColor} from "react-colorful";
import {BackgroundContext, battlerBackgroundId} from "../../contexts/BackgroundContext.tsx";
import {SettingsContext} from "../../contexts/SettingsContext.tsx";
import {getCssFromRgbaColor} from "../../utils/image/conversion/getCssFromRgbaColor.ts";
import {ColourPicker} from "../ColourPicker/ColourPicker.tsx";
import {StyledIconButton} from "../StyledIconButton.tsx";

interface StyledButtonProps extends ButtonProps {
  selected: boolean;
  colour: RgbaColor | null;
}

const StyledButton = styled(Button, {
  shouldForwardProp(propName: PropertyKey) {
    return propName !== 'colour' && propName !== 'selected';
  }
})<StyledButtonProps>(({theme, selected, colour}) => ({
  minWidth: 0,
  aspectRatio: 1,
  backgroundColor: colour ? getCssFromRgbaColor(colour) : undefined,
  outlineColor: alpha(theme.palette.primary.main, 0.54),
  outlineStyle: 'solid',
  outlineWidth: selected ? '2px' : '0px',
  ['&:hover']: {
    outlineColor: alpha(theme.palette.primary.dark, 0.54),
    backgroundColor: colour ? alpha(getCssFromRgbaColor(colour), colour.a * 0.8) : undefined,
  }
}));

const StyledBox = styled(Box)<BoxProps>(({theme}) => ({
  backgroundColor: theme.palette.background.paper,
  zIndex: 1,
}));

interface BackgroundOptionProps {
  id: string;
  selected: boolean;
  colour: RgbaColor | null;
  custom?: boolean;
  onClick: (id: string) => void;
  update?: (colourNew: RgbaColor) => void;
  remove?: () => void;
  children?: ReactNode;
}

function BackgroundOption(
  {
    id,
    selected,
    colour,
    custom,
    onClick,
    update,
    remove,
    children,
  }: BackgroundOptionProps
) {
  const anchorRef = useRef(null);
  const [colourPickerAnchorEl, setColourPickerAnchorEl] = useState<HTMLButtonElement | null>(null);


  const onSettingsButtonClick = useCallback(() => {
    setColourPickerAnchorEl(anchorRef.current);
  }, [setColourPickerAnchorEl]);

  const onSettingsClose = useCallback(() => {
    setColourPickerAnchorEl(null);
  }, [setColourPickerAnchorEl]);

  const onColourChange = useCallback((colourNew: RgbaColor) => {
    update?.(colourNew);
  }, [update]);

  return (
    <StyledButton
      ref={anchorRef}
      selected={selected}
      colour={colour}
      variant={'outlined'}
      onClick={() => {
        onClick(id);
      }}
    >
      {children}
      {custom && (
        <>
          <Button
            component={'div'}
            onClick={onSettingsButtonClick}
            sx={{position: 'absolute', minWidth: 0, width: '25%', height: '25%', top: 0, right: 0, padding: '1%'}}
          >
            <SettingsSharp sx={{width: '100%'}}/>
          </Button>
          <Popover
            open={Boolean(colourPickerAnchorEl)}
            anchorEl={colourPickerAnchorEl}
            onClose={onSettingsClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Box
              display={'flex'}
              flexDirection={'column'}
              gap={1}
              p={1}
            >
              {colour && (
                <ColourPicker
                  colour={colour}
                  onColourChange={onColourChange}
                />
              )}
              <Button
                variant={'outlined'}
                onClick={remove}
              >
                Remove
              </Button>
            </Box>
          </Popover>
        </>
      )}
    </StyledButton>
  );
}

export function BackgroundPane() {
  const {isMobile} = useContext(SettingsContext);
  const {
    backgroundId,
    backgroundSolidFills,
    setBackgroundId,
    battlerSceneBackgroundImageData,
    setIsBackgroundModalOpen,
    dispatchCustomBackgroundFills,
  } = useContext(BackgroundContext);
  const backgroundCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const canvas = useMemo(() => {
    return (
      <canvas
        ref={backgroundCanvasRef}
        width={288}
        height={288}
        style={{position: 'absolute', width: '100%', height: '100%', borderRadius: '3px'}}
      />
    );
  }, [backgroundCanvasRef]);

  useEffect(() => {
    const backgroundCanvas = backgroundCanvasRef.current;
    if (backgroundCanvas && battlerSceneBackgroundImageData) {
      const ctx = backgroundCanvas.getContext('2d');
      if (ctx) {
        ctx.putImageData(battlerSceneBackgroundImageData, 0, 0);
      }
    }
  }, [backgroundCanvasRef, battlerSceneBackgroundImageData]);

  const onSettingsClick = useCallback(() => {
    setIsBackgroundModalOpen(true);
  }, [setIsBackgroundModalOpen]);

  const onOptionClick = useCallback((optionId: string) => {
    setBackgroundId(optionId);
  }, [setBackgroundId]);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'stretch'}
      gap={1}
      sx={{overflowY: isMobile ? 'visible' : 'auto'}}
    >
      <StyledBox
        position={'sticky'}
        top={0}
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap={2}
        px={isMobile ? 0 : 4}
        pb={1}
      >
        <Typography variant={'h5'} align={'left'}>
          Background
        </Typography>
        <StyledIconButton variant={'outlined'} onClick={onSettingsClick}>
          <TuneSharp/>
        </StyledIconButton>
      </StyledBox>
      <Box
        display={'grid'}
        gridTemplateColumns={'1fr 1fr 1fr 1fr'}
        gap={2}
        px={isMobile ? 0 : 4}
        pb={'2px'}
      >
        {
          backgroundSolidFills.slice(0, isMobile ? 7 : undefined).map(({id, fill, custom}) => {
            return (
              <BackgroundOption
                key={id}
                selected={id === backgroundId}
                id={id}
                colour={fill}
                custom={custom}
                update={(colourNew: RgbaColor) => {
                  dispatchCustomBackgroundFills({operation: 'update', backgroundId: id, colour: colourNew});
                }}
                remove={() => {
                  dispatchCustomBackgroundFills({operation: 'remove', backgroundId: id});
                }}
                onClick={onOptionClick}
              />
            );
          })
        }
        {!(isMobile && backgroundSolidFills.length >= 7) && (
          <StyledButton
            selected={false}
            colour={{r: 0, g: 0, b: 0, a: 0}}
            variant={'outlined'}
            onClick={() => {
              dispatchCustomBackgroundFills({operation: 'add', colour: {r: 0, g: 0, b: 0, a: 1}})
            }}
          >
            <Typography variant={'h5'}>
              +
            </Typography>
          </StyledButton>
        )}
        <BackgroundOption
          key={battlerBackgroundId}
          selected={backgroundId === battlerBackgroundId}
          id={battlerBackgroundId}
          colour={null}
          onClick={onOptionClick}
        >
          {canvas}
        </BackgroundOption>
      </Box>
    </Box>
  );
}
