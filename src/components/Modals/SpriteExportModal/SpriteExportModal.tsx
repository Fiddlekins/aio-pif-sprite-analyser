import {HelpOutlineSharp} from "@mui/icons-material";
import {
  Box,
  Paper,
  styled,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonProps,
  Tooltip,
  Typography,
} from "@mui/material";
import {ChangeEvent, Fragment, MouseEvent, useCallback, useContext, useMemo, useState} from "react";
import {AnalysisContext} from "../../../contexts/AnalysisContext.tsx";
import {BackgroundContext} from "../../../contexts/BackgroundContext.tsx";
import {getDecodedPng} from "../../../utils/image/getDecodedPng.ts";
import {getEncodedPng} from "../../../utils/image/getEncodedPng.ts";
import {normaliseTransparency} from "../../../utils/image/manipulation/normaliseTransparency.ts";
import {scaleImageData} from "../../../utils/image/manipulation/scaleImageData.ts";
import {retrieveBoolean} from "../../../utils/localStorage/retrieveBoolean.ts";
import {storeBoolean} from "../../../utils/localStorage/storeBoolean.ts";
import {StyledModal} from "../StyledModal.tsx";
import {Image, ImageItem} from './ImageItem.tsx';

const StyledToggleButton = styled(ToggleButton)<ToggleButtonProps>(() => ({
  textTransform: 'none',
}));

export function SpriteExportModal() {
  const {isExportModalOpen, setIsExportModalOpen, spriteInput, headId, bodyId} = useContext(AnalysisContext);
  const {backgroundImageData} = useContext(BackgroundContext);
  const [isSize96, setIsSize96] = useState<boolean>(
    retrieveBoolean('SpriteExportModal.isSize96', false)
  );
  const [isIndexed, setIsIndexed] = useState<boolean>(
    retrieveBoolean('SpriteExportModal.isIndexed', false)
  );
  const [normaliseTransparencyEnabled, setNormaliseTransparencyEnabled] = useState<boolean>(
    retrieveBoolean('SpriteExportModal.normaliseTransparencyEnabled', true)
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
      let spriteImageData288 = spriteInput.imageData;
      const backgroundImageData288 = backgroundImageData;
      if (normaliseTransparencyEnabled) {
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
      });
    }
    return [];
  }, [spriteInput, backgroundImageData, isSize96, isIndexed, normaliseTransparencyEnabled]);

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

  const handleNormaliseTransparencyEnabledChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const normaliseTransparencyEnabledNew = event.target.checked;
    setNormaliseTransparencyEnabled(normaliseTransparencyEnabledNew);
    storeBoolean('SpriteExportModal.normaliseTransparencyEnabled', normaliseTransparencyEnabledNew);
  }, [setNormaliseTransparencyEnabled]);

  return (
    <StyledModal
      title={'Export Sprite'}
      open={isExportModalOpen}
      handleClose={handleClose}
    >
      <Typography variant={'body1'}>
        {`Export sprites in a variety of formats.`}
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
                Normalise Transparency
              </Typography>
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
                        Normalise Transparency
                      </Typography>
                      <Typography variant={'body2'}>
                        {`When enabled, any pixel with 0% opacity will be set to transparent black (a.k.a. "#0000", "rgba(0,0,0,0)", etc).`}
                      </Typography>
                      <Typography variant={'body2'}>
                        {`This changes nothing visually about the image, but reduces the filesize and has better compatibility with some software.`}
                      </Typography>
                      <Typography variant={'body2'}>
                        {`Under normal circumstances this should be left enabled.`}
                      </Typography>
                    </Box>
                  </Fragment>
                )}
                placement={'top'}
                arrow
              >
                <HelpOutlineSharp fontSize={'small'}/>
              </Tooltip>
            </Box>
            <Switch
              checked={normaliseTransparencyEnabled}
              onChange={handleNormaliseTransparencyEnabledChange}
            />
          </Box>
        </Box>
      </Paper>
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
