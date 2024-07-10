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
    // The PNG library is unreliable in terms of whether it fully decodes palette based PNGs or not
    // As such, we check the raw byte length to determine if it has already applied the palette
    if (rawBytes.length === image.width * image.height * 4) {
      imageData.data.set(rawBytes);
    } else if (rawBytes.length === image.width * image.height) {
      for (let pixelIndex = 0; pixelIndex < rawBytes.length; pixelIndex++) {
        const paletteIndex = rawBytes[pixelIndex];
        const offset = pixelIndex * 4;
        imageData.data[offset] = image.palette.get(paletteIndex, 0);
        imageData.data[offset + 1] = image.palette.get(paletteIndex, 1);
        imageData.data[offset + 2] = image.palette.get(paletteIndex, 2);
        if (image.numChannels === 4) {
          imageData.data[offset + 3] = image.palette.get(paletteIndex, 3);
        } else {
          imageData.data[offset + 3] = 255;
        }
      }
    } else {
      throw new Error(`Unexpected rawBytes length during PNG decoding: ${rawBytes.length}bytes for ${image.width}x${image.height} image`);
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
