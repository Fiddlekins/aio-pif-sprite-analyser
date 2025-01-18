import {observer} from "@legendapp/state/react";
import {Trans, useLingui} from "@lingui/react/macro";
import {Box, Paper, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {MouseEvent, useCallback, useEffect, useRef} from "react";
import {analysis$, analysisSettings$} from "../../../state/analysis.ts";
import {ui$} from "../../../state/ui.ts";
import {percentMedium} from "../../../utils/formatStyles.ts";
import {CanvasWithBackground} from "../../CanvasWithBackground.tsx";
import {VerdictIcon} from "../../VerdictIcon.tsx";

export const SemiTransparencyVerdict = observer(function SemiTransparencyVerdict() {
  const isMobile = ui$.isMobile.get();
  const transparencyReport = analysis$.transparencyReport.get();
  const semiTransparentOutputMode = analysisSettings$.semiTransparentOutputMode.get();

  const {i18n} = useLingui();

  const semiTransparentCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (transparencyReport) {
      const semiTransparentCanvas = semiTransparentCanvasRef.current;
      if (semiTransparentCanvas) {
        transparencyReport.analysis.colouredTransparency.imageData;
        const ctx = semiTransparentCanvas.getContext('2d');
        if (ctx) {
          ctx.putImageData(transparencyReport.analysis.semiTransparent.imageData, 0, 0);
        }
      }
    }
  }, [semiTransparentCanvasRef, transparencyReport]);

  const semiTransparentPixelCount = transparencyReport?.analysis.semiTransparent.semiTransparentPixelCount || 0;
  const semiTransparentPixelFraction = semiTransparentPixelCount / (transparencyReport?.analysis.totalPixelCount || 1);

  const handleSemiTransparentOutputModeChange = useCallback((
    _event: MouseEvent<HTMLElement>,
    semiTransparentOutputModeNew: string | null,
  ) => {
    if (semiTransparentOutputModeNew) {
      analysisSettings$.semiTransparentOutputMode.set(semiTransparentOutputModeNew);
    }
  }, []);

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
          <VerdictIcon verdict={semiTransparentPixelCount > 0 ? 'warning' : 'success'}/>
          <Typography variant={'h5'} align={'left'}>
            <Trans>
              Semi-Transparent Pixel
              Count: {i18n.number(semiTransparentPixelCount)} ({i18n.number(semiTransparentPixelFraction, percentMedium)})
            </Trans>
          </Typography>
        </Box>
        <Typography align={'left'}>
          <Trans>
            Semi-transparent pixels are neither fully opaque nor fully transparent.
          </Trans>
        </Typography>
        <Typography align={'left'}>
          <Trans>
            They are permitted if used intentionally.
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
        <CanvasWithBackground canvasRef={semiTransparentCanvasRef} minSize={288}/>
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'start'}
          gap={2}
        >
          <ToggleButtonGroup
            value={semiTransparentOutputMode}
            exclusive
            color="primary"
            onChange={handleSemiTransparentOutputModeChange}
          >
            <ToggleButton value="monotone">
              <Trans>
                Monotone
              </Trans>
            </ToggleButton>
            <ToggleButton value="range">
              <Trans>
                Range
              </Trans>
            </ToggleButton>
          </ToggleButtonGroup>
          {semiTransparentOutputMode === 'monotone' && (
            <Typography align={'left'}>
              <Trans>
                Pixels highlighted green if they are fully opaque or fully transparent. Pixels are highlighted red if
                they are partially transparent, and may be a mistake.
              </Trans>
            </Typography>
          )}
          {semiTransparentOutputMode === 'range' && (
            <Typography align={'left'}>
              <Trans>
                Pixels highlighted green if they are fully opaque or fully transparent. Pixels are highlighted a hue
                between blue and red if they are partially transparent, where blue represents more transparency and red
                represents more opaqueness.
              </Trans>
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
});
