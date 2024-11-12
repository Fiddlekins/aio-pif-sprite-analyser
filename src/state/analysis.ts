import {beginBatch, endBatch, observable, ObservableHint, OpaqueObject} from '@legendapp/state';
import {ObservablePersistLocalStorage} from "@legendapp/state/persist-plugins/local-storage"
import {synced} from "@legendapp/state/sync";
import {getColourReport} from "../utils/image/getColourReport.ts";
import {PngInfo} from "../utils/image/getDecodedPng.ts";
import {getPartialPixelReport} from "../utils/image/getPartialPixelReport.ts";
import {getTransparencyReport} from "../utils/image/getTransparencyReport.ts";
import {ui$} from "./ui.ts";
import {isValidString} from "./utils/validation/isValidString.ts";
import {validate} from "./utils/validation/validate.ts";

const macroPixelSize = 3;

export const analysisSettings$ = observable(synced({
    initial: {
      partialPixelOutputMode: 'mixed',
      semiTransparentOutputMode: 'monotone',
      colouredTransparencyOutputMode: 'contrast',
    },
    persist: {
      name: 'apsa-analysis-settings',
      plugin: ObservablePersistLocalStorage,
      transform: {
        load: (value) => {
          validate(value, 'partialPixelOutputMode', isValidString({oneOf: ['mixed', 'full']}));
          validate(value, 'semiTransparentOutputMode', isValidString({oneOf: ['monotone', 'range']}));
          validate(value, 'colouredTransparencyOutputMode', isValidString({oneOf: ['contrast', 'opaqueColour']}));
          return value;
        }
      }
    }
  }
));

export interface SpriteInput {
  imageData: OpaqueObject<ImageData>;
  name?: string;
  sourceUrl?: string;
  id: string;
  info: PngInfo;
}

export const analysis$ = observable({
  spriteInput: undefined as SpriteInput | undefined,
  headId: undefined as number | undefined,
  bodyId: undefined as number | undefined,
  partialPixelReport: () => {
    const imageData = analysis$.spriteInput.imageData.get();
    if (imageData) {
      return ObservableHint.opaque(getPartialPixelReport(
        imageData,
        macroPixelSize,
        analysisSettings$.partialPixelOutputMode.get(),
      ));
    }
    return null;
  },
  transparencyReport: () => {
    const imageData = analysis$.spriteInput.imageData.get();
    if (imageData) {
      return ObservableHint.opaque(getTransparencyReport(
        imageData,
        analysisSettings$.semiTransparentOutputMode.get(),
        analysisSettings$.colouredTransparencyOutputMode.get(),
      ));
    }
    return null;
  },
  colourReport: () => {
    const imageData = analysis$.spriteInput.imageData.get();
    if (imageData) {
      return ObservableHint.opaque(getColourReport(
        imageData,
      ));
    }
    return null;
  },
  setSpriteInput: (imageData: ImageData, name: string | undefined, sourceUrl: string | undefined, info: PngInfo, id: string) => {
    beginBatch();
    analysis$.spriteInput.set({
      imageData: ObservableHint.opaque(imageData),
      name,
      sourceUrl,
      info,
      id,
    });
    ui$.highlight.clearColours();
    endBatch();
  },
  clearSpriteInput: () => {
    beginBatch();
    analysis$.spriteInput.delete();
    ui$.highlight.clearColours();
    endBatch();
  }
});
