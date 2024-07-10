import {Pixel} from "../types.ts";
import {getPixel} from "./getPixel.ts";
import {scan} from "./scan.ts";
import {setPixel} from "./setPixel.ts";

function compositeSourceOver(channelSrc: number, channelDest: number, alphaSrc: number, alphaDest: number): number {
  return ((channelSrc * alphaSrc) + (channelDest * alphaDest * (1 - alphaSrc))) / (alphaSrc + (alphaDest * (1 - alphaSrc)));
}

export function drawImageData(dest: ImageData, src: ImageData, x: number, y: number, compositeOperation = 'source-over') {
  scan(src, 0, 0, src.width, src.height, (srcPixel, srcX, srcY) => {
    const destX = x + srcX;
    const destY = y + srcY;
    if (destX >= 0 && destX < dest.width && destY >= 0 && destY < dest.height) {
      const destPixel = getPixel(dest, destX, destY);
      let destPixelNew: Pixel;
      switch (compositeOperation) {
        case 'source-over': {
          if (srcPixel[3] === 255) {
            destPixelNew = srcPixel;
          } else if (srcPixel[3] === 0) {
            destPixelNew = destPixel;
          } else {
            destPixelNew = [
              Math.round(compositeSourceOver(srcPixel[0] / 255, destPixel[0] / 255, srcPixel[3] / 255, destPixel[3] / 255) * 255),
              Math.round(compositeSourceOver(srcPixel[1] / 255, destPixel[1] / 255, srcPixel[3] / 255, destPixel[3] / 255) * 255),
              Math.round(compositeSourceOver(srcPixel[2] / 255, destPixel[2] / 255, srcPixel[3] / 255, destPixel[3] / 255) * 255),
              Math.max(srcPixel[3], destPixel[3]),
            ];
          }
          break;
        }
        default:
          throw new Error(`Unsupported composite operation ${compositeOperation}`)
      }
      setPixel(dest, destPixelNew, destX, destY);
    }
  });
}
