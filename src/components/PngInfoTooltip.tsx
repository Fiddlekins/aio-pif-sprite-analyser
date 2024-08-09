import {HelpOutlineSharp} from "@mui/icons-material";
import {Box, Typography} from "@mui/material";
import {Fragment} from "react";
import {
  getBitsPerChannel,
  getChannelCount,
  getColorTypeCode,
  getDimensions,
  getFileSize
} from "../utils/getPngInfoSummary.ts";
import {PngInfo} from "../utils/image/getDecodedPng.ts";
import {StyledTooltip} from "./StyledTooltip.tsx";

export interface PngInfoTooltipProps {
  info: PngInfo;
}

export function PngInfoTooltip(
  {
    info,
  }: PngInfoTooltipProps
) {
  const {
    width,
    height,
    colourType,
    bitsPerChannel,
    channelCount,
    fileSize,
  } = info;
  return (
    <StyledTooltip
      title={(
        <Fragment>
          <Typography variant={'h6'}>
            PNG Info
          </Typography>
          <Box
            display={'grid'}
            gridTemplateColumns={'auto auto'}
            gap={2}
          >
            <Typography variant={'body2'}>
              {getDimensions(width, height)}
            </Typography>
            <Typography variant={'body2'}>
              {`The image is ${width} pixels wide and ${height} pixels high.`}
            </Typography>

            <Typography variant={'body2'}>
              {getColorTypeCode(colourType)}
            </Typography>
            <Typography variant={'body2'}>
              {`The image is Colour Type ${colourType}.`}
              {' '}
              {colourType === 0 && `Each pixel is a grayscale sample.`}
              {colourType === 2 && `Each pixel is a Red, Green, Blue triple.`}
              {colourType === 3 && `Each pixel is a palette index.`}
              {colourType === 4 && `Each pixel is a grayscale sample, followed by an alpha sample.`}
              {colourType === 6 && `Each pixel is a Red, Green, Blue triple, followed by an alpha sample.`}
              {/* Should not be possible to get this far with an invalid PNG so save computing this */}
              {/*{![0,2,3,4,6].includes(colourType) && `Invalid colorType.`}*/}
            </Typography>

            <Typography variant={'body2'}>
              {getBitsPerChannel(bitsPerChannel)}
            </Typography>
            <Typography variant={'body2'}>
              {colourType === 3 ? `The palette colours are defined using ${bitsPerChannel} bits per channel.` : `The pixels are defined using ${bitsPerChannel} bits per channel.`}
            </Typography>

            <Typography variant={'body2'}>
              {getChannelCount(channelCount)}
            </Typography>
            <Typography variant={'body2'}>
              {colourType === 3 ? `The palette colours are defined using ${channelCount} channels:` : `The pixels are defined using ${channelCount} channels:`}
              {colourType === 0 && ` [greyscale].`}
              {colourType === 2 && ` [red,green,blue].`}
              {colourType === 3 && channelCount === 3 && ` [red,green,blue].`}
              {colourType === 3 && channelCount === 4 && ` [red,green,blue,alpha].`}
              {colourType === 4 && ` [greyscale, alpha].`}
              {colourType === 6 && ` [red,green,blue,alpha].`}
            </Typography>

            <Typography variant={'body2'}>
              {getFileSize(fileSize)}
            </Typography>
            <Typography variant={'body2'}>
              {`The file size is ${fileSize} bytes.`}
            </Typography>
          </Box>
        </Fragment>
      )}
      placement={'top'}
      arrow
    >
      <HelpOutlineSharp fontSize={'small'}/>
    </StyledTooltip>
  );
}
