import {useLingui} from "@lingui/react/macro";
import {filesizeCompact} from "../../utils/formatStyles.ts";
import {PngInfo} from "../../utils/image/getDecodedPng.ts";

export interface FileSizeProps {
  pngInfo: PngInfo;
}

export function FileSize(
  {
    pngInfo
  }: FileSizeProps
) {
  const {i18n} = useLingui();
  return (
    <>
      {i18n.number(pngInfo.fileSize, filesizeCompact)}
    </>
  );
}
