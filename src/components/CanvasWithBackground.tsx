import {Box, styled} from "@mui/material";
import {MutableRefObject, useContext, useEffect, useRef} from "react";
import {BackgroundContext} from "../contexts/BackgroundContext.tsx";

export const TopCanvas = styled("canvas")(({theme}) => ({
  position: 'absolute',
  left: 0,
  outlineWidth: '1px',
  outlineStyle: 'solid',
  outlineColor: theme.palette.action.disabled,
}));

export interface CanvasWithBackgroundProps {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
}

export function CanvasWithBackground(
  {
    canvasRef,
  }: CanvasWithBackgroundProps
) {
  const {backgroundImageData} = useContext(BackgroundContext);
  const backgroundCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const backgroundCanvas = backgroundCanvasRef.current;
    if (backgroundCanvas && backgroundImageData) {
      const ctx = backgroundCanvas.getContext('2d', {colorSpace: 'srgb'});
      if (ctx) {
        ctx.putImageData(backgroundImageData, 0, 0);
      }
    }
  }, [backgroundCanvasRef, backgroundImageData]);

  return (
    <Box position={'relative'}>
      <canvas ref={backgroundCanvasRef} width={288} height={288}/>
      <TopCanvas ref={canvasRef} width={288} height={288}/>
    </Box>
  );
}
