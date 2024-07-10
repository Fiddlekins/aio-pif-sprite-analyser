import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState
} from 'react';
import {RgbaColor} from "react-colorful";
import {BattlerTime, defaultBattlerMap} from "../data/battleAssetManifest.ts";
import {pokemonIdToDataMap} from "../data/pokemonIdToDataMap.ts";
import {getColourKeyFromPixel} from "../utils/image/conversion/getColourKeyFromPixel.ts";
import {getPixelFromColourKey} from "../utils/image/conversion/getPixelFromColourKey.ts";
import {getPixelFromRgbaColor} from "../utils/image/conversion/getPixelFromRgbaColor.ts";
import {getRgbaColorFromPixel} from "../utils/image/conversion/getRgbaColorFromPixel.ts";
import {generateBackgroundFillImageData} from "../utils/image/generateBackgroundFillImageData.ts";
import {generateBattlerImageData} from "../utils/image/generateBattlerImageData.ts";
import {BackgroundSolidFill, BattlerConfig} from "../utils/image/types.ts";
import {retrieveString} from "../utils/localStorage/retrieveString.ts";
import {retrieveTyped} from "../utils/localStorage/retrieveTyped.ts";
import {storeString} from "../utils/localStorage/storeString.ts";
import {AnalysisContext} from "./AnalysisContext.tsx";
import {SettingsContext} from "./SettingsContext.tsx";

export const battlerBackgroundId = 'battler';

const defaultBackgroundSolidFills: BackgroundSolidFill[] = [
  {id: 'white', fill: {r: 255, g: 255, b: 255, a: 1}},
  {id: 'lightgrey', fill: {r: 196, g: 196, b: 196, a: 1}},
  {id: 'discord', fill: {r: 49, g: 51, b: 56, a: 1}},
  {id: 'black', fill: {r: 0, g: 0, b: 0, a: 1}},
  {id: 'magenta', fill: {r: 255, g: 0, b: 255, a: 1}},
];

const defaultBattlerConfig: BattlerConfig = {
  playerX: 0,
  playerY: 0,
  enemyX: 0,
  enemyY: 0,
  shadowX: 0,
  shadowSize: 3,
  altitude: 0,
};

const initialCustomBackgroundFills = retrieveTyped<RgbaColor[]>('BackgroundContext.customBackgroundFills', (value) => {
  const customBackgroundFillsNew: RgbaColor[] = [];
  const match = value?.match(/\d+/g);
  if (match) {
    match.forEach((colourKeyString) => {
      const colourKey = parseInt(colourKeyString);
      if (!Number.isNaN(colourKey)) {
        customBackgroundFillsNew.push(getRgbaColorFromPixel(getPixelFromColourKey(colourKey)));
      }
    })
  }
  return customBackgroundFillsNew;
});

interface CustomBackgroundFillsOperation {
  operation: 'add' | 'remove' | 'update';
  backgroundId?: string;
  colour?: RgbaColor;
}

function customBackgroundFillsReducer(
  state: RgbaColor[],
  action: CustomBackgroundFillsOperation,
) {
  let stateNew: RgbaColor[] = state;
  switch (action.operation) {
    case "add": {
      if (action.colour) {
        stateNew = [...state, action.colour];
      }
      break;
    }
    case "remove": {
      if (action.backgroundId) {
        const [, indexString] = action.backgroundId.split('_');
        const index = parseInt(indexString, 10);
        stateNew = state.filter((_, backgroundIndex) => {
          return backgroundIndex !== index;
        });
      }
      break;
    }
    case "update": {
      if (action.backgroundId && typeof action.colour) {
        const [, indexString] = action.backgroundId.split('_');
        const index = parseInt(indexString, 10);
        stateNew = state.map((colour, backgroundIndex) => {
          return backgroundIndex === index ? action.colour ?? colour : colour;
        });
      }
      break;
    }
    default:
      throw new Error(`Invalid operation`);
  }
  storeString('BackgroundContext.customBackgroundFills', stateNew.map(colour => {
    return getColourKeyFromPixel(getPixelFromRgbaColor(colour));
  }).join(','));
  return stateNew;
}

function loadBattlerConfig() {
  return retrieveTyped<BattlerConfig>('BackgroundContext.overrideConfig', (value) => {
    const output = {...defaultBattlerConfig};
    if (value) {
      try {
        const parsedConfig = JSON.parse(value) as Partial<BattlerConfig>;
        if (typeof parsedConfig.playerX === 'number') {
          output.playerX = parsedConfig.playerX;
        }
        if (typeof parsedConfig.playerY === 'number') {
          output.playerY = parsedConfig.playerY;
        }
        if (typeof parsedConfig.enemyX === 'number') {
          output.enemyX = parsedConfig.enemyX;
        }
        if (typeof parsedConfig.enemyY === 'number') {
          output.enemyY = parsedConfig.enemyY;
        }
        if (typeof parsedConfig.shadowX === 'number') {
          output.shadowX = parsedConfig.shadowX;
        }
        if (typeof parsedConfig.shadowSize === 'number') {
          output.shadowSize = parsedConfig.shadowSize;
        }
      } catch (err) {
        // corrupted value
      }
    }
    return output;
  });
}

