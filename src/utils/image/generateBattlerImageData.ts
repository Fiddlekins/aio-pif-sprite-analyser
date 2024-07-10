import {TypedArray} from "image-in-browser";
import {battleAssetManifest, BattlerTime, defaultBattlerMap} from "../../data/battleAssetManifest.ts";
import {getDecodedPng} from "./getDecodedPng.ts";
import {getValidTimeForMap} from "./getValidTimeForMap.ts";
import {cloneImageData} from "./manipulation/cloneImageData.ts";
import {downscaleImageData} from "./manipulation/downscaleImageData.ts";
import {drawImageData} from "./manipulation/drawImageData.ts";
import {getCroppedImageData} from "./manipulation/getCroppedImageData.ts";
import {scaleImageData} from "./manipulation/scaleImageData.ts";
import {BattlerConfig,} from "./types.ts";

interface Coordinates {
  x: number;
  y: number;
}

interface Dimensions {
  width: number;
  height: number;
}

interface BattlerLayout {
  spriteDimensions: Dimensions;
  enemyBasePosition: Coordinates;
  playerBasePosition: Coordinates;
  enemyShadowPosition: Coordinates;
  healthBarEnemyPosition: Coordinates;
  healthBarPlayerPosition: Coordinates;
  enemySpritePosition: Coordinates;
  enemySpriteDimensions: Dimensions;
  playerSpritePosition: Coordinates;
  mapAssetName: string;
  shadowSize: number;
}

function getMapAssetName(battlerMap: string, battlerTime: BattlerTime) {
  switch (battlerTime) {
    case 'day':
      return battlerMap;
    case 'eve':
    case 'night':
      return `${battlerMap}_${battlerTime}`;
  }
}

const assetCache: Record<string, Promise<HTMLImageElement>> = {};

function getAsset(assetPath: string) {
  let assetPromise = assetCache[assetPath];
  if (!assetPromise) {
    assetPromise = new Promise((resolve, reject) => {
      const img = document.createElement('img');
      img.onload = () => {
        resolve(img);
      }
      img.onerror = (err) => {
        reject(err);
      }
      img.src = assetPath;
    });
    assetCache[assetPath] = assetPromise;
  }
  return assetPromise;
}

const assetImageDataCache: Record<string, Promise<ImageData>> = {};

function getAssetImageData(assetPath: string) {
  let assetPromise = assetImageDataCache[assetPath];
  if (!assetPromise) {
    assetPromise = (async () => {
      const blob = await (await fetch(assetPath, {mode: 'cors'})).blob();
      const data = await blob.arrayBuffer();
      const {imageData} = getDecodedPng(data as TypedArray);
      return imageData;
    })();
    assetImageDataCache[assetPath] = assetPromise;
  }
  return assetPromise;
}

const scaledImageDataCache = new Map<string, Map<ImageData, ImageData>>();

function getCachedScaledImageData(imageData: ImageData, xScale: number, yScale: number): ImageData {
  const scaleKey = `${xScale}:${yScale}`;
  let scaledImageDataMap = scaledImageDataCache.get(scaleKey);
  if (!scaledImageDataMap) {
    scaledImageDataMap = new Map<ImageData, ImageData>;
    scaledImageDataCache.set(scaleKey, scaledImageDataMap);
  }
  let scaledImageData = scaledImageDataMap.get(imageData);
  if (!scaledImageData) {
    scaledImageData = scaleImageData(imageData, xScale, yScale);
    scaledImageDataMap.set(imageData, scaledImageData);
  }
  return scaledImageData;
}

let lastSpriteImageData: ImageData | null = null;
let lastEnemyScaledSpriteImageData: ImageData | null = null;
let lastPlayerScaledSpriteImageData: ImageData | null = null;

const canvas = document.createElement('canvas');
canvas.width = 1536;
canvas.height = 864;
const ctx = canvas.getContext('2d');
const spriteCanvas = document.createElement('canvas');
spriteCanvas.width = 288;
spriteCanvas.height = 288;
const spriteCtx = spriteCanvas.getContext('2d');

