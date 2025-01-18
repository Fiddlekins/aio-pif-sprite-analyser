import {observer} from "@legendapp/state/react";
import {Trans, useLingui} from "@lingui/react/macro";
import {HelpOutlineSharp} from "@mui/icons-material";
import {
  Box,
  Paper,
  styled,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonProps,
  Typography,
} from "@mui/material";
import {ChangeEvent, Fragment, MouseEvent, useCallback, useMemo} from "react";
import {analysis$} from "../../../state/analysis.ts";
import {background$} from "../../../state/background.ts";
import {exportSettings$} from "../../../state/export.ts";
import {settings$} from "../../../state/settings.ts";
import {ui$} from "../../../state/ui.ts";
import {getDecodedPng} from "../../../utils/image/getDecodedPng.ts";
import {getEncodedPng} from "../../../utils/image/getEncodedPng.ts";
import {normaliseTransparency} from "../../../utils/image/manipulation/normaliseTransparency.ts";
import {scaleImageData} from "../../../utils/image/manipulation/scaleImageData.ts";
import {StyledTooltip} from "../../StyledTooltip.tsx";
import {StyledModal} from "../StyledModal.tsx";
import {Image, ImageItem} from './ImageItem.tsx';

const StyledToggleButton = styled(ToggleButton)<ToggleButtonProps>(() => ({
  textTransform: 'none',
}));

const exportDimensions = [
  {width: 288, height: 288},
  {width: 96, height: 96},
];