export interface BackgroundContextInterface {
  isBackgroundModalOpen: boolean;
  setIsBackgroundModalOpen: (isBackgroundModalOpenNew: boolean) => void;
  backgroundImageData: ImageData | null;
  battlerSceneBackgroundImageData: ImageData | null;
  battlerSceneImageData: ImageData | null;
  backgroundSolidFills: BackgroundSolidFill[];
  backgroundId: string;
  setBackgroundId: (backgroundIdNew: string) => void;
  overrideBody: boolean;
  setOverrideBody: (overrideBodyNew: boolean) => void;
  overrideConfig: BattlerConfig;
  setOverrideConfig: (key: string, value?: number) => void;
  battlerMap: string;
  setBattlerMap: (battlerMapNew: string) => void;
  battlerTime: BattlerTime;
  setBattlerTime: (battlerTimeNew: BattlerTime) => void;
  dispatchCustomBackgroundFills: Dispatch<CustomBackgroundFillsOperation>;
}

const defaultHandler = () => {
  throw new Error('BackgroundContext is still initializing');
};

export const BackgroundContext = createContext<BackgroundContextInterface>({
  isBackgroundModalOpen: true,
  setIsBackgroundModalOpen: defaultHandler,
  backgroundImageData: null,
  battlerSceneBackgroundImageData: null,
  battlerSceneImageData: null,
  backgroundSolidFills: defaultBackgroundSolidFills,
  backgroundId: 'discord',
  setBackgroundId: defaultHandler,
  overrideBody: true,
  setOverrideBody: defaultHandler,
  overrideConfig: defaultBattlerConfig,
  setOverrideConfig: defaultHandler,
  battlerMap: defaultBattlerMap,
  setBattlerMap: defaultHandler,
  battlerTime: 'day',
  setBattlerTime: defaultHandler,
  dispatchCustomBackgroundFills: defaultHandler,
});

export interface BackgroundProviderProps {
  /**
   * The provider's child nodes
   */
  children?: ReactNode;
}

