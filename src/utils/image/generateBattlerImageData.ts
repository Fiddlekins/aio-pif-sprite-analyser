import {battleAssetManifest, BattlerTime, defaultBattlerMap} from "../../data/battleAssetManifest.ts";
import {downscaleImageData} from "./downscaleImageData.ts";
import {getValidTimeForMap} from "./getValidTimeForMap.ts";
import {BattlerConfig,} from "./types.ts";

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

const canvas = document.createElement('canvas');
canvas.width = 1536;
canvas.height = 864;
const ctx = canvas.getContext('2d');
const spriteCanvas = document.createElement('canvas');
spriteCanvas.width = 288;
spriteCanvas.height = 288;
const spriteCtx = spriteCanvas.getContext('2d');

export async function generateBattlerImageData(
  battlerConfig: BattlerConfig,
  battlerMap: string,
  battlerTime: BattlerTime,
  spriteImageData: ImageData | null,
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
    databoxNormalFoe,
  ] = await Promise.all([
    getAsset(`./battler-assets/maps/${mapAssetName}/background.png`),
    getAsset(`./battler-assets/maps/${mapAssetName}/enemy-base.png`),
    getAsset(`./battler-assets/maps/${mapAssetName}/player-base.png`),
    getAsset(`./battler-assets/shadows/${battlerConfig.shadowSize}.png`),
    getAsset(`./battler-assets/overlay/databox_normal.png`),
    getAsset(`./battler-assets/overlay/databox_normal_foe.png`),
  ]);
  if (!ctx || !spriteCtx) {
    throw new Error('No context');
  }
  if (spriteImageData) {
    spriteCtx.putImageData(spriteImageData, 0, 0);
  }

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
