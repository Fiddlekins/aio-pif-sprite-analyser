import {useLingui} from "@lingui/react/macro";
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
  // Use the t function rather than the Trans component because lingui compiles to using the wrong key if not
  const {t} = useLingui();
  return (
    <>
      {t`${width}x${height}`}
    </>
  );
}
