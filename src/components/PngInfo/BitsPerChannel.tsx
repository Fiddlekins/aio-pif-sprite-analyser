import {PngInfo} from "../../utils/image/getDecodedPng.ts";

export interface BitsPerChannelProps {
  pngInfo: PngInfo;
}

export function BitsPerChannel(
  {
    pngInfo
  }: BitsPerChannelProps
) {
  return (
    <>
      {pngInfo.bitsPerChannel}b
    </>
  )
}
