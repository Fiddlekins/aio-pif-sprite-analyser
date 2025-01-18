import {PngInfo} from "../../utils/image/getDecodedPng.ts";

function getColorTypeCode(colorType: number) {
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

export interface ColorTypeCodeProps {
  pngInfo: PngInfo;
}

export function ColorTypeCode(
  {
    pngInfo
  }: ColorTypeCodeProps
) {
  return (
    <>
      {getColorTypeCode(pngInfo.colourType)}
    </>
  )
}
