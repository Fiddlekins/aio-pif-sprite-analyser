import {observer} from "@legendapp/state/react";
import {Trans, useLingui} from "@lingui/react/macro";
import {Box, Paper, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {MouseEvent, useCallback, useEffect, useRef} from "react";
import {analysis$, analysisSettings$} from "../../../state/analysis.ts";
import {ui$} from "../../../state/ui.ts";
import {percentMedium} from "../../../utils/formatStyles.ts";
import {CanvasWithBackground} from "../../CanvasWithBackground.tsx";
import {VerdictIcon} from "../../VerdictIcon.tsx";

export const PartialPixelsVerdict = observer(function PartialPixelsVerdict() {
  const isMobile = ui$.isMobile.get();
  const partialPixelReport = analysis$.partialPixelReport.get();
  const partialPixelOutputMode = analysisSettings$.partialPixelOutputMode.get();

  const {i18n} = useLingui();

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
      analysisSettings$.partialPixelOutputMode.set(partialPixelOutputModeNew);
    }
  }, []);

  const partialPixelCount = partialPixelReport?.analysis.partialPixelCount || 0;
  const partialPixelFraction = partialPixelCount / (partialPixelReport?.analysis.totalPixelCount || 1);

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
            <Trans>
              Partial Pixel Count: {i18n.number(partialPixelCount)} ({i18n.number(partialPixelFraction, percentMedium)})
            </Trans>
          </Typography>
        </Box>
        <Typography align={'left'}>
          <Trans>
            Each 3x3 square of pixels should be the same colour.
          </Trans>
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
              <Trans>
                Mixed
              </Trans>
            </ToggleButton>
            <ToggleButton value="full">
              <Trans>
                Full
              </Trans>
            </ToggleButton>
          </ToggleButtonGroup>
          <Typography align={'left'}>
            <Trans>
              Pixels highlighted red are colours that do not match the majority colour in their 3x3 square.
            </Trans>
          </Typography>
          {partialPixelOutputMode === 'mixed' && (
            <Typography align={'left'}>
              <Trans>
                Pixels highlighted blue are colours that are the majority colour in their 3x3 square, but still suffer
                from being in a partial pixel.
              </Trans>
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
});
