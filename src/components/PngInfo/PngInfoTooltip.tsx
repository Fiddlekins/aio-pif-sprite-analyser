import {Trans, useLingui} from "@lingui/react/macro";
import {HelpOutlineSharp} from "@mui/icons-material";
import {Box, Typography} from "@mui/material";
import {Fragment, useMemo} from "react";
import {PngInfo} from "../../utils/image/getDecodedPng.ts";
import {FormatFilesize} from "../Formatters/FormatFilesize.tsx";
import {StyledTooltip} from "../StyledTooltip.tsx";
import {BitsPerChannel} from "./BitsPerChannel.tsx";
import {ChannelCount} from "./ChannelCount.tsx";
import {ColorTypeCode} from "./ColorTypeCode.tsx";
import {Dimensions} from "./Dimensions.tsx";
import {FileSize} from "./FileSize.tsx";

export interface PngInfoTooltipProps {
  pngInfo: PngInfo;
}

export function PngInfoTooltip(
  {
    pngInfo,
  }: PngInfoTooltipProps
) {
  const {
    width,
    height,
    colourType,
    bitsPerChannel,
    channelCount,
    fileSize,
  } = pngInfo;
  const {t} = useLingui();

  const colourTypePixelFormat = useMemo(() => {
    switch (true) {
      case (colourType === 0) : {
        return t`[greyscale].`;
      }
      case (colourType === 2) : {
        return t`[red,green,blue].`;
      }
      case (colourType === 3 && channelCount === 3) : {
        return t`[red,green,blue].`;
      }
      case (colourType === 3 && channelCount === 4) : {
        return t`[red,green,blue,alpha].`
      }
      case (colourType === 4) : {
        return t`[greyscale, alpha].`
      }
      case (colourType === 6) : {
        return t`[red,green,blue,alpha].`
      }
      default:
        console.error(new Error(`Unexpected PNG format`));
        return '?';
    }
  }, [t, colourType, channelCount]);

  return (
    <StyledTooltip
      title={(
        <Fragment>
          <Typography variant={'h6'}>
            <Trans>
              PNG Info
            </Trans>
          </Typography>
          <Box
            display={'grid'}
            gridTemplateColumns={'auto auto'}
            gap={2}
          >
            <Typography variant={'body2'}>
              <Dimensions pngInfo={pngInfo}/>
            </Typography>
            <Typography variant={'body2'}>
              <Trans>
                The image is {width} pixels wide and {height} pixels high.
              </Trans>
            </Typography>

            <Typography variant={'body2'}>
              <ColorTypeCode pngInfo={pngInfo}/>
            </Typography>
            <Typography variant={'body2'}>
              <Trans>
                The image is Colour Type {colourType}.
              </Trans>
              {' '}
              {colourType === 0 && t`Each pixel is a grayscale sample.`}
              {colourType === 2 && t`Each pixel is a Red, Green, Blue triple.`}
              {colourType === 3 && t`Each pixel is a palette index.`}
              {colourType === 4 && t`Each pixel is a grayscale sample, followed by an alpha sample.`}
              {colourType === 6 && t`Each pixel is a Red, Green, Blue triple, followed by an alpha sample.`}
              {/* Should not be possible to get this far with an invalid PNG so save computing this */}
              {/*{![0,2,3,4,6].includes(colourType) && `Invalid colorType.`}*/}
            </Typography>

            <Typography variant={'body2'}>
              <BitsPerChannel pngInfo={pngInfo}/>
            </Typography>
            <Typography variant={'body2'}>
              {colourType === 3 ? t`The palette colours are defined using ${bitsPerChannel} bits per channel.` : t`The pixels are defined using ${bitsPerChannel} bits per channel.`}
            </Typography>

            <Typography variant={'body2'}>
              <ChannelCount pngInfo={pngInfo}/>
            </Typography>
            <Typography variant={'body2'}>
              {colourType === 3 ? t`The palette colours are defined using ${channelCount} channels: ${colourTypePixelFormat}` : t`The pixels are defined using ${channelCount} channels: ${colourTypePixelFormat}`}
            </Typography>

            <Typography variant={'body2'}>
              <FileSize pngInfo={pngInfo}/>
            </Typography>
            <Typography variant={'body2'}>
              <Trans>
                The file size is {<FormatFilesize value={fileSize} variant={'long'}/>}.
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
  );
}
