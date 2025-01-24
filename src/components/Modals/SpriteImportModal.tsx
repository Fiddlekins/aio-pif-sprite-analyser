import {observer} from "@legendapp/state/react";
import {Trans, useLingui} from "@lingui/react/macro";
import {ContentPasteGoSharp} from "@mui/icons-material";
import {Alert, Box, BoxProps, Button, CircularProgress, styled, Typography} from "@mui/material";
import {TypedArray} from "image-in-browser";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useDropzone} from 'react-dropzone';
import {analysis$} from "../../state/analysis.ts";
import {ui$} from "../../state/ui.ts";
import {getId} from "../../utils/getId.ts";
import {getDecodedPng} from "../../utils/image/getDecodedPng.ts";
import {upscaleImageData} from "../../utils/image/manipulation/upscaleImageData.ts";
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

const acceptedDimensions = [
  {width: 96, height: 96, upscale: 3},
  {width: 288, height: 288, upscale: 1},
];

export const SpriteImportModal = observer(function SpriteImportModal() {
  const locale = ui$.locale.get();
  const isImportModalOpen = ui$.isImportModalOpen.get();
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {t} = useLingui();

  const acceptedDimensionsText = useMemo(() => {
    const dimensionStrings = acceptedDimensions.map(({width, height}) => {
      return t`${width}x${height}`;
    });
    const formatter = new Intl.ListFormat(locale, {
      style: 'short',
      type: 'disjunction',
    });
    return formatter.format(dimensionStrings);
  }, [t, locale]);

  const importImage = useCallback(async (data: TypedArray, name: string | null, sourceUrl: string | null) => {
    let decodedPngResult;
    try {
      decodedPngResult = getDecodedPng(data);
    } catch (err: unknown) {
      console.log(err);
      const error = err as Error;
      setError(error.message);
      setIsLoading(false);
      return;
    }
    const {info: pngInfo} = decodedPngResult;
    let {imageData} = decodedPngResult;
    for (const {width, height, upscale} of acceptedDimensions) {
      if (imageData.width === width && imageData.height === height) {
        if (upscale > 1) {
          imageData = upscaleImageData(imageData, upscale);
        }
        const id = await getId(imageData);
        ui$.isImportModalOpen.set(false);
        analysis$.setSpriteInput(imageData, name || undefined, sourceUrl || undefined, pngInfo, id);
        const {headId, bodyId} = parseName(name);
        // If image name has no pokemon IDs then don't update, to allow users to pick pokemon and then iteratively post raw image data into the app
        if (headId || bodyId) {
          analysis$.headId.set(headId || undefined);
          analysis$.bodyId.set(bodyId || undefined);
        }
        setError(null);
        setIsLoading(false);
        return;
      }
    }
    const {width, height} = imageData;
    const resolutionString = t`${width}x${height}`;
    setError(t`File is invalid size: ${resolutionString}`);
    setIsLoading(false);
  }, [t, setError]);

  const executePaste = useCallback(async (files: File[] | null) => {
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
              setError(t`The requested host site blocks fetching outside whitelisted domains`);
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
      // clipboardData can handle copied system files whereas the ClipboardAPI approach cannot
      if (files) {
        for (const file of files) {
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
            return;
          }
        }
      }
      setIsLoading(false);
      setError(t`No suitable data found on clipboard`);
    }
  }, [t, importImage, setIsLoading]);

  useEffect(() => {
    const pasteHandler = (e: ClipboardEvent) => {
      if (isImportModalOpen) {
        const files = e.clipboardData ? Array.from(e.clipboardData.files) : null;
        executePaste(files).catch(console.error);
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
        setError(t`File not recognised as an image`);
      }
    }
  }, [t, acceptedFiles, setError, importImage, setIsLoading]);

  const handleClose = useCallback(() => {
    ui$.isImportModalOpen.set(false);
  }, []);

  const oneOff = async () => {
    const url = 'data:image/png;base64,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';
    const name = '20.70.png';
    let blob: Blob | null = null;
    try {
      blob = await (await fetch(url, {mode: 'cors'})).blob();
    } catch (err: unknown) {
      setIsLoading(false);
      setError(t`The requested host site blocks fetching outside whitelisted domains`);
      return;
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
    }
    setIsLoading(false);
    setError(t`No suitable data found on clipboard`);
  }

  useEffect(() => {
    oneOff().catch(console.error);
  }, []);

  return (
    <StyledModal
      title={t`Import Sprite`}
      open={isImportModalOpen}
      handleClose={handleClose}
    >
      <Typography variant={'body1'}>
        <Trans>
          Accepts images that are {acceptedDimensionsText} pixels in size.
        </Trans>
      </Typography>
      <Box
        display={'flex'}
        flexDirection={'row'}
        gap={2}
      >
        <DropBox {...getRootProps({className: 'dropzone'})} sx={{flexGrow: 2}}>
          <input {...getInputProps()} />
          <p>
            <Trans>
              Drag 'n' drop some files here, or click to select files
            </Trans>
          </p>
        </DropBox>
        <Button
          variant={'outlined'}
          onClick={() => {
            executePaste(null)
          }}
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
});
