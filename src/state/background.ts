import {beginBatch, endBatch, observable, ObservableHint, observe, OpaqueObject} from '@legendapp/state';
import {ObservablePersistLocalStorage} from "@legendapp/state/persist-plugins/local-storage"
import {synced} from "@legendapp/state/sync";
import {RgbaColor} from "react-colorful";
import {battlerMaps, battlerTimes, defaultBattlerMap} from "../data/battleAssetManifest.ts";
import {pokemonIdToDataMap} from "../data/pokemonIdToDataMap.ts";
import {getPixelFromRgbaColor} from "../utils/image/conversion/getPixelFromRgbaColor.ts";
import {generateBackgroundFillImageData} from "../utils/image/generateBackgroundFillImageData.ts";
import {generateBattlerImageData} from "../utils/image/generateBattlerImageData.ts";
import {BackgroundSolidFill, BattlerConfig} from "../utils/image/types.ts";
import {analysis$} from "./analysis.ts";
import {settings$} from "./settings.ts";
import {isValidNumber} from "./utils/validation/isValidNumber.ts";
import {isValidString} from "./utils/validation/isValidString.ts";
import {validate} from "./utils/validation/validate.ts";

export const battlerBackgroundId = 'battler';

export const defaultBackgroundSolidFills: BackgroundSolidFill[] = [
  {id: 'white', fill: {r: 255, g: 255, b: 255, a: 1}},
  {id: 'lightgrey', fill: {r: 196, g: 196, b: 196, a: 1}},
  {id: 'discord', fill: {r: 49, g: 51, b: 56, a: 1}},
  {id: 'black', fill: {r: 0, g: 0, b: 0, a: 1}},
  {id: 'magenta', fill: {r: 255, g: 0, b: 255, a: 1}},
];

const defaultBackgroundIds = defaultBackgroundSolidFills.map(({id}) => id).concat([battlerBackgroundId]);

const defaultBattlerConfig: BattlerConfig = {
  playerX: 0,
  playerY: 0,
  enemyX: 0,
  enemyY: 0,
  shadowX: 0,
  shadowSize: 3,
  altitude: 0,
};

export const backgroundSettings$ = observable(synced({
    initial: {
      backgroundId: 'discord',
      overrideConfig: {...defaultBattlerConfig},
      battlerMap: defaultBattlerMap,
      battlerTime: 'day',
      customBackgroundFills: [] as RgbaColor[],
    },
    persist: {
      name: 'apsa-background-settings',
      plugin: ObservablePersistLocalStorage,
      transform: {
        load: (value) => {
          validate(value, 'backgroundId', isValidString({oneOf: [...defaultBackgroundIds, /^custom_[0-9]+$/]}));
          validate(value.overrideConfig, 'playerX', isValidNumber());
          validate(value.overrideConfig, 'playerY', isValidNumber());
          validate(value.overrideConfig, 'enemyX', isValidNumber());
          validate(value.overrideConfig, 'enemyY', isValidNumber());
          validate(value.overrideConfig, 'shadowX', isValidNumber());
          validate(value.overrideConfig, 'shadowSize', isValidNumber({min: 0, max: 5}));
          validate(value.overrideConfig, 'altitude', isValidNumber());
          validate(value, 'battlerMap', isValidString({oneOf: battlerMaps}));
          validate(value, 'battlerTime', isValidString({oneOf: battlerTimes}));
          return value;
        }
      }
    }
  }
));

export const background$ = observable({
  isOverrideBody: false,
  backgroundImageData: null as OpaqueObject<ImageData> | null,
  battlerSceneBackgroundImageData: null as OpaqueObject<ImageData> | null,
  battlerSceneImageData: null as OpaqueObject<ImageData> | null,
  backgroundSolidFills: () => {
    return [
      ...defaultBackgroundSolidFills,
      ...backgroundSettings$.customBackgroundFills.get().map((colour, index) => {
        return {
          id: `custom_${index}`,
          fill: colour,
          custom: true,
        };
      }),
    ];
  },
  resetOverrideConfig: () => {
    backgroundSettings$.overrideConfig.assign(defaultBattlerConfig);
  },
});

observe(() => {
  let config: BattlerConfig;
  const isOverrideBody = background$.isOverrideBody.get()
  const overrideConfig = backgroundSettings$.overrideConfig.get();
  const bodyId = analysis$.bodyId.get();
  if (isOverrideBody) {
    config = overrideConfig;
  } else {
    if (bodyId && pokemonIdToDataMap[bodyId]) {
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

  generateBattlerImageData(
    config,
    backgroundSettings$.battlerMap.get(),
    backgroundSettings$.battlerTime.get(),
    analysis$.spriteInput.imageData.get() || null,
    settings$.isCanvasAccelerationEnabled.get(),
  )
    .then((battlerImageData) => {
      beginBatch();
      background$.battlerSceneBackgroundImageData.set(ObservableHint.opaque(battlerImageData.backgroundImageData));
      background$.battlerSceneImageData.set(ObservableHint.opaque(battlerImageData.battlerSceneImageData));
      endBatch();
    })
    .catch(console.error);
});

observe(() => {
  // TODO this is a hack since without this line it doesn't update when it should, figure out why
  backgroundSettings$.customBackgroundFills.get();

  const backgroundId = backgroundSettings$.backgroundId.get();
  const backgroundSolidFills = background$.backgroundSolidFills.get();
  const battlerSceneBackgroundImageData = background$.battlerSceneBackgroundImageData.get();
  if (backgroundId === battlerBackgroundId) {
    background$.backgroundImageData.set(battlerSceneBackgroundImageData);
  } else {
    const fill = backgroundSolidFills.find((fill) => {
      return fill.id === backgroundId;
    });
    if (fill) {
      const fillBackgroundImageData = generateBackgroundFillImageData(getPixelFromRgbaColor(fill.fill));
      background$.backgroundImageData.set(ObservableHint.opaque(fillBackgroundImageData));
    }
  }
});

// observe(() => {
//   const backgroundSolidFills = background$.backgroundSolidFills.get();
//   console.log('backgroundSolidFills', backgroundSolidFills)
// });
//
// observe(() => {
//   const customBackgroundFills = backgroundSettings$.customBackgroundFills.get();
//   console.log('customBackgroundFills', customBackgroundFills, customBackgroundFills[0])
// });
//
// observe(() => {
//   const customBackgroundFills = backgroundSettings$.customBackgroundFills[0].get();
//   console.log('customBackgroundFills0', customBackgroundFills)
// });
