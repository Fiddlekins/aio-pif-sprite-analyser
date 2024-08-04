import {createContext, Dispatch, ReactNode, useCallback, useMemo, useReducer, useState} from 'react';
import {RgbaColor} from "react-colorful";
import {getColourKeyFromPixel} from "../utils/image/conversion/getColourKeyFromPixel.ts";
import {getPixelFromColourKey} from "../utils/image/conversion/getPixelFromColourKey.ts";
import {getPixelFromRgbaColor} from "../utils/image/conversion/getPixelFromRgbaColor.ts";
import {getRgbaColorFromPixel} from "../utils/image/conversion/getRgbaColorFromPixel.ts";
import {ColourReport, getColourReport} from "../utils/image/getColourReport.ts";
import {PngInfo} from "../utils/image/getDecodedPng.ts";
import {getPartialPixelReport, PartialPixelReport} from "../utils/image/getPartialPixelReport.ts";
import {getTransparencyReport, TransparencyReport} from "../utils/image/getTransparencyReport.ts";
import {retrieveString} from "../utils/localStorage/retrieveString.ts";
import {retrieveTyped} from "../utils/localStorage/retrieveTyped.ts";
import {storeString} from "../utils/localStorage/storeString.ts";

const macroPixelSize = 3;

const defaultHighlightColour: RgbaColor = {r: 255, g: 0, b: 0, a: 1};

export interface SpriteInput {
  imageData: ImageData;
  name: string | null;
  sourceUrl: string | null;
  id: string;
  info: PngInfo;
}

interface HighlightedColourState {
  checked: Set<number>;
  hovered: {
    lastUpdateTimestamp: number;
    colourKey: number | null;
  };
  render: boolean;
  highlightedColours: number[];
}

interface HighlightedColourOperation {
  operation: 'check' | 'uncheck' | 'hoverStart' | 'hoverEnd' | 'reset' | 'renderOn' | 'renderOff';
  colourKey?: number;
}

const initialHighlightedColourState: HighlightedColourState = {
  checked: new Set<number>(),
  hovered: {lastUpdateTimestamp: 0, colourKey: null},
  render: false,
  highlightedColours: [],
};

function highlightedColourStateReducer(
  state: HighlightedColourState,
  action: HighlightedColourOperation
) {
  if (action.operation === 'reset') {
    return {
      ...initialHighlightedColourState,
      render: state.render,
    };
  }
  // Start with shallow clone so value refs don't change if their content doesn't
  const stateNew: HighlightedColourState = {
    ...state,
    // hovered: {...state.hovered},
  };
  switch (action.operation) {
    case "renderOn":
      stateNew.render = true;
      break;
    case "renderOff":
      stateNew.render = false;
      break;
    case "check": {
      if (typeof action.colourKey === 'number') {
        // Update ref now that we're mutating the content
        stateNew.checked = new Set(state.checked);
        stateNew.checked.add(action.colourKey)
      }
      break;
    }
    case "uncheck": {
      if (typeof action.colourKey === 'number') {
        // Update ref now that we're mutating the content
        stateNew.checked = new Set(state.checked);
        stateNew.checked.delete(action.colourKey)
      }
      break;
    }
    case "hoverStart": {
      if (typeof action.colourKey === 'number') {
        // Update ref now that we're mutating the content
        stateNew.hovered = {...state.hovered};
        // Always override other hover operations in the same frame
        stateNew.hovered.lastUpdateTimestamp = Date.now();
        stateNew.hovered.colourKey = action.colourKey;
      }
      break;
    }
    case "hoverEnd": {
      // If there's been a hoverStart this frame then don't update
      const timestamp = Date.now();
      if (stateNew.hovered.lastUpdateTimestamp !== timestamp) {
        // Update ref now that we're mutating the content
        stateNew.hovered = {...state.hovered};
        stateNew.hovered.lastUpdateTimestamp = timestamp;
        stateNew.hovered.colourKey = null;
      }
      break;
    }
  }
  // Merge and dedupe
  stateNew.highlightedColours = [...stateNew.checked];
  if (typeof stateNew.hovered.colourKey === 'number' && !stateNew.highlightedColours.includes(stateNew.hovered.colourKey)) {
    stateNew.highlightedColours.push(stateNew.hovered.colourKey);
  }
  return stateNew;
}

