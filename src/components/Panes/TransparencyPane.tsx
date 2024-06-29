import {Box, Paper, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {MouseEvent, useCallback, useContext, useEffect, useRef} from "react";
import {AnalysisContext} from "../../contexts/AnalysisContext.tsx";
import {getFormattedPercent} from "../../utils/getFormattedPercent.ts";
import {CanvasWithBackground} from "../CanvasWithBackground.tsx";
import {VerdictIcon} from "../VerdictIcon.tsx";

export function TransparencyPane() {
  const {
    transparencyReport,
    semiTransparentOutputMode,
    setSemiTransparentOutputMode,
    colouredTransparencyOutputMode,
    setColouredTransparencyOutputMode,
  } = useContext(AnalysisContext);
  const semiTransparentCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const colouredTransparencyCanvasRef = useRef<HTMLCanvasElement | null>(null);

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
      const colouredTransparencyCanvas = colouredTransparencyCanvasRef.current;
      if (colouredTransparencyCanvas) {
        transparencyReport.analysis.colouredTransparency.imageData;
        const ctx = colouredTransparencyCanvas.getContext('2d');
        if (ctx) {
          ctx.putImageData(transparencyReport.analysis.colouredTransparency.imageData, 0, 0);
        }
      }
    }
  }, [semiTransparentCanvasRef, colouredTransparencyCanvasRef, transparencyReport]);

  const semiTransparentPixelCount = transparencyReport?.analysis.semiTransparent.semiTransparentPixelCount || 0;
  const semiTransparentPixelPercent = getFormattedPercent(
    semiTransparentPixelCount / (transparencyReport?.analysis.totalPixelCount || 1)
  );
  const colouredTransparencyPixelCount = transparencyReport?.analysis.colouredTransparency.colouredTransparentPixelCount || 0;
  const colouredTransparencyPixelPercent = getFormattedPercent(
    colouredTransparencyPixelCount / (transparencyReport?.analysis.totalPixelCount || 1)
  );

  const handleSemiTransparentOutputModeChange = useCallback((
    _event: MouseEvent<HTMLElement>,
    semiTransparentOutputModeNew: string | null,
  ) => {
    if (semiTransparentOutputModeNew) {
      setSemiTransparentOutputMode(semiTransparentOutputModeNew);
    }
  }, [setSemiTransparentOutputMode]);

  const handleColouredTransparencyOutputModeChange = useCallback((
    _event: MouseEvent<HTMLElement>,
    colouredTransparencyOutputModeNew: string | null,
  ) => {
    if (colouredTransparencyOutputModeNew) {
      setColouredTransparencyOutputMode(colouredTransparencyOutputModeNew);
    }
  }, [setColouredTransparencyOutputMode])

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      sx={{overflowY: 'auto'}}
      p={4}
    >
      <Paper>
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'start'}
          gap={2}
          p={2}
        >
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
            flexDirection={'row'}
            alignItems={'start'}
            gap={2}
            p={2}
          >
            <CanvasWithBackground canvasRef={semiTransparentCanvasRef}/>
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
        </Box>
      </Paper>
      <Paper>
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'start'}
          gap={2}
          p={2}
        >
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'start'}
            gap={2}
            p={2}
          >
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
              <VerdictIcon verdict={colouredTransparencyPixelCount > 0 ? 'error' : 'success'}/>
              <Typography variant={'h5'} align={'left'}>
                {`Coloured Transparent Pixel Count: ${colouredTransparencyPixelCount} (${colouredTransparencyPixelPercent})`}
              </Typography>
            </Box>
            <Typography align={'left'}>
              {'These are pixels that are fully transparent (the alpha channel = 0) but contain colour data instead of being invisible black.'}
            </Typography>
            <Typography align={'left'}>
              {'They do not cause any visual problems normally, but some software will behave differently due to their presence, so it is best to remove them.'}
            </Typography>
            <Typography align={'left'}>
              {'They are caused by specific software not enforcing that full transparency is transparent black.'}
            </Typography>
          </Box>
          <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'start'}
            gap={2}
            p={2}
          >
            <CanvasWithBackground canvasRef={colouredTransparencyCanvasRef}/>
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'start'}
              gap={2}
            >
              <ToggleButtonGroup
                value={colouredTransparencyOutputMode}
                exclusive
                color="primary"
                onChange={handleColouredTransparencyOutputModeChange}
              >
                <ToggleButton value="contrast">
                  Contrast
                </ToggleButton>
                <ToggleButton value="opaqueColour">
                  Opaque Colour
                </ToggleButton>
              </ToggleButtonGroup>
              {colouredTransparencyOutputMode === 'contrast' && (
                <Typography align={'left'}>
                  {'Pixels highlighted green are either transparent black or not fully transparent. Pixels highlighted red are coloured transparent pixels, and should be fixed.'}
                </Typography>
              )}
              {colouredTransparencyOutputMode === 'opaqueColour' && (
                <Typography align={'left'}>
                  {'Coloured transparent pixels are set to be fully opaque, and should be fixed. Valid pixels are left invisible. This mode is more whimsical than it is useful.'}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
