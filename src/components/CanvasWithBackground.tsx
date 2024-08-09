import {Box, styled} from "@mui/material";
import {MutableRefObject, useContext, useEffect, useRef} from "react";
import {BackgroundContext} from "../contexts/BackgroundContext.tsx";

interface TopCanvasProps {
  canCopy?: boolean;
}

export const TopCanvas = styled("canvas", {
  shouldForwardProp(propName: PropertyKey) {
    return propName !== 'canCopy';
  }
})<TopCanvasProps>(({theme, canCopy}) => ({
  position: 'absolute',
  left: 0,
  outlineWidth: '1px',
  outlineStyle: 'solid',
  outlineColor: theme.palette.action.disabled,
  pointerEvents: canCopy === false ? 'none' : 'initial',
  width: '100%',
  maxWidth: '288px',
}));

export interface CanvasWithBackgroundProps {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  canCopy?: boolean;
  minSize?: number;
}

export function CanvasWithBackground(
  {
    canvasRef,
    canCopy,
    minSize,
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
    <Box display={'inline-flex'} position={'relative'} minHeight={0} sx={{aspectRatio: 1}}>
      <canvas
        ref={backgroundCanvasRef}
        width={288}
        height={288}
        style={{
          pointerEvents: 'none',
          width: '100%',
          minWidth: `${minSize}px`,
          maxWidth: '288px',
        }}/>
      <TopCanvas ref={canvasRef} width={288} height={288} canCopy={canCopy}/>
    </Box>
  );
}
