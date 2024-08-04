import {encodePng, Format, MemoryImage, PaletteUint8} from "image-in-browser";
import {getColourKeyFromPixel} from "./conversion/getColourKeyFromPixel.ts";
import {getPixelFromColourKey} from "./conversion/getPixelFromColourKey.ts";
import {scan} from "./manipulation/scan.ts";

export interface EncodedPngOptions {
  indexed?: boolean;
}

export function getEncodedPng(imageData: ImageData, options?: EncodedPngOptions) {
  let memoryImage: MemoryImage | null = null;
  if (options?.indexed) {
    const colours = new Set<number>();
    scan(imageData, 0, 0, imageData.width, imageData.height, (pixel) => {
      const colourKey = getColourKeyFromPixel(pixel);
      colours.add(colourKey);
    });
    // PNG palettes can't exceed 256 colours, fall back to non-indexed if colour count too high
    if (colours.size <= 256) {
      const sortedColours = Array.from(colours.values()).sort((a, b) => {
        const [ar, ag, ab, aa] = getPixelFromColourKey(a);
        const [br, bg, bb, ba] = getPixelFromColourKey(b);
        // Store non-opaque colours at the start of the palette so that the transparency chunk can omit trailing opaque colour entries
        // (although current PNG encode library does not perform this optimisation)
        if (aa !== ba) {
          return aa - ba;
        }
        // The sort by rgb cus why not
        if (ar !== br) {
          return ar - br;
        }
        if (ag !== bg) {
          return ag - bg;
        }
        return ab - bb;
      });
      const colourMap = new Map<number, number>();
      for (let paletteIndex = 0; paletteIndex < sortedColours.length; paletteIndex++) {
        const colourKey = sortedColours[paletteIndex];
        colourMap.set(colourKey, paletteIndex);
      }
      const indexedData = new Uint8Array(imageData.width * imageData.height);
      scan(imageData, 0, 0, imageData.width, imageData.height, (pixel, x, y) => {
        const colourKey = getColourKeyFromPixel(pixel);
        const paletteIndex = colourMap.get(colourKey) || 0;
        const pixelIndex = (y * imageData.width) + x;
        indexedData[pixelIndex] = paletteIndex;
      });
      const palette = new PaletteUint8(colourMap.size, 4);
      for (const [colourKey, paletteIndex] of colourMap.entries()) {
        const [r, g, b, a] = getPixelFromColourKey(colourKey);
        palette.setRgba(paletteIndex, r, g, b, a);
      }
      memoryImage = MemoryImage.fromBytes({
        bytes: indexedData,
        width: imageData.width,
        height: imageData.height,
        format: Format.uint8,
        numChannels: 1,
        palette,
      });
    }
  }
  if (!memoryImage) {
    memoryImage = MemoryImage.fromBytes({
      bytes: imageData.data,
      width: imageData.width,
      height: imageData.height,
      format: Format.uint8,
      numChannels: 4,
    });
  }
  return encodePng({
    image: memoryImage,
    level: 9
  });
}
