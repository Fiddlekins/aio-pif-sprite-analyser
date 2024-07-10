import {ChannelOrder, PngDecoder, TypedArray} from "image-in-browser";
import {createImageData} from "./manipulation/createImageData.ts";

interface DecodedPngResult {
  decoder: PngDecoder;
  imageData: ImageData;
  numChannels: number;
}

export function getDecodedPng(data: TypedArray): DecodedPngResult {
  const dataUint8 = new Uint8Array(data);
  const decoder = new PngDecoder();
  const image = decoder.decode({
    bytes: dataUint8,
  });
  if (!image) {
    throw new Error('File is invalid');
  }
  const imageData = createImageData(image.width, image.height);
  const rawBytes = image.getBytes({
    order: ChannelOrder.rgba,
  });
  if (image.palette) {
    for (let pixelIndex = 0; pixelIndex < rawBytes.length; pixelIndex++) {
      const paletteIndex = rawBytes[pixelIndex];
      const offset = pixelIndex * 4;
      imageData.data[offset] = image.palette.get(paletteIndex, 0);
      imageData.data[offset + 1] = image.palette.get(paletteIndex, 1);
      imageData.data[offset + 2] = image.palette.get(paletteIndex, 2);
      imageData.data[offset + 3] = image.palette.get(paletteIndex, 3);
    }
  } else {
    imageData.data.set(rawBytes);
  }
  return {
    decoder,
    imageData,
    numChannels: image.numChannels,
  };
}