async function generateBattlerImageDataWithCanvas(battlerLayout: BattlerLayout, spriteImageData: ImageData | null) {
  const {
    spriteDimensions,
    enemyBasePosition,
    playerBasePosition,
    enemyShadowPosition,
    healthBarEnemyPosition,
    healthBarPlayerPosition,
    enemySpritePosition,
    enemySpriteDimensions,
    playerSpritePosition,
    mapAssetName,
    shadowSize,
  } = battlerLayout;

  const [
    background,
    enemyBase,
    playerBase,
    shadow,
    databoxNormal,
    databoxNormalFoe,
  ] = await Promise.all([
    getAsset(`./battler-assets/maps/${mapAssetName}/background.png`),
    getAsset(`./battler-assets/maps/${mapAssetName}/enemy-base.png`),
    getAsset(`./battler-assets/maps/${mapAssetName}/player-base.png`),
    getAsset(`./battler-assets/shadows/${shadowSize}.png`),
    getAsset(`./battler-assets/overlay/databox_normal.png`),
    getAsset(`./battler-assets/overlay/databox_normal_foe.png`),
  ]);
  if (!ctx || !spriteCtx) {
    throw new Error('No context');
  }
  if (spriteImageData) {
    spriteCtx.putImageData(spriteImageData, 0, 0);
  }

  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = false;
  ctx.save();
  ctx.scale(3, 3);
  ctx.drawImage(enemyBase, enemyBasePosition.x, enemyBasePosition.y);
  ctx.drawImage(playerBase, playerBasePosition.x, playerBasePosition.y);
  ctx.drawImage(shadow, enemyShadowPosition.x, enemyShadowPosition.y);
  ctx.drawImage(databoxNormalFoe, healthBarEnemyPosition.x, healthBarEnemyPosition.y);
  ctx.drawImage(databoxNormal, healthBarPlayerPosition.x, healthBarPlayerPosition.y);
  ctx.restore();
  const backgroundImageData = downscaleImageData(ctx.getImageData(
    enemySpritePosition.x * 3,
    enemySpritePosition.y * 3,
    enemySpriteDimensions.width * 3,
    enemySpriteDimensions.height * 3,
  ), 2);
  if (spriteImageData) {
    ctx.save();
    ctx.scale(3, 3);
    ctx.drawImage(spriteCanvas, enemySpritePosition.x, enemySpritePosition.y, enemySpriteDimensions.width, enemySpriteDimensions.height);
    ctx.restore();
    ctx.save();
    ctx.scale(-3, 3);
    ctx.drawImage(spriteCanvas, -playerSpritePosition.x - spriteDimensions.width, playerSpritePosition.y);
    ctx.restore();
  }
  const battlerSceneImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  return {
    backgroundImageData,
    battlerSceneImageData,
  };
}

async function generateBattlerImageDataWithoutCanvas(battlerLayout: BattlerLayout, spriteImageData: ImageData | null) {
  const {
    enemyBasePosition,
    playerBasePosition,
    enemyShadowPosition,
    healthBarEnemyPosition,
    healthBarPlayerPosition,
    enemySpritePosition,
    enemySpriteDimensions,
    playerSpritePosition,
    mapAssetName,
    shadowSize,
  } = battlerLayout;
  const [
    background,
    enemyBase,
    playerBase,
    shadow,
    databoxNormal,
    databoxNormalFoe,
  ] = await Promise.all([
    getAssetImageData(`./battler-assets/maps/${mapAssetName}/background.png`),
    getAssetImageData(`./battler-assets/maps/${mapAssetName}/enemy-base.png`),
    getAssetImageData(`./battler-assets/maps/${mapAssetName}/player-base.png`),
    getAssetImageData(`./battler-assets/shadows/${shadowSize}.png`),
    getAssetImageData(`./battler-assets/overlay/databox_normal.png`),
    getAssetImageData(`./battler-assets/overlay/databox_normal_foe.png`),
  ]);

  const battlerSceneImageData = cloneImageData(getCachedScaledImageData(background, 3, 3));
  drawImageData(battlerSceneImageData, getCachedScaledImageData(enemyBase, 3, 3), enemyBasePosition.x * 3, enemyBasePosition.y * 3);
  drawImageData(battlerSceneImageData, getCachedScaledImageData(playerBase, 3, 3), playerBasePosition.x * 3, playerBasePosition.y * 3);
  drawImageData(battlerSceneImageData, getCachedScaledImageData(shadow, 3, 3), enemyShadowPosition.x * 3, enemyShadowPosition.y * 3);
  drawImageData(battlerSceneImageData, getCachedScaledImageData(databoxNormalFoe, 3, 3), healthBarEnemyPosition.x * 3, healthBarEnemyPosition.y * 3);
  drawImageData(battlerSceneImageData, getCachedScaledImageData(databoxNormal, 3, 3), healthBarPlayerPosition.x * 3, healthBarPlayerPosition.y * 3);
  const backgroundImageData = downscaleImageData(getCroppedImageData(
    battlerSceneImageData,
    enemySpritePosition.x * 3,
    enemySpritePosition.y * 3,
    enemySpriteDimensions.width * 3,
    enemySpriteDimensions.height * 3,
  ), 2);
  if (spriteImageData) {
    if (spriteImageData !== lastSpriteImageData) {
      lastSpriteImageData = spriteImageData;
      lastEnemyScaledSpriteImageData = scaleImageData(spriteImageData, 2, 2);
      lastPlayerScaledSpriteImageData = scaleImageData(spriteImageData, -3, 3);
    }
    if (lastEnemyScaledSpriteImageData) {
      drawImageData(battlerSceneImageData, lastEnemyScaledSpriteImageData, enemySpritePosition.x * 3, enemySpritePosition.y * 3);
    }
    if (lastPlayerScaledSpriteImageData) {
      drawImageData(battlerSceneImageData, lastPlayerScaledSpriteImageData, playerSpritePosition.x * 3, playerSpritePosition.y * 3);
    }
  }
  return {
    backgroundImageData,
    battlerSceneImageData,
  };
}

