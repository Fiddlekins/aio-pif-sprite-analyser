export interface ManifestEntry {
    day: boolean;
    eve: boolean;
    night: boolean;
}

export type BattlerTime = 'day' | 'eve' | 'night';

export const battleAssetManifest: Record<string,ManifestEntry> = {
  "beach": {
    "day": true,
    "eve": true,
    "night": true
  },
  "blaine": {
    "day": true,
    "eve": false,
    "night": false
  },
  "bridge": {
    "day": true,
    "eve": true,
    "night": true
  },
  "brock": {
    "day": true,
    "eve": false,
    "night": false
  },
  "cave": {
    "day": true,
    "eve": false,
    "night": false
  },
  "cave1": {
    "day": true,
    "eve": false,
    "night": false
  },
  "cavedark": {
    "day": true,
    "eve": false,
    "night": false
  },
  "caveice": {
    "day": true,
    "eve": false,
    "night": false
  },
  "champion": {
    "day": true,
    "eve": false,
    "night": false
  },
  "chuck": {
    "day": true,
    "eve": false,
    "night": false
  },
  "city": {
    "day": true,
    "eve": true,
    "night": true
  },
  "cosmic": {
    "day": true,
    "eve": false,
    "night": false
  },
  "cyber": {
    "day": true,
    "eve": false,
    "night": false
  },
  "darkgym": {
    "day": true,
    "eve": false,
    "night": false
  },
  "elitea": {
    "day": true,
    "eve": false,
    "night": false
  },
  "eliteb": {
    "day": true,
    "eve": false,
    "night": false
  },
  "elitec": {
    "day": true,
    "eve": false,
    "night": false
  },
  "elited": {
    "day": true,
    "eve": false,
    "night": false
  },
  "erika": {
    "day": true,
    "eve": false,
    "night": false
  },
  "field": {
    "day": true,
    "eve": true,
    "night": true
  },
  "flyinggym": {
    "day": true,
    "eve": false,
    "night": false
  },
  "forest": {
    "day": true,
    "eve": true,
    "night": true
  },
  "ghostgym": {
    "day": true,
    "eve": false,
    "night": false
  },
  "giovanni": {
    "day": true,
    "eve": false,
    "night": false
  },
  "icegym": {
    "day": true,
    "eve": false,
    "night": false
  },
  "indoora": {
    "day": true,
    "eve": false,
    "night": false
  },
  "indoorb": {
    "day": true,
    "eve": false,
    "night": false
  },
  "indoorc": {
    "day": true,
    "eve": false,
    "night": false
  },
  "jasmine": {
    "day": true,
    "eve": false,
    "night": false
  },
  "koga": {
    "day": true,
    "eve": false,
    "night": false
  },
  "lava": {
    "day": true,
    "eve": false,
    "night": false
  },
  "misty": {
    "day": true,
    "eve": false,
    "night": false
  },
  "mountain": {
    "day": true,
    "eve": true,
    "night": true
  },
  "normalgym": {
    "day": true,
    "eve": false,
    "night": false
  },
  "peak2": {
    "day": true,
    "eve": false,
    "night": false
  },
  "pokecenter": {
    "day": true,
    "eve": false,
    "night": false
  },
  "powerplant": {
    "day": true,
    "eve": false,
    "night": false
  },
  "sabrina": {
    "day": true,
    "eve": false,
    "night": false
  },
  "securedroom": {
    "day": true,
    "eve": false,
    "night": false
  },
  "snow": {
    "day": true,
    "eve": true,
    "night": true
  },
  "steelgym": {
    "day": true,
    "eve": false,
    "night": false
  },
  "surge": {
    "day": true,
    "eve": false,
    "night": false
  },
  "swamp": {
    "day": true,
    "eve": true,
    "night": true
  },
  "tower": {
    "day": true,
    "eve": false,
    "night": false
  },
  "underwater": {
    "day": true,
    "eve": false,
    "night": false
  },
  "volcano": {
    "day": true,
    "eve": false,
    "night": false
  },
  "water": {
    "day": true,
    "eve": true,
    "night": true
  }
};

export const battlerTimes: BattlerTime[] = ['day', 'eve', 'night'];

export const battlerMaps = Object.keys(battleAssetManifest);

export const defaultBattlerMap = battlerMaps[Math.floor(Math.random() * battlerMaps.length)];
