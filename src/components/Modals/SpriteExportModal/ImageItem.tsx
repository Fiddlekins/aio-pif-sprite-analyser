import {Trans} from "@lingui/react/macro";
import {ContentCopySharp, DownloadSharp} from "@mui/icons-material";
import {Alert, Box, Button, Typography} from "@mui/material";
import {Fragment, useCallback, useEffect, useRef} from "react";
import {PngInfo} from "../../../utils/image/getDecodedPng.ts";
import {PngInfoSummary} from "../../PngInfo/PngInfoSummary.tsx";
import {PngInfoTooltip} from "../../PngInfo/PngInfoTooltip.tsx";
import {StyledTooltip} from "../../StyledTooltip.tsx";

export interface Image {
  imageData: ImageData;
  pngData: Uint8Array;
  pngBlob: Blob;
  info: PngInfo;
  filename: string;
  indexedFailed: boolean;
  alertIndexedFailure: boolean;
  canCopy: boolean;
}

export interface ImageItemProps {
  image: Image;
}

export function ImageItem(
  {
    image,
  }: ImageItemProps
) {
  const {imageData, pngBlob, info, filename, indexedFailed, alertIndexedFailure, canCopy} = image;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && imageData) {
      const ctx = canvas.getContext('2d', {colorSpace: 'srgb'});
      if (ctx) {
        ctx.putImageData(imageData, 0, 0);
      }
    }
  }, [canvasRef, imageData]);

  // The browser re-encode images when written to clipboard which ultimately defeats the point
  // Copying is only permitted for images that aren't important (namely the background)
  const onCopy = useCallback(() => {
    const htmlContent = `<img src="invalid-url/${filename}">`;
    const htmlBlob = new Blob([htmlContent], {type: 'text/html'});
    navigator.clipboard.write([
      new ClipboardItem({
        "image/png": pngBlob,
        "text/html": htmlBlob,
      }),
    ])
      .catch(console.error);
  }, [pngBlob, filename]);

  const onDownload = useCallback(() => {
    const a = document.createElement("a");
    const url = window.URL.createObjectURL(pngBlob);
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }, [filename, pngBlob]);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <canvas
        ref={canvasRef}
        width={imageData.width}
        height={imageData.height}
        style={{width: 260, height: 260, pointerEvents: canCopy ? 'initial' : 'none'}}
      />
      <Box
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        gap={0.5}
      >
        <PngInfoSummary pngInfo={info}/>
        <PngInfoTooltip pngInfo={info}/>
      </Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={1}
      >
        {canCopy ? (
          <Button onClick={onCopy}>
            <ContentCopySharp/>
          </Button>
        ) : (
          <StyledTooltip
            title={(
              <Fragment>
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'left'}
                  gap={0.5}
                >
                  <Typography variant={'h6'}>
                    <Trans>
                      Copying is disabled
                    </Trans>
                  </Typography>
                  <Typography variant={'body2'}>
                    <Trans>
                      Browsers re-encode images when they are copied to the clipboard, in order to prevent malicious
                      websites from exploiting applications the browser may paste into.
                    </Trans>
                  </Typography>
                  <Typography variant={'body2'}>
                    <Trans>
                      This re-encoding produces bloated PNG images and ignores indexed mode, making this export process
                      pointless.
                    </Trans>
                  </Typography>
                  <Typography variant={'body2'}>
                    <Trans>
                      Downloading images does not suffer from this issue.
                    </Trans>
                  </Typography>
                </Box>
              </Fragment>
            )}
            placement={'top'}
            arrow
          >
            <Box>
              <Button disabled={true}>
                <ContentCopySharp/>
              </Button>
            </Box>
          </StyledTooltip>
        )}
        <Button onClick={onDownload}>
          <DownloadSharp/>
        </Button>
      </Box>
      {alertIndexedFailure && indexedFailed && (
        <Alert severity={'error'}>
          <Trans>
            Unable to encode in indexed mode due to colour count exceeding 256.
          </Trans>
        </Alert>
      )}
    </Box>
  );
}
