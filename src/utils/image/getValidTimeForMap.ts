import {battleAssetManifest, BattlerTime} from "../../data/battleAssetManifest.ts";

export function getValidTimeForMap(battlerMap: string, battlerTime: BattlerTime): BattlerTime {
  const {day, eve, night} = battleAssetManifest[battlerMap];
  // Try requested time
  switch (battlerTime) {
    case 'day':
      if (day) {
        return battlerTime;
      }
      break;
    case 'eve':
      if (eve) {
        return battlerTime;
      }
      break;
    case 'night':
      if (night) {
        return battlerTime;
      }
  }
  // Fall back to first valid time
  if (day) {
    return 'day';
  } else if (eve) {
    return 'eve';
  }
  return 'night';
}
