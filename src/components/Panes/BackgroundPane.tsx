import {TuneSharp} from "@mui/icons-material";
import {alpha, Box, Button, ButtonProps, styled, Typography} from "@mui/material";
import {ReactNode, useCallback, useContext, useEffect, useMemo, useRef} from "react";
import {BackgroundContext, battlerBackgroundId} from "../../contexts/BackgroundContext.tsx";
import {getCssFromPixel} from "../../utils/image/conversion/getCssFromPixel.ts";
import {Pixel} from "../../utils/image/types.ts";
import {StyledIconButton} from "../StyledIconButton.tsx";

interface StyledButtonProps extends ButtonProps {
  selected: boolean;
  colour: Pixel | null;
}

const StyledButton = styled(Button)<StyledButtonProps>(({theme, selected, colour}) => ({
  minWidth: 0,
  aspectRatio: 1,
  backgroundColor: colour ? getCssFromPixel(colour) : undefined,
  outlineColor: alpha(theme.palette.primary.main, 0.54),
  outlineStyle: 'solid',
  outlineWidth: selected ? '2px' : '0px',
  ['&:hover']: {
    outlineColor: alpha(theme.palette.primary.dark, 0.54),
    backgroundColor: colour ? alpha(getCssFromPixel(colour), (colour[3] / 255) * 0.8) : undefined,
  }
}));

interface BackgroundOptionProps {
  id: string;
  selected: boolean;
  colour: Pixel | null;
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

export function BackgroundPane() {
  const {
    backgroundId,
    backgroundSolidFills,
    setBackgroundId,
    battlerSceneBackgroundImageData,
    setIsBackgroundModalOpen,
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
      gap={2}
      px={4}
    >
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap={2}
      >
        <Typography variant={'h5'} align={'left'}>
          Background
        </Typography>
        <StyledIconButton variant={'outlined'} onClick={onSettingsClick}>
          <TuneSharp/>
        </StyledIconButton>
      </Box>
      <Box
        display={'grid'}
        gridTemplateColumns={'1fr 1fr 1fr 1fr'}
        gap={2}
      >
        {
          backgroundSolidFills.map(({id, fill}) => {
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
