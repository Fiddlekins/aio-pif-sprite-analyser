import {Box, Paper, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {MouseEvent, useCallback, useContext, useEffect, useRef} from "react";
import {AnalysisContext} from "../../../contexts/AnalysisContext.tsx";
import {SettingsContext} from "../../../contexts/SettingsContext.tsx";
import {getFormattedPercent} from "../../../utils/getFormattedPercent.ts";
import {CanvasWithBackground} from "../../CanvasWithBackground.tsx";
import {VerdictIcon} from "../../VerdictIcon.tsx";

export function ColouredTransparencyBox() {
  const {isMobile} = useContext(SettingsContext);
  const {
    transparencyReport,
    colouredTransparencyOutputMode,
    setColouredTransparencyOutputMode,
  } = useContext(AnalysisContext);
  const colouredTransparencyCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (transparencyReport) {
      const colouredTransparencyCanvas = colouredTransparencyCanvasRef.current;
      if (colouredTransparencyCanvas) {
        transparencyReport.analysis.colouredTransparency.imageData;
        const ctx = colouredTransparencyCanvas.getContext('2d');
        if (ctx) {
          ctx.putImageData(transparencyReport.analysis.colouredTransparency.imageData, 0, 0);
        }
      }
    }
  }, [colouredTransparencyCanvasRef, transparencyReport]);

  const colouredTransparencyPixelCount = transparencyReport?.analysis.colouredTransparency.colouredTransparentPixelCount || 0;
  const colouredTransparencyPixelPercent = getFormattedPercent(
    colouredTransparencyPixelCount / (transparencyReport?.analysis.totalPixelCount || 1)
  );

  const handleColouredTransparencyOutputModeChange = useCallback((
    _event: MouseEvent<HTMLElement>,
    colouredTransparencyOutputModeNew: string | null,
  ) => {
    if (colouredTransparencyOutputModeNew) {
      setColouredTransparencyOutputMode(colouredTransparencyOutputModeNew);
    }
  }, [setColouredTransparencyOutputMode])

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
        flexDirection={isMobile ? 'column' : 'row'}
        alignItems={'start'}
        gap={2}
        p={2}
      >
        <CanvasWithBackground canvasRef={colouredTransparencyCanvasRef} minSize={288}/>
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
    </Paper>
  );
}
