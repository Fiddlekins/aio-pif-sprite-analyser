import {Trans} from "@lingui/react/macro";
import {PngInfo} from "../../utils/image/getDecodedPng.ts";

export interface DimensionsProps {
  pngInfo: PngInfo;
}

export function Dimensions(
  {
    pngInfo
  }: DimensionsProps
) {
  const {width, height} = pngInfo;
  return (
    <Trans>
      {width}x{height}
    </Trans>
  );
}
