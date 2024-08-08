import {ContentCopySharp, DownloadSharp} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonProps,
  Tooltip,
  Typography
} from "@mui/material";
import {Fragment, MouseEvent, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {AnalysisContext} from "../../contexts/AnalysisContext.tsx";
import {BackgroundContext} from "../../contexts/BackgroundContext.tsx";
import {getPngInfoSummary} from "../../utils/getPngInfoSummary.ts";
import {getDecodedPng, PngInfo} from "../../utils/image/getDecodedPng.ts";
import {getEncodedPng} from "../../utils/image/getEncodedPng.ts";
import {scaleImageData} from "../../utils/image/manipulation/scaleImageData.ts";
import {retrieveBoolean} from "../../utils/localStorage/retrieveBoolean.ts";
import {storeBoolean} from "../../utils/localStorage/storeBoolean.ts";
import {PngInfoTooltip} from "../PngInfoTooltip.tsx";
import {StyledModal} from "./StyledModal.tsx";

const StyledToggleButton = styled(ToggleButton)<ToggleButtonProps>(() => ({
  textTransform: 'none',
}));

interface Image {
  imageData: ImageData;
  pngData: Uint8Array;
  pngBlob: Blob;
  info: PngInfo;
  filename: string;
  indexedFailed: boolean;
  alertIndexedFailure: boolean;
  canCopy: boolean;
}

interface ImageItemProps {
  image: Image;
}

function ImageItem(
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
  }, [pngBlob]);

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
        style={{width: 250, height: 250, pointerEvents: canCopy ? 'initial' : 'none'}}
      />
      <Box
        display={'flex'}
        flexDirection={'row'}
        alignItems={'center'}
        gap={0.5}
      >
        {getPngInfoSummary(info)}
        <PngInfoTooltip info={info}/>
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
          <Tooltip
            title={(
              <Fragment>
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'left'}
                  gap={0.5}
                >
                  <Typography variant={'h6'}>
                    Copying is disabled
                  </Typography>
                  <Typography variant={'body2'}>
                    {`Browsers re-encode images when they are copied to the clipboard, in order to prevent malicious websites from exploiting applications the browser may paste into.`}
                  </Typography>
                  <Typography variant={'body2'}>
                    {`This re-encoding produces bloated PNG images and ignores indexed mode, making this export process pointless.`}
                  </Typography>
                  <Typography variant={'body2'}>
                    {`Downloading images does not suffer from this issue.`}
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
          </Tooltip>
        )}
        <Button onClick={onDownload}>
          <DownloadSharp/>
        </Button>
      </Box>
      {alertIndexedFailure && indexedFailed && (
        <Alert severity={'error'}>
          Unable to encode in indexed mode due to colour count exceeding 256.
        </Alert>
      )}
    </Box>
  );
}

