import {ContentPasteGoSharp} from "@mui/icons-material";
import {Alert, Box, BoxProps, Button, CircularProgress, styled, Typography} from "@mui/material";
import {ChannelOrder, PngDecoder, TypedArray} from "image-in-browser";
import {useCallback, useContext, useEffect, useState} from "react";
import {useDropzone} from 'react-dropzone';
import {AnalysisContext} from "../../contexts/AnalysisContext.tsx";
import {getId} from "../../utils/getId.ts";
import {upscaleImageData} from "../../utils/image/upscaleImageData.ts";
import {parseName} from "../../utils/parseName.ts";
import {StyledModal} from "./StyledModal.tsx";

const DropBox = styled(Box)<BoxProps>(({theme}) => ({
  cursor: 'pointer',
  borderWidth: '2px',
  borderStyle: 'dashed',
  borderColor: theme.palette.action.disabled,
  textAlign: 'center',
  '&:hover': {
    borderColor: theme.palette.action.active,
  },
}));

const ProgressContainer = styled(Box)<BoxProps>(() => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const canvas = document.createElement('canvas');
canvas.width = 288;
canvas.height = 288;
const context = canvas.getContext('2d', {willReadFrequently: true, colorSpace: 'srgb'});
const acceptedDimensions = [
  {width: 96, height: 96, upscale: 3},
  {width: 288, height: 288, upscale: 1},
];
const acceptedDimensionsStrings = acceptedDimensions.map(({width, height}) => {
  return `${width}x${height}`
});
const acceptedDimensionsText = `${acceptedDimensionsStrings.slice(0, -1).join(', ')} or ${acceptedDimensionsStrings[acceptedDimensionsStrings.length - 1]}`;

export function SpriteImportModal() {
  const {isImportModalOpen, setIsImportModalOpen, setSpriteInput, setHeadId, setBodyId} = useContext(AnalysisContext);
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const importImage = useCallback(async (data: TypedArray, name: string | null, sourceUrl: string | null) => {
    const dataUint8 = new Uint8Array(data);
    const decoder = new PngDecoder();
    const image = decoder.decode({
      bytes: dataUint8,
    });
    if (image) {
      const pngInfo = {
        colourType: decoder.info.colorType || 0,
        bitsPerChannel: decoder.info.bits,
        channelCount: image.numChannels,
        fileSize: data.length,
        width: image.width,
        height: image.height,
      };
      for (const {width, height, upscale} of acceptedDimensions) {
        if (image.width === width && image.height === height) {
          if (context) {
            let imageData = context.createImageData(image.width, image.height, {colorSpace: 'srgb'});
            const rawBytes = image.getBytes({
              order: ChannelOrder.rgba,
            });
            if (image.palette) {
              for (let pixelIndex = 0; pixelIndex < rawBytes.length; pixelIndex++) {
                const paletteIndex = rawBytes[pixelIndex];
                const offset = pixelIndex * 4;
                imageData.data[offset] = image.palette.get(paletteIndex, 0);
                imageData.data[offset + 1] = image.palette.get(paletteIndex, 1);
                imageData.data[offset + 2] = image.palette.get(paletteIndex, 2);
                imageData.data[offset + 3] = image.palette.get(paletteIndex, 3);
              }
            } else {
              imageData.data.set(rawBytes);
            }
            if (upscale > 1) {
              imageData = upscaleImageData(imageData, upscale);
            }
            const id = await getId(imageData);
            setIsImportModalOpen(false);
            setSpriteInput(imageData, name, sourceUrl, pngInfo, id);
            const {headId, bodyId} = parseName(name);
            // If image name has no pokemon IDs then don't update, to allow users to pick pokemon and then iteratively post raw image data into the app
            if (headId || bodyId) {
              setHeadId(headId);
              setBodyId(bodyId);
            }
            setError(null);
            setIsLoading(false);
            return;
          }
        }
      }
      setError(`File is invalid size: ${image.width}x${image.height}`);
      setIsLoading(false);
    } else {
      setError(`File is invalid`);
      setIsLoading(false);
    }
  }, [setError, setBodyId, setHeadId, setIsImportModalOpen, setSpriteInput]);

  const executePaste = useCallback(async () => {
    const clipboardContents = await navigator.clipboard.read();
    let blob: Blob | null = null;
    let name: string | null = null;
    let url: string | null = null;
    for (const item of clipboardContents) {
      if (item.types.includes("image/png")) {
        setIsLoading(true);
        blob = await item.getType("image/png");
      }
      if (item.types.includes("text/html")) {
        const htmlText = await (await item.getType("text/html")).text();
        const match = htmlText.match(/[^/\\]+\.png/)
        if (match) {
          name = match[0];
        }
      }
      if (item.types.includes("text/plain")) {
        // Prioritise image/png blobs if clipboard has surplus data
        if (!blob) {
          const possibleUrl = await (await item.getType("text/plain")).text();
          if (/^data:image\//.test(possibleUrl)) {
            setIsLoading(true);
            const dataUri = possibleUrl;
            blob = await (await fetch(dataUri)).blob();
          } else if (/^https?:\/\//.test(possibleUrl)) {
            setIsLoading(true);
            url = possibleUrl;
            try {
              blob = await (await fetch(url, {mode: 'cors'})).blob();
            } catch (err: unknown) {
              setIsLoading(false);
              setError('The requested host site blocks fetching outside whitelisted domains');
              return;
            }
            const match = url.match(/[^/\\]+\.png/)
            if (match) {
              name = match[0];
            }
          }
        }
      }
    }
    if (blob) {
      blob.arrayBuffer()
        .then((data) => {
          return importImage(new Uint8Array(data), name, url);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    } else {
      setIsLoading(false);
      setError('No suitable data found on clipboard');
    }
  }, [importImage, setIsLoading]);

  useEffect(() => {
    const pasteHandler = () => {
      if (isImportModalOpen) {
        executePaste().catch(console.error);
      }
    }
    window.addEventListener('paste', pasteHandler)
    return () => {
      window.removeEventListener('paste', pasteHandler);
    }
  }, [isImportModalOpen, executePaste]);

  useEffect(() => {
    if (acceptedFiles.length) {
      setIsLoading(true);
      const [file] = acceptedFiles;
      if (file.type.startsWith('image')) {
        const name = file.name;
        file.arrayBuffer()
          .then((data) => {
            return importImage(new Uint8Array(data), name, null);
          })
          .catch((err) => {
            setIsLoading(false);
            setError(err);
          });
      } else {
        setIsLoading(false);
        setError('File not recognised as an image');
      }
    }
  }, [acceptedFiles, setError, importImage, setIsLoading]);

  const handleClose = useCallback(() => {
    setIsImportModalOpen(false);
  }, [setIsImportModalOpen]);

  return (
    <StyledModal
      title={'Import Sprite'}
      open={isImportModalOpen}
      handleClose={handleClose}
    >
      <Typography variant={'body1'}>
        {`Accepts images that are ${acceptedDimensionsText} pixels in size.`}
      </Typography>
      <Box
        display={'flex'}
        flexDirection={'row'}
        gap={2}
      >
        <DropBox {...getRootProps({className: 'dropzone'})} sx={{flexGrow: 2}}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </DropBox>
        <Button
          variant={'outlined'}
          onClick={executePaste}
          sx={{minWidth: '60px', width: '60px'}}
        >
          {isLoading ? (
            <ProgressContainer>
              <CircularProgress disableShrink/>
            </ProgressContainer>
          ) : (
            <ContentPasteGoSharp/>
          )}
        </Button>
      </Box>
      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}
    </StyledModal>
  );
}
