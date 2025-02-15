import {useObserveEffect} from "@legendapp/state/react";
import {Box, styled} from "@mui/material";
import {MutableRefObject, useRef} from "react";
import {background$} from "../state/background.ts";

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
  const backgroundCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useObserveEffect(() => {
    const backgroundCanvas = backgroundCanvasRef.current;
    const backgroundImageData = background$.backgroundImageData.get();
    if (backgroundCanvas && backgroundImageData) {
      const ctx = backgroundCanvas.getContext('2d', {colorSpace: 'srgb'});
      if (ctx) {
        ctx.putImageData(backgroundImageData, 0, 0);
      }
    }
  });

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