export const SpriteExportModal = observer(function SpriteExportModal() {
  const isExportModalOpen = ui$.isExportModalOpen.get();
  const isExportCopyingEnabled = settings$.isExportCopyingEnabled.get();
  const spriteInput = analysis$.spriteInput.get();
  const headId = analysis$.headId.get();
  const bodyId = analysis$.bodyId.get();
  const backgroundImageData = background$.backgroundImageData.get();
  const isSize96 = exportSettings$.isSize96.get();
  const isIndexed = exportSettings$.isIndexed.get();
  const isNormaliseTransparencyEnabled = exportSettings$.isNormaliseTransparencyEnabled.get();

  const {t} = useLingui();

  const images: Image[] = useMemo(() => {
    if (!isExportModalOpen) {
      return [];
    }
    if (spriteInput && backgroundImageData) {
      const spriteInputNameWithoutExtension = spriteInput.name?.replace(/\.png$/i, '') || null;
      const spriteName = headId === undefined || bodyId === undefined ? spriteInputNameWithoutExtension || 'sprite' : `${headId}.${bodyId}`;
      let backgroundName = 'background';
      if (bodyId !== null) {
        backgroundName = `${bodyId}_background`;
      } else if (spriteInputNameWithoutExtension) {
        backgroundName = `${spriteInputNameWithoutExtension}_background`;
      }
      let spriteConfigs;
      let spriteImageData288 = spriteInput.imageData as ImageData;
      const backgroundImageData288 = backgroundImageData;
      if (isNormaliseTransparencyEnabled) {
        spriteImageData288 = normaliseTransparency(spriteImageData288);
        // backgroundImageData288 = normaliseTransparency(backgroundImageData288);
      }
      if (isSize96) {
        const spriteImageData96 = scaleImageData(spriteImageData288, 1 / 3, 1 / 3);
        const backgroundImageData96 = scaleImageData(backgroundImageData288, 1 / 3, 1 / 3);
        spriteConfigs = [
          {
            imageDataInput: spriteImageData96,
            alertIndexedFailure: true,
            canCopy: isExportCopyingEnabled,
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
        spriteConfigs = [
          {
            imageDataInput: spriteImageData288,
            alertIndexedFailure: true,
            canCopy: isExportCopyingEnabled,
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
      });
    }
    return [];
  }, [isExportModalOpen, isExportCopyingEnabled, spriteInput, backgroundImageData, headId, bodyId, isNormaliseTransparencyEnabled, isSize96, isIndexed]);

  const handleClose = useCallback(() => {
    ui$.isExportModalOpen.set(false);
  }, []);

  const handleSizeModeChange = useCallback((
    _event: MouseEvent<HTMLElement>,
    sizeModeNew: string | null,
  ) => {
    if (sizeModeNew) {
      const isSize96New = sizeModeNew === '96';
      exportSettings$.isSize96.set(isSize96New);
    }
  }, []);

  const handleIndexedModeChange = useCallback((
    _event: MouseEvent<HTMLElement>,
    indexedModeNew: string | null,
  ) => {
    if (indexedModeNew) {
      const isIndexedNew = indexedModeNew === 'indexed';
      exportSettings$.isIndexed.set(isIndexedNew);
    }
  }, []);

  const handleIsNormaliseTransparencyEnabledChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const isNormaliseTransparencyEnabledNew = event.target.checked;
    exportSettings$.isNormaliseTransparencyEnabled.set(isNormaliseTransparencyEnabledNew);
  }, []);

  return (
    <StyledModal
      title={t`Export Sprite`}
      open={isExportModalOpen}
      handleClose={handleClose}
    >
      <Typography variant={'body1'}>
        <Trans>
          Export sprites in a variety of formats.
        </Trans>
      </Typography>
      <Paper>
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={2}
          p={2}
        >
          <Box
            display={'flex'}
            flexDirection={'row'}
            flexWrap={'wrap'}
            alignItems={'flex-end'}
            gap={2}
          >
            <ToggleButtonGroup
              value={isSize96 ? '96' : '288'}
              exclusive
              color="primary"
              onChange={handleSizeModeChange}
            >
              {
                exportDimensions.map(({width, height}) => {
                  return (
                    <StyledToggleButton
                      key={`${width}x${height}`}
                      value={`${width}`}
                    >
                      <Trans>
                        {width}x{height}
                      </Trans>
                    </StyledToggleButton>
                  );
                })
              }
            </ToggleButtonGroup>
            <ToggleButtonGroup
              value={isIndexed ? 'indexed' : 'normal'}
              exclusive
              color="primary"
              onChange={handleIndexedModeChange}
            >
              <StyledToggleButton value="normal">
                <Trans>
                  Normal
                </Trans>
              </StyledToggleButton>
              <StyledToggleButton value="indexed">
                <Trans>
                  Indexed
                </Trans>
              </StyledToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            gap={1}
          >
            <Box
              display={'flex'}
              flexDirection={'row'}
              alignItems={'center'}
              gap={0.5}
            >
              <Typography>
                <Trans>
                  Normalise Transparency
                </Trans>
              </Typography>
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
                          Normalise Transparency
                        </Trans>
                      </Typography>
                      <Typography variant={'body2'}>
                        <Trans>
                          When enabled, any pixel with 0% opacity will be set to transparent black (a.k.a. "#0000",
                          "rgba(0,0,0,0)", etc).
                        </Trans>
                      </Typography>
                      <Typography variant={'body2'}>
                        <Trans>
                          This changes nothing visually about the image, but reduces the filesize and has better
                          compatibility with some software.
                        </Trans>
                      </Typography>
                      <Typography variant={'body2'}>
                        <Trans>
                          Under normal circumstances this should be left enabled.
                        </Trans>
                      </Typography>
                    </Box>
                  </Fragment>
                )}
                placement={'top'}
                arrow
              >
                <HelpOutlineSharp fontSize={'small'}/>
              </StyledTooltip>
            </Box>
            <Switch
              checked={isNormaliseTransparencyEnabled}
              onChange={handleIsNormaliseTransparencyEnabledChange}
            />
          </Box>
        </Box>
      </Paper>
      <Box
        display={'flex'}
        flexDirection={'row'}
        flexWrap={'wrap'}
        justifyContent={'space-evenly'}
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
});
