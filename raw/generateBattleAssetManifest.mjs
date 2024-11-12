import fs from 'node:fs/promises'
import path from 'node:path'
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..')
const battleAssetPath = path.join(projectRoot, 'public', 'battler-assets', 'maps')
const manifestPath = path.join(projectRoot, 'src', 'data', 'battleAssetManifest.ts')


function getDataFile(data) {
  return `export interface ManifestEntry {
    day: boolean;
    eve: boolean;
    night: boolean;
}

export const battleAssetManifest: Record<string,ManifestEntry> = ${JSON.stringify(data, null, 2)};

export const battlerTimes: string[] = ['day', 'eve', 'night'];

export const battlerMaps = Object.keys(battleAssetManifest);

export const defaultBattlerMap = battlerMaps[Math.floor(Math.random() * battlerMaps.length)];
`;
}

async function main() {
  const manifest = {};
  const dirents = await fs.readdir(battleAssetPath, {withFileTypes: true});
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      const match = dirent.name.match(/([^_]+)(?:_(eve|night))?/);
      if (match) {
        const subDirents = await fs.readdir(path.join(battleAssetPath, dirent.name), {withFileTypes: true});
        const assetMissing = [
          'background.png',
          'enemy-base.png',
          'player-base.png',
        ].some((assetName) => {
          return !subDirents.some((subDirent) => {
            return subDirent.isFile() && subDirent.name === assetName;
          })
        })
        if (assetMissing) {
          throw new Error(`Cannot find all assets for ${dirent.name}`);
        }

        const [, map, time] = match;
        let config = manifest[map];
        if (!config) {
          config = {
            day: false,
            eve: false,
            night: false,
          }
          manifest[map] = config;
        }
        switch (time) {
          case 'eve':
            config.eve = true;
            break;
          case 'night':
            config.night = true;
            break;
          default:
            config.day = true;
        }
      }
    }
  }
  await fs.writeFile(manifestPath, getDataFile(manifest), 'utf8');
}

main().catch(console.error);