export interface AnalysisContextInterface {
  isImportModalOpen: boolean;
  setIsImportModalOpen: (isImportModalOpenNew: boolean) => void;
  isExportModalOpen: boolean;
  setIsExportModalOpen: (isExportModalOpenNew: boolean) => void;
  spriteInput: SpriteInput | null;
  setSpriteInput: (imageDataNew: ImageData, nameNew: string | null, sourceUrlNew: string | null, pngInfo: PngInfo, id: string) => void;
  headId: number | null;
  setHeadId: (headIdNew: number | null) => void;
  bodyId: number | null;
  setBodyId: (bodyIdNew: number | null) => void;
  partialPixelReport: PartialPixelReport | null;
  transparencyReport: TransparencyReport | null;
  colourReport: ColourReport | null;
  highlightedColourState: HighlightedColourState;
  dispatchHighlightedColourState: Dispatch<HighlightedColourOperation>;
  partialPixelOutputMode: string;
  setPartialPixelOutputMode: (partialPixelOutputModeNew: string) => void;
  semiTransparentOutputMode: string;
  setSemiTransparentOutputMode: (semiTransparentOutputModeNew: string) => void;
  colouredTransparencyOutputMode: string;
  setColouredTransparencyOutputMode: (colouredTransparencyOutputModeNew: string) => void;
  highlightMode: string;
  setHighlightMode: (highlightModeNew: string) => void;
  highlightColour: RgbaColor;
  setHighlightColour: (highlightColourNew: RgbaColor) => void;
}

const defaultHandler = () => {
  throw new Error('AnalysisContext is still initializing');
};

export const AnalysisContext = createContext<AnalysisContextInterface>({
  isImportModalOpen: true,
  setIsImportModalOpen: defaultHandler,
  isExportModalOpen: false,
  setIsExportModalOpen: defaultHandler,
  spriteInput: null,
  setSpriteInput: defaultHandler,
  headId: null,
  setHeadId: defaultHandler,
  bodyId: null,
  setBodyId: defaultHandler,
  partialPixelReport: null,
  transparencyReport: null,
  colourReport: null,
  highlightedColourState: initialHighlightedColourState,
  dispatchHighlightedColourState: defaultHandler,
  partialPixelOutputMode: '',
  setPartialPixelOutputMode: defaultHandler,
  semiTransparentOutputMode: '',
  setSemiTransparentOutputMode: defaultHandler,
  colouredTransparencyOutputMode: '',
  setColouredTransparencyOutputMode: defaultHandler,
  highlightMode: '',
  setHighlightMode: defaultHandler,
  highlightColour: defaultHighlightColour,
  setHighlightColour: defaultHandler,
});

export interface AnalysisProviderProps {
  /**
   * The provider's child nodes
   */
  children?: ReactNode;
}

