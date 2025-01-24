import {observer} from "@legendapp/state/react";
import {Trans} from "@lingui/react/macro";
import {Box, Paper, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {MouseEvent, useCallback, useEffect, useRef} from "react";
import {analysis$, analysisSettings$} from "../../../state/analysis.ts";
import {ui$} from "../../../state/ui.ts";
import {CanvasWithBackground} from "../../CanvasWithBackground.tsx";
import {FormatNumber} from "../../Formatters/FormatNumber.tsx";
import {FormatPercent} from "../../Formatters/FormatPercent.tsx";
import {VerdictIcon} from "../../VerdictIcon.tsx";

export const ColouredTransparencyVerdict = observer(function ColouredTransparencyVerdict() {
  const isMobile = ui$.isMobile.get();
  const transparencyReport = analysis$.transparencyReport.get();
  const colouredTransparencyOutputMode = analysisSettings$.colouredTransparencyOutputMode.get();
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
  const colouredTransparencyPixelFraction = colouredTransparencyPixelCount / (transparencyReport?.analysis.totalPixelCount || 1);

  const handleColouredTransparencyOutputModeChange = useCallback((
    _event: MouseEvent<HTMLElement>,
    colouredTransparencyOutputModeNew: string | null,
  ) => {
    if (colouredTransparencyOutputModeNew) {
      analysisSettings$.colouredTransparencyOutputMode.set(colouredTransparencyOutputModeNew);
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
          <VerdictIcon verdict={transparencyReport?.colouredTransparentVerdict || null}/>
          <Typography variant={'h5'} align={'left'}>
            <Trans>
              Coloured Transparent Pixel
              Count: {
              <FormatNumber value={colouredTransparencyPixelCount}/>
            } ({
              <FormatPercent value={colouredTransparencyPixelFraction}/>
            })
            </Trans>
          </Typography>
        </Box>
        <Typography align={'left'}>
          <Trans>
            These are pixels that are fully transparent (the alpha channel = 0) but contain colour data instead of being
            invisible black.
          </Trans>
        </Typography>
        <Typography align={'left'}>
          <Trans>
            They do not cause any visual problems normally, but some software will behave differently due to their
            presence, so it is best to remove them.
          </Trans>
        </Typography>
        <Typography align={'left'}>
          <Trans>
            They are caused by specific software not enforcing that full transparency is transparent black.
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
              <Trans>
                Contrast
              </Trans>
            </ToggleButton>
            <ToggleButton value="opaqueColour">
              <Trans>
                Opaque Colour
              </Trans>
            </ToggleButton>
          </ToggleButtonGroup>
          {colouredTransparencyOutputMode === 'contrast' && (
            <Typography align={'left'}>
              <Trans>
                Pixels highlighted green are either transparent black or not fully transparent. Pixels highlighted red
                are coloured transparent pixels, and should be fixed.
              </Trans>
            </Typography>
          )}
          {colouredTransparencyOutputMode === 'opaqueColour' && (
            <Typography align={'left'}>
              <Trans>
                Coloured transparent pixels are set to be fully opaque, and should be fixed. Valid pixels are left
                invisible. This mode is more whimsical than it is useful.
              </Trans>
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
});