export function BackgroundProvider(
  {
    children,
  }: BackgroundProviderProps
) {
  const {canvasAccelerationEnabled} = useContext(SettingsContext);
  const {bodyId, spriteInput} = useContext(AnalysisContext);
  const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState<boolean>(false);
  const [backgroundId, setBackgroundIdInternal] = useState<string>(
    retrieveString('BackgroundContext.backgroundId', 'discord')
  );
  const [overrideBody, setOverrideBodyInternal] = useState<boolean>(
    false,
    // retrieveBoolean('BackgroundContext.overrideBody', false)
  );
  const [overrideConfig, setOverrideConfigInternal] = useState<BattlerConfig>(loadBattlerConfig());
  const [battlerMap, setBattlerMapInternal] = useState<string>(
    retrieveString('BackgroundContext.battlerMap', defaultBattlerMap)
  );
  const [battlerTime, setBattlerTimeInternal] = useState<BattlerTime>(
    retrieveTyped<BattlerTime>('BackgroundContext.battlerTime', (value) => {
      switch (value) {
        case 'eve':
          return 'eve';
        case 'night':
          return 'night';
        default:
          return 'day';
      }
    })
  );
  const [battlerSceneBackgroundImageData, setbattlerSceneBackgroundImageData] = useState<ImageData | null>(null);
  const [battlerSceneImageData, setbattlerSceneImageData] = useState<ImageData | null>(null);
  const [customBackgroundFills, dispatchCustomBackgroundFills] = useReducer(customBackgroundFillsReducer, initialCustomBackgroundFills);

  const backgroundSolidFills = useMemo(() => {
    return [
      ...defaultBackgroundSolidFills,
      ...customBackgroundFills.map((colour, index) => {
        return {
          id: `custom_${index}`,
          fill: colour,
          custom: true,
        };
      }),
    ];
  }, [customBackgroundFills]);

  useEffect(() => {
    let config: BattlerConfig;
    if (overrideBody) {
      config = overrideConfig;
    } else {
      if (bodyId !== null && pokemonIdToDataMap[bodyId]) {
        const {
          BattlerPlayerX,
          BattlerPlayerY,
          BattlerEnemyX,
          BattlerEnemyY,
          BattlerShadowX,
          BattlerShadowSize,
          BattlerAltitude,
        } = pokemonIdToDataMap[bodyId];
        config = {
          playerX: BattlerPlayerX,
          playerY: BattlerPlayerY,
          enemyX: BattlerEnemyX,
          enemyY: BattlerEnemyY,
          shadowX: BattlerShadowX,
          shadowSize: BattlerShadowSize,
          altitude: BattlerAltitude || 0,
        }
      } else {
        config = defaultBattlerConfig;
      }
    }

    generateBattlerImageData(config, battlerMap, battlerTime, spriteInput?.imageData || null, canvasAccelerationEnabled)
      .then((battlerImageData) => {
        setbattlerSceneBackgroundImageData(battlerImageData.backgroundImageData);
        setbattlerSceneImageData(battlerImageData.battlerSceneImageData);
      })
      .catch(console.error);
  }, [
    setbattlerSceneImageData,
    overrideBody,
    overrideConfig,
    bodyId,
    battlerMap,
    battlerTime,
    spriteInput?.imageData,
    canvasAccelerationEnabled,
  ]);

  const fillBackgroundImageData = useMemo(() => {
    if (backgroundId === battlerBackgroundId) {
      return null;
    } else {
      const fill = backgroundSolidFills.find((fill) => {
        return fill.id === backgroundId;
      })
      if (!fill) {
        return null;
      }
      return generateBackgroundFillImageData(getPixelFromRgbaColor(fill.fill));
    }
  }, [backgroundSolidFills, backgroundId]);

  const backgroundImageData = useMemo(() => {
    let backgroundImageDataNew: ImageData | null;
    if (backgroundId === battlerBackgroundId) {
      backgroundImageDataNew = battlerSceneBackgroundImageData;
    } else {
      backgroundImageDataNew = fillBackgroundImageData;
    }
    return backgroundImageDataNew;
  }, [backgroundId, battlerSceneBackgroundImageData, fillBackgroundImageData]);

  const setBackgroundId = useCallback((backgroundIdNew: string) => {
    storeString('BackgroundContext.backgroundId', backgroundIdNew);
    setBackgroundIdInternal(backgroundIdNew);
  }, [setBackgroundIdInternal]);

  const setOverrideBody = useCallback((overrideBodyNew: boolean) => {
    // storeBoolean('BackgroundContext.overrideBody', overrideBodyNew);
    setOverrideBodyInternal(overrideBodyNew);
  }, [setOverrideBodyInternal]);

  const setOverrideConfig = useCallback((key: string, value?: number) => {
    setOverrideConfigInternal((overrideConfigOld) => {
      let overrideConfigNew: BattlerConfig = {...overrideConfigOld};
      if (typeof value === 'number') {
        switch (key) {
          case 'playerX':
            overrideConfigNew.playerX = value;
            break;
          case 'playerY':
            overrideConfigNew.playerY = value;
            break;
          case 'enemyX':
            overrideConfigNew.enemyX = value;
            break;
          case 'enemyY':
            overrideConfigNew.enemyY = value;
            break;
          case 'shadowX':
            overrideConfigNew.shadowX = value;
            break;
          case 'shadowSize':
            overrideConfigNew.shadowSize = value;
            break;
          case 'altitude':
            overrideConfigNew.altitude = value;
            break;
        }
      }
      if (key === 'reset') {
        overrideConfigNew = defaultBattlerConfig;
      }
      storeString('BackgroundContext.overrideConfig', JSON.stringify(overrideConfigNew));
      return overrideConfigNew;
    });
  }, [setOverrideConfigInternal]);

  const setBattlerMap = useCallback((battlerMapNew: string) => {
    storeString('BackgroundContext.battlerMap', battlerMapNew);
    setBattlerMapInternal(battlerMapNew);
  }, [setBattlerMapInternal]);

  const setBattlerTime = useCallback((battlerTimeNew: BattlerTime) => {
    storeString('BackgroundContext.battlerTime', battlerTimeNew);
    setBattlerTimeInternal(battlerTimeNew);
  }, [setBattlerTimeInternal]);


  const value = useMemo(
    () => ({
      isBackgroundModalOpen,
      setIsBackgroundModalOpen,
      backgroundImageData,
      battlerSceneBackgroundImageData,
      battlerSceneImageData,
      backgroundSolidFills,
      backgroundId,
      setBackgroundId,
      overrideBody,
      setOverrideBody,
      overrideConfig,
      setOverrideConfig,
      battlerMap,
      setBattlerMap,
      battlerTime,
      setBattlerTime,
      dispatchCustomBackgroundFills,
    }),
    [
      isBackgroundModalOpen,
      setIsBackgroundModalOpen,
      backgroundImageData,
      battlerSceneBackgroundImageData,
      battlerSceneImageData,
      backgroundSolidFills,
      backgroundId,
      setBackgroundId,
      overrideBody,
      setOverrideBody,
      overrideConfig,
      setOverrideConfig,
      battlerMap,
      setBattlerMap,
      battlerTime,
      setBattlerTime,
      dispatchCustomBackgroundFills,
    ],
  );

  return (
    <BackgroundContext.Provider value={value}>
      {children}
    </BackgroundContext.Provider>
  );
}