export async function generateBattlerImageData(
  battlerConfig: BattlerConfig,
  battlerMap: string,
  battlerTime: BattlerTime,
  spriteImageData: ImageData | null,
  withCanvas?: boolean,
) {
  let map: string;
  let time: BattlerTime;
  const manifestEntry = battleAssetManifest[battlerMap];
  if (manifestEntry) {
    map = battlerMap;
    time = getValidTimeForMap(battlerMap, battlerTime);
  } else {
    map = defaultBattlerMap;
    time = getValidTimeForMap(defaultBattlerMap, battlerTime);
  }
  const mapAssetName = getMapAssetName(map, time);
  const [
    background,
    enemyBase,
    playerBase,
    shadow,
    databoxNormal,
  ] = await Promise.all([
    getAsset(`./battler-assets/maps/${mapAssetName}/background.png`),
    getAsset(`./battler-assets/maps/${mapAssetName}/enemy-base.png`),
    getAsset(`./battler-assets/maps/${mapAssetName}/player-base.png`),
    getAsset(`./battler-assets/shadows/${battlerConfig.shadowSize}.png`),
    getAsset(`./battler-assets/overlay/databox_normal.png`),
  ]);

  // Drawing code taken from https://github.com/greystorm101/spritebot/blob/main/src/cogs/smeargle.py
  const spriteDimensions = {width: 288, height: 288};
  const enemyBottomCentrePosition = {x: background.width - 128, y: Math.round((background.height * 3 / 4) - 112 + 8)};
  const enemyBasePosition = {
    x: Math.round(enemyBottomCentrePosition.x - (enemyBase.width / 2)),
    y: enemyBottomCentrePosition.y,
  };
  const playerBottomCentrePosition = {x: 128, y: background.height + 16};
  const playerBasePosition = {
    x: Math.round(playerBottomCentrePosition.x - (playerBase.width / 2)),
    y: playerBottomCentrePosition.y - playerBase.height,
  };
  const enemyShadowPosition = {
    x: Math.round(enemyBottomCentrePosition.x - (shadow.width / 2)) - battlerConfig.shadowX,
    y: Math.round(enemyBottomCentrePosition.y - (shadow.height / 2) + (128 / 2)),
  };
  const enemySpriteDimensions = {
    width: (spriteDimensions.width * 2) / 3,
    height: (spriteDimensions.height * 2) / 3
  };
  const enemySpritePosition = {
    x: Math.round(enemyBottomCentrePosition.x - (enemySpriteDimensions.width / 2)) + (battlerConfig.enemyX * 2) + 2,
    y: Math.round(enemyBottomCentrePosition.y - (enemySpriteDimensions.height / 2)) + (battlerConfig.enemyY * 2) - 12 - (battlerConfig.altitude * 2),
  };
  const playerSpritePosition = {
    x: Math.round(playerBottomCentrePosition.x - (spriteDimensions.width / 2)) + battlerConfig.playerX - 2,
    y: Math.round(playerBottomCentrePosition.y - spriteDimensions.height) + 20 + battlerConfig.playerY,
  };
  const healthBarEnemyPosition = {
    x: 8,
    y: 0,
  }
  const healthBarPlayerPosition = {
    x: Math.round(((background.width) - 244)),
    y: Math.round(((background.height) - (176))) + Math.round(databoxNormal.height),
  }
  const battlerLayout: BattlerLayout = {
    spriteDimensions,
    enemyBasePosition,
    playerBasePosition,
    enemyShadowPosition,
    healthBarEnemyPosition,
    healthBarPlayerPosition,
    enemySpritePosition,
    enemySpriteDimensions,
    playerSpritePosition,
    mapAssetName,
    shadowSize: battlerConfig.shadowSize,
  }

  if (withCanvas) {
    return generateBattlerImageDataWithCanvas(battlerLayout, spriteImageData);
  }
  return generateBattlerImageDataWithoutCanvas(battlerLayout, spriteImageData);
}
