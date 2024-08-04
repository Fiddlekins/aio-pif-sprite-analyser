import {PngInfo} from "./image/getDecodedPng.ts";

export function getDimensions(width: number, height: number) {
  return `${width}x${height}`;
}

export function getColorTypeCode(colorType: number) {
  switch (colorType) {
    case 0:
      return '0g';
    case 2:
      return '2c';
    case 3:
      return '3p';
    case 4:
      return '4a';
    case 6:
      return '6a';
  }
  return `${colorType}?`;
}

export function getBitsPerChannel(bitsPerChannel: number) {
  return `${bitsPerChannel}b`;
}

export function getChannelCount(channelCount: number) {
  return `${channelCount}c`;
}

const byteValueNumberFormatter = Intl.NumberFormat(navigator.language, {
  notation: "compact",
  style: "unit",
  unit: "byte",
  unitDisplay: "narrow",
});

export function getFileSize(bytes: number) {
  return byteValueNumberFormatter.format(bytes);
}

export function getPngInfoSummary(
  {
    width,
    height,
    colourType,
    bitsPerChannel,
    channelCount,
    fileSize,
  }: PngInfo
) {
  return [
    getDimensions(width, height),
    getColorTypeCode(colourType),
    getBitsPerChannel(bitsPerChannel),
    getChannelCount(channelCount),
    getFileSize(fileSize),
  ].join(' ');
}
