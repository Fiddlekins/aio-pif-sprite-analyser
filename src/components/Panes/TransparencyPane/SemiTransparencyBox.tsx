import {Box, Paper, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {MouseEvent, useCallback, useContext, useEffect, useRef} from "react";
import {AnalysisContext} from "../../../contexts/AnalysisContext.tsx";
import {SettingsContext} from "../../../contexts/SettingsContext.tsx";
import {getFormattedPercent} from "../../../utils/getFormattedPercent.ts";
import {CanvasWithBackground} from "../../CanvasWithBackground.tsx";
import {VerdictIcon} from "../../VerdictIcon.tsx";

export function SemiTransparencyBox() {
  const {isMobile} = useContext(SettingsContext);
  const {
    transparencyReport,
    semiTransparentOutputMode,
    setSemiTransparentOutputMode,
  } = useContext(AnalysisContext);
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
  const semiTransparentPixelPercent = getFormattedPercent(
    semiTransparentPixelCount / (transparencyReport?.analysis.totalPixelCount || 1)
  );

  const handleSemiTransparentOutputModeChange = useCallback((
    _event: MouseEvent<HTMLElement>,
    semiTransparentOutputModeNew: string | null,
  ) => {
    if (semiTransparentOutputModeNew) {
      setSemiTransparentOutputMode(semiTransparentOutputModeNew);
    }
  }, [setSemiTransparentOutputMode]);

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
            {`Semi-Transparent Pixel Count: ${semiTransparentPixelCount} (${semiTransparentPixelPercent})`}
          </Typography>
        </Box>
        <Typography align={'left'}>
          {'Semi-transparent pixels are neither fully opaque nor fully transparent.'}
        </Typography>
        <Typography align={'left'}>
          {'They are permitted if used intentionally.'}
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
              Monotone
            </ToggleButton>
            <ToggleButton value="range">
              Range
            </ToggleButton>
          </ToggleButtonGroup>
          {semiTransparentOutputMode === 'monotone' && (
            <Typography align={'left'}>
              {'Pixels highlighted green if they are fully opaque or fully transparent. Pixels are highlighted red if they are partially transparent, and may be a mistake.'}
            </Typography>
          )}
          {semiTransparentOutputMode === 'range' && (
            <Typography align={'left'}>
              {'Pixels highlighted green if they are fully opaque or fully transparent. Pixels are highlighted a hue between blue and red if they are partially transparent, where blue represents more transparency and red represents more opaqueness.'}
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
}
