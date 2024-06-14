import {Pixel} from "./types.ts";

function getChannelHexString(channel: number) {
  return channel.toString(16).padStart(2, '0');
}

export function getHex8FromPixel([r, g, b, a]: Pixel) {
  return `${getChannelHexString(r)}${getChannelHexString(g)}${getChannelHexString(b)}${getChannelHexString(a)}`;
}
