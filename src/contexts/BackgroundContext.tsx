import {createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {BattlerTime, defaultBattlerMap} from "../data/battleAssetManifest.ts";
import {pokemonIdToDataMap} from "../data/pokemonIdToDataMap.ts";
import {generateBackgroundFillImageData} from "../utils/image/generateBackgroundFillImageData.ts";
import {generateBattlerImageData} from "../utils/image/generateBattlerImageData.ts";
import {BackgroundSolidFill, BattlerConfig} from "../utils/image/types.ts";
import {retrieveString} from "../utils/localStorage/retrieveString.ts";
import {retrieveTyped} from "../utils/localStorage/retrieveTyped.ts";
import {storeString} from "../utils/localStorage/storeString.ts";
import {AnalysisContext} from "./AnalysisContext.tsx";

export const battlerBackgroundId = 'battler';

const backgroundSolidFills: BackgroundSolidFill[] = [
  {id: 'white', fill: [255, 255, 255, 255]},
  {id: 'lightgrey', fill: [196, 196, 196, 255]},
  {id: 'discord', fill: [49, 51, 56, 255]},
  {id: 'black', fill: [0, 0, 0, 255]},
  {id: 'magenta', fill: [255, 0, 255, 255]},
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
  backgroundSolidFills: backgroundSolidFills,
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

    generateBattlerImageData(config, battlerMap, battlerTime, spriteInput?.imageData || null)
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
  ]);

  const fillBackgroundImageData = useMemo(() => {
    if (backgroundId === battlerBackgroundId) {
      return null;
    } else {
      const fill = backgroundSolidFills.find((fill) => {
        return fill.id === backgroundId
      })
      if (!fill) {
        return null;
      }
      return generateBackgroundFillImageData(fill.fill);
    }
  }, [backgroundId]);

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
    ],
  );

  return (
    <BackgroundContext.Provider value={value}>
      {children}
    </BackgroundContext.Provider>
  );
}
