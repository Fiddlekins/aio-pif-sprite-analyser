import {observer, useObserveEffect} from "@legendapp/state/react";
import {useRef} from "react";
import {analysis$} from "../state/analysis.ts";
import {ui$, uiSettings$} from "../state/ui.ts";
import {applyHighlightColours} from "../utils/image/applyHighlightColours.ts";
import {getPixelFromColourKey} from "../utils/image/conversion/getPixelFromColourKey.ts";
import {getPixelFromRgbaColor} from "../utils/image/conversion/getPixelFromRgbaColor.ts";
import {CanvasWithBackground} from "./CanvasWithBackground.tsx";

export interface CanvasWithBackgroundAndHighlightProps {
  minSize?: number;
}

export const HighlightedCanvasWithBackground = observer(function CanvasWithBackgroundAndHighlight(
  {
    minSize,
  }: CanvasWithBackgroundAndHighlightProps
) {
  const canCopyCanvas = Boolean(ui$.highlight.currentColours.get().length);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useObserveEffect(() => {
    const spriteInputImageData = analysis$.spriteInput.imageData.get() as ImageData;
    const highlightMode = uiSettings$.highlightMode.get();
    const highlightColour = uiSettings$.highlightColour.get();
    const highlightedColours = ui$.highlight.currentColours.get();
    const canvas = canvasRef.current;
    if (canvas && spriteInputImageData) {
      const ctx = canvas.getContext('2d', {colorSpace: 'srgb'});
      if (ctx) {
        let imageData = spriteInputImageData;
        if (highlightedColours.length) {
          const coloursToHighlight = highlightedColours.map((colourKey) => getPixelFromColourKey(colourKey));
          imageData = applyHighlightColours(imageData, coloursToHighlight, getPixelFromRgbaColor(highlightColour), highlightMode);
        }
        ctx.putImageData(imageData, 0, 0);
      }
    }
  });

  return (
    <CanvasWithBackground canvasRef={canvasRef} canCopy={canCopyCanvas} minSize={minSize}/>
  );
});
