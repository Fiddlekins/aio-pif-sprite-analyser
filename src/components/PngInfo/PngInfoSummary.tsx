import {PngInfo} from "../../utils/image/getDecodedPng.ts";
import {BitsPerChannel} from "./BitsPerChannel.tsx";
import {ChannelCount} from "./ChannelCount.tsx";
import {ColorTypeCode} from "./ColorTypeCode.tsx";
import {Dimensions} from "./Dimensions.tsx";
import {FileSize} from "./FileSize.tsx";

export interface PngInfoSummaryProps {
  pngInfo: PngInfo;
}

export function PngInfoSummary(
  {
    pngInfo
  }: PngInfoSummaryProps
) {
  return (
    <>
      <Dimensions pngInfo={pngInfo}/>
      {' '}
      <ColorTypeCode pngInfo={pngInfo}/>
      {' '}
      <BitsPerChannel pngInfo={pngInfo}/>
      {' '}
      <ChannelCount pngInfo={pngInfo}/>
      {' '}
      <FileSize pngInfo={pngInfo}/>
    </>
  );
}