export function AnalysisProvider(
  {
    children,
  }: AnalysisProviderProps
) {
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(true);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [spriteInput, setSpriteInputInternal] = useState<SpriteInput | null>(null);
  const [headId, setHeadId] = useState<number | null>(null);
  const [bodyId, setBodyId] = useState<number | null>(null);
  const [partialPixelOutputMode, setPartialPixelOutputModeInternal] = useState<string>(
    retrieveString('AnalysisContext.partialPixelOutputMode', 'mixed')
  );
  const [semiTransparentOutputMode, setSemiTransparentOutputModeInternal] = useState<string>(
    retrieveString('AnalysisContext.semiTransparentOutputMode', 'monotone')
  );
  const [colouredTransparencyOutputMode, setColouredTransparencyOutputModeInternal] = useState<string>(
    retrieveString('AnalysisContext.colouredTransparencyOutputMode', 'contrast')
  );
  const [highlightMode, setHighlightModeInternal] = useState<string>(
    retrieveString('AnalysisContext.highlightMode', 'monotone')
  );
  const [highlightColour, setHighlightColourInternal] = useState<RgbaColor>(
    retrieveTyped<RgbaColor>('AnalysisContext.highlightColour', (value) => {
        const colourKey = parseInt(value || '');
        if (!Number.isNaN(colourKey)) {
          return getRgbaColorFromPixel(getPixelFromColourKey(colourKey));
        }
        return defaultHighlightColour;
      }
    )
  );

  const [highlightedColourState, dispatchHighlightedColourState] = useReducer(highlightedColourStateReducer, initialHighlightedColourState);

  const setSpriteInput = useCallback(
    (imageDataNew: ImageData, nameNew: string | null, sourceUrlNew: string | null, info: PngInfo, id: string) => {
      setSpriteInputInternal({
        imageData: imageDataNew,
        name: nameNew,
        sourceUrl: sourceUrlNew,
        id,
        info,
      });
      dispatchHighlightedColourState({operation: 'reset'});
    },
    [
      setSpriteInputInternal,
      dispatchHighlightedColourState,
    ]);

  const partialPixelReport = useMemo(() => {
    return spriteInput ? getPartialPixelReport(
      spriteInput.imageData,
      macroPixelSize,
      partialPixelOutputMode
    ) : null;
  }, [
    spriteInput,
    partialPixelOutputMode,
  ]);

  const transparencyReport = useMemo(() => {
    return spriteInput ? getTransparencyReport(
      spriteInput.imageData,
      semiTransparentOutputMode,
      colouredTransparencyOutputMode,
    ) : null;
  }, [
    spriteInput,
    semiTransparentOutputMode,
    colouredTransparencyOutputMode,
  ]);

  const colourReport = useMemo(() => {
    return spriteInput ? getColourReport(
      spriteInput.imageData,
    ) : null;
  }, [
    spriteInput,
  ]);

  const setPartialPixelOutputMode = useCallback((partialPixelOutputModeNew: string) => {
    storeString('AnalysisContext.partialPixelOutputMode', partialPixelOutputModeNew);
    setPartialPixelOutputModeInternal(partialPixelOutputModeNew);
  }, [setPartialPixelOutputModeInternal]);

  const setSemiTransparentOutputMode = useCallback((semiTransparentOutputModeNew: string) => {
    storeString('AnalysisContext.semiTransparentOutputMode', semiTransparentOutputModeNew);
    setSemiTransparentOutputModeInternal(semiTransparentOutputModeNew);
  }, [setSemiTransparentOutputModeInternal]);

  const setColouredTransparencyOutputMode = useCallback((colouredTransparencyOutputModeNew: string) => {
    storeString('AnalysisContext.colouredTransparencyHighlightMode', colouredTransparencyOutputModeNew);
    setColouredTransparencyOutputModeInternal(colouredTransparencyOutputModeNew);
  }, [setColouredTransparencyOutputModeInternal]);

  const setHighlightMode = useCallback((highlightModeNew: string) => {
    storeString('AnalysisContext.highlightMode', highlightModeNew);
    setHighlightModeInternal(highlightModeNew);
  }, [setHighlightModeInternal]);

  const setHighlightColour = useCallback((highlightColourNew: RgbaColor) => {
    storeString('AnalysisContext.highlightColour', getColourKeyFromPixel(getPixelFromRgbaColor(highlightColourNew)).toString());
    setHighlightColourInternal(highlightColourNew);
  }, [setHighlightColourInternal]);

  const value = useMemo(
    () => ({
      isImportModalOpen,
      setIsImportModalOpen,
      isExportModalOpen,
      setIsExportModalOpen,
      spriteInput,
      setSpriteInput,
      headId,
      setHeadId,
      bodyId,
      setBodyId,
      partialPixelReport,
      transparencyReport,
      colourReport,
      highlightedColourState,
      dispatchHighlightedColourState,
      partialPixelOutputMode,
      setPartialPixelOutputMode,
      semiTransparentOutputMode,
      setSemiTransparentOutputMode,
      colouredTransparencyOutputMode,
      setColouredTransparencyOutputMode,
      highlightMode,
      setHighlightMode,
      highlightColour,
      setHighlightColour,
    }),
    [
      isImportModalOpen,
      setIsImportModalOpen,
      isExportModalOpen,
      setIsExportModalOpen,
      spriteInput,
      setSpriteInput,
      headId,
      setHeadId,
      bodyId,
      setBodyId,
      partialPixelReport,
      transparencyReport,
      colourReport,
      highlightedColourState,
      dispatchHighlightedColourState,
      partialPixelOutputMode,
      setPartialPixelOutputMode,
      semiTransparentOutputMode,
      setSemiTransparentOutputMode,
      colouredTransparencyOutputMode,
      setColouredTransparencyOutputMode,
      highlightMode,
      setHighlightMode,
      highlightColour,
      setHighlightColour,
    ],
  );

  return (
    <AnalysisContext.Provider value={value}>
      {children}
    </AnalysisContext.Provider>
  );
}
