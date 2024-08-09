import {Box, Paper, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {MouseEvent, useCallback, useContext, useEffect, useRef} from "react";
import {AnalysisContext} from "../../../contexts/AnalysisContext.tsx";
import {SettingsContext} from "../../../contexts/SettingsContext.tsx";
import {getFormattedPercent} from "../../../utils/getFormattedPercent.ts";
import {CanvasWithBackground} from "../../CanvasWithBackground.tsx";
import {VerdictIcon} from "../../VerdictIcon.tsx";

export function PartialPixelsBox() {
  const {isMobile} = useContext(SettingsContext);
  const {
    partialPixelReport,
    partialPixelOutputMode,
    setPartialPixelOutputMode,
  } = useContext(AnalysisContext);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && partialPixelReport) {
      const {imageData} = partialPixelReport.analysis;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.putImageData(imageData, 0, 0);
      }
    }
  }, [canvasRef, partialPixelReport]);

  const handlePartialPixelOutputModeChange = useCallback((
    _event: MouseEvent<HTMLElement>,
    partialPixelOutputModeNew: string | null,
  ) => {
    if (partialPixelOutputModeNew) {
      setPartialPixelOutputMode(partialPixelOutputModeNew);
    }
  }, [setPartialPixelOutputMode])

  const partialPixelCount = partialPixelReport?.analysis.partialPixelCount || 0;
  const partialPixelPercent = getFormattedPercent(
    partialPixelCount / (partialPixelReport?.analysis.totalPixelCount || 1)
  );

  return (
    <Paper>
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'start'}
        gap={2}
        p={2}
      >
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
          <VerdictIcon verdict={partialPixelReport?.verdict || null}/>
          <Typography variant={'h5'} align={'left'}>
            {`Partial Pixel Count: ${partialPixelCount} (${partialPixelPercent})`}
          </Typography>
        </Box>
        <Typography align={'left'}>
          {'Each 3x3 square of pixels should be the same colour.'}
        </Typography>
      </Box>
      <Box
        display={'flex'}
        flexDirection={isMobile ? 'column' : 'row'}
        alignItems={'start'}
        gap={2}
        p={2}
      >
        <CanvasWithBackground canvasRef={canvasRef} minSize={288}/>
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'start'}
          gap={2}
        >
          <ToggleButtonGroup
            value={partialPixelOutputMode}
            exclusive
            color="primary"
            onChange={handlePartialPixelOutputModeChange}
          >
            <ToggleButton value="mixed">
              Mixed
            </ToggleButton>
            <ToggleButton value="full">
              Full
            </ToggleButton>
          </ToggleButtonGroup>
          <Typography align={'left'}>
            {'Pixels highlighted red are colours that do not match the majority colour in their 3x3 square.'}
          </Typography>
          {partialPixelOutputMode === 'mixed' && (
            <Typography align={'left'}>
              {'Pixels highlighted blue are colours that are the majority colour in their 3x3 square, but still suffer from being in a partial pixel.'}
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
