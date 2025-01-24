import {PngInfo} from "../../utils/image/getDecodedPng.ts";
import {FormatFilesize} from "../Formatters/FormatFilesize.tsx";

export interface FileSizeProps {
  pngInfo: PngInfo;
}

export function FileSize(
  {
    pngInfo
  }: FileSizeProps
) {
  return (
    <FormatFilesize value={pngInfo.fileSize} variant={'compact'}/>
  );
}
