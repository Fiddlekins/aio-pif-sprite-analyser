import {PngInfo} from "../../utils/image/getDecodedPng.ts";

export interface ChannelCountProps {
  pngInfo: PngInfo;
}

export function ChannelCount(
  {
    pngInfo
  }: ChannelCountProps
) {
  return (
    <>
      {pngInfo.channelCount}c
    </>
  )
}
