import {Observable, ObservableHint, OpaqueObject} from "@legendapp/state";
import {Memo, observer, useObservable, useObserveEffect} from "@legendapp/state/react";
import {Trans} from "@lingui/react/macro";
import {SettingsSharp, TuneSharp} from "@mui/icons-material";
import {alpha, Box, BoxProps, Button, ButtonProps, Popover, styled, Typography} from "@mui/material";
import {MouseEvent, ReactNode, useCallback, useMemo, useRef} from "react";
import {RgbaColor} from "react-colorful";
import {
  background$,
  backgroundSettings$,
  battlerBackgroundId,
  defaultBackgroundSolidFills
} from "../../state/background.ts";
import {ui$} from "../../state/ui.ts";
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
  transition: 'background-color 0s',
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
  onClick: (id: string) => void;
  children?: ReactNode;
}

function BackgroundOption(
  {
    id,
    selected,
    colour,
    onClick,
    children,
  }: BackgroundOptionProps
) {
  return (
    <StyledButton
      selected={selected}
      colour={colour}
      variant={'outlined'}
      onClick={() => {
        onClick(id);
      }}
    >
      {children}
    </StyledButton>
  );
}

interface CustomBackgroundOptionProps {
  id: string;
  selected: boolean;
  colour$: Observable<RgbaColor>;
  onClick: (id: string) => void;
}

const CustomBackgroundOption = observer(function CustomBackgroundOption(
  {
    id,
    selected,
    colour$,
    onClick,
  }: CustomBackgroundOptionProps
) {
  // const anchorRef = useRef(null);
  // const [colourPickerAnchorEl, setColourPickerAnchorEl] = useState<HTMLButtonElement | null>(null);
  //
  // const onSettingsButtonClick = useCallback(() => {
  //   setColourPickerAnchorEl(anchorRef.current);
  // }, [setColourPickerAnchorEl]);
  //
  // const onSettingsClose = useCallback(() => {
  //   setColourPickerAnchorEl(null);
  // }, [setColourPickerAnchorEl]);

  const state$ = useObservable({
    colourPickerAnchorEl: null as OpaqueObject<HTMLDivElement> | null,
    onClick: (event: MouseEvent<HTMLDivElement>) => {
      state$.colourPickerAnchorEl.set(ObservableHint.opaque(event.currentTarget));
    },
    onClose: () => {
      state$.colourPickerAnchorEl.set(null);
    }
  });

  return (
    <StyledButton
      // ref={anchorRef}
      selected={selected}
      colour={colour$.get()}
      variant={'outlined'}
      onClick={() => {
        onClick(id);
      }}
    >
      {/*  return (*/}
      {/*    <div style={{*/}
      {/*      position: 'absolute',*/}
      {/*      width: '100%',*/}
      {/*      height: '100%',*/}
      {/*      borderRadius: '3px',*/}
      {/*      backgroundColor: getCssFromRgbaColor(colour$.get())*/}
      {/*    }}/>*/}
      {/*  );*/}
      <Memo>{() => {
        const colourPickerAnchorEl = (state$.colourPickerAnchorEl.get() || null) as HTMLDivElement | null;
        return (
          <>
            <Button
              component={'div'}
              onClick={state$.onClick}
              sx={{position: 'absolute', minWidth: 0, width: '25%', height: '25%', top: 0, right: 0, padding: '1%'}}
            >
              <SettingsSharp sx={{width: '100%'}}/>
            </Button>
            <Popover
              open={Boolean(colourPickerAnchorEl)}
              anchorEl={colourPickerAnchorEl}
              onClose={state$.onClose}
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
                <ColourPicker
                  colour$={colour$}
                />
                <Button
                  variant={'outlined'}
                  onClick={() => {
                    colour$.delete();
                  }}
                >
                  <Trans>
                    Remove
                  </Trans>
                </Button>
              </Box>
            </Popover>
          </>
        );
      }}</Memo>
    </StyledButton>
  );
});

export const BackgroundPane = observer(function BackgroundPane() {
  const isMobile = ui$.isMobile.get();
  const backgroundId = backgroundSettings$.backgroundId.get();
  const backgroundSolidFills = background$.backgroundSolidFills.get();

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

  useObserveEffect(() => {
    const backgroundCanvas = backgroundCanvasRef.current;
    const battlerSceneBackgroundImageData = background$.battlerSceneBackgroundImageData.get();
    if (backgroundCanvas && battlerSceneBackgroundImageData) {
      const ctx = backgroundCanvas.getContext('2d');
      if (ctx) {
        ctx.putImageData(battlerSceneBackgroundImageData, 0, 0);
      }
    }
  });

  const onSettingsClick = useCallback(() => {
    ui$.isBackgroundModalOpen.set(true);
  }, []);

  const onOptionClick = useCallback((optionId: string) => {
    backgroundSettings$.backgroundId.set(optionId);
  }, []);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'stretch'}
      gap={1}
      minHeight={'150px'}
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
          <Trans>
            Background
          </Trans>
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
          defaultBackgroundSolidFills.map(({id, fill}) => {
            return (
              <BackgroundOption
                key={id}
                selected={id === backgroundId}
                id={id}
                colour={fill}
                onClick={onOptionClick}
              />
            );
          })
        }
        {
          backgroundSettings$.customBackgroundFills.map((fill$, index) => {
            if (isMobile && index >= 7 - defaultBackgroundSolidFills.length) {
              return null;
            }
            const id = `custom_${index}`;
            return (
              <CustomBackgroundOption
                key={id}
                selected={id === backgroundId}
                id={id}
                colour$={fill$}
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
              backgroundSettings$.customBackgroundFills.push({r: 0, g: 0, b: 0, a: 1});
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
});