export function SpriteExportModal() {
  const {isExportModalOpen, setIsExportModalOpen, spriteInput, headId, bodyId} = useContext(AnalysisContext);
  const {backgroundImageData} = useContext(BackgroundContext);
  const [isSize96, setIsSize96] = useState<boolean>(
    retrieveBoolean('SpriteExportModal.isSize96', false)
  );
  const [isIndexed, setIsIndexed] = useState<boolean>(
    retrieveBoolean('SpriteExportModal.isIndexed', false)
  );

  const images: Image[] = useMemo(() => {
    if (spriteInput && backgroundImageData) {
      const spriteInputNameWithoutExtension = spriteInput.name?.replace(/\.png$/i, '') || null;
      const spriteName = headId === null || bodyId === null ? spriteInputNameWithoutExtension || 'sprite' : `${headId}.${bodyId}`;
      let backgroundName = 'background';
      if (bodyId !== null) {
        backgroundName = `${bodyId}_background`;
      } else if (spriteInputNameWithoutExtension) {
        backgroundName = `${spriteInputNameWithoutExtension}_background`;
      }
      let spriteConfigs;
      if (isSize96) {
        const spriteImageData96 = scaleImageData(spriteInput.imageData, 1 / 3, 1 / 3);
        const backgroundImageData96 = scaleImageData(backgroundImageData, 1 / 3, 1 / 3);
        spriteConfigs = [
          {
            imageDataInput: spriteImageData96,
            alertIndexedFailure: true,
            canCopy: false,
            filename: `${spriteName}_96.png`,
            filenameIndexed: `${spriteName}_96_indexed.png`
          },
          {
            imageDataInput: backgroundImageData96,
            alertIndexedFailure: false,
            canCopy: true,
            filename: `${backgroundName}_96.png`,
            filenameIndexed: `${backgroundName}_96_indexed.png`
          },
        ];
      } else {
        const spriteImageData288 = spriteInput.imageData;
        const backgroundImageData288 = backgroundImageData;
        spriteConfigs = [
          {
            imageDataInput: spriteImageData288,
            alertIndexedFailure: true,
            canCopy: false,
            filename: `${spriteName}.png`,
            filenameIndexed: `${spriteName}_indexed.png`
          },
          {
            imageDataInput: backgroundImageData288,
            alertIndexedFailure: false,
            canCopy: true,
            filename: `${backgroundName}.png`,
            filenameIndexed: `${backgroundName}_indexed.png`
          },
        ];
      }
      return spriteConfigs.map(({imageDataInput, filename, filenameIndexed, alertIndexedFailure, canCopy}) => {
        const pngData = getEncodedPng(imageDataInput, {indexed: isIndexed});
        const pngBlob = new Blob([pngData], {type: 'image/png'});
        const {info, imageData} = getDecodedPng(pngData);
        const isOutputIndexed = info.colourType === 3;
        return {
          imageData,
          pngData,
          pngBlob,
          info,
          filename: isOutputIndexed ? filenameIndexed : filename,
          indexedFailed: isIndexed ? !isOutputIndexed : false,
          alertIndexedFailure,
          canCopy,
        };
      })
    }
    return [];
  }, [spriteInput, backgroundImageData, isSize96, isIndexed]);

  const handleClose = useCallback(() => {
    setIsExportModalOpen(false);
  }, [setIsExportModalOpen]);

  const handleSizeModeChange = useCallback((
    _event: MouseEvent<HTMLElement>,
    sizeModeNew: string | null,
  ) => {
    if (sizeModeNew) {
      const isSize96New = sizeModeNew === '96';
      setIsSize96(isSize96New);
      storeBoolean('SpriteExportModal.isSize96', isSize96New);
    }
  }, [setIsSize96]);

  const handleIndexedModeChange = useCallback((
    _event: MouseEvent<HTMLElement>,
    indexedModeNew: string | null,
  ) => {
    if (indexedModeNew) {
      const isIndexedNew = indexedModeNew === 'indexed';
      setIsIndexed(isIndexedNew);
      storeBoolean('SpriteExportModal.isIndexed', isIndexedNew);
    }
  }, [setIsIndexed]);

  return (
    <StyledModal
      title={'Export Sprite'}
      open={isExportModalOpen}
      handleClose={handleClose}
    >
      <Typography variant={'body1'}>
        {`Export sprites in a variety of formats.`}
      </Typography>
      <Box
        display={'flex'}
        flexDirection={'row'}
        alignItems={'flex-end'}
        gap={2}
      >
        <ToggleButtonGroup
          value={isSize96 ? '96' : '288'}
          exclusive
          color="primary"
          onChange={handleSizeModeChange}
        >
          <StyledToggleButton value="288">
            288x288
          </StyledToggleButton>
          <StyledToggleButton value="96">
            96x96
          </StyledToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={isIndexed ? 'indexed' : 'normal'}
          exclusive
          color="primary"
          onChange={handleIndexedModeChange}
        >
          <StyledToggleButton value="normal">
            Normal
          </StyledToggleButton>
          <StyledToggleButton value="indexed">
            Indexed
          </StyledToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        gap={2}
      >
        {images.map((image) => {
          return (
            <ImageItem
              key={image.filename}
              image={image}
            />
          )
        })}
      </Box>
    </StyledModal>
  );
}
