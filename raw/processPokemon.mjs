import fs from 'node:fs/promises'
import path from 'node:path'
import {dirname} from 'path';
import {fileURLToPath} from 'url';

// Raw data taken from https://raw.githubusercontent.com/greystorm101/spritebot/main/src/smeargle-data/pokemon.txt
// (https://github.com/greystorm101/spritebot/blob/main/src/smeargle-data/pokemon.txt)

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..')
const pokemonRawPath = path.join(projectRoot, 'raw', 'pokemon.txt')
const pokemonDataPath = path.join(projectRoot, 'src', 'data', 'pokemonIdToDataMap.ts')

const keptStringKeys = [
  'Name',
];
const keptNumericalKeys = [
  'BattlerPlayerX',
  'BattlerPlayerY',
  'BattlerEnemyX',
  'BattlerEnemyY',
  'BattlerShadowX',
  'BattlerShadowSize',
  'BattlerAltitude',
];

function processPokemonText(pokemonText) {
  const pokemonJson = {};
  const lines = pokemonText.split(/\r\n|\n\r|\n/);
  let currentPokemonId = null;
  for (const line of lines) {
    const pokemonIdMatch = line.match(/\[(\d+)]/);
    if (pokemonIdMatch) {
      const [, pokemonIdString] = pokemonIdMatch
      currentPokemonId = parseInt(pokemonIdString, 10);
      continue;
    }
    const settingMatch = line.match(/([^=]+)=(.*)/);
    if (settingMatch) {
      const [, rawKeyString, rawValueString] = settingMatch;
      const key = rawKeyString.trim();
      if (keptStringKeys.includes(key)) {
        const value = rawValueString.trim();
        let pokemon = pokemonJson[currentPokemonId];
        if (!pokemon) {
          pokemon = {};
          pokemonJson[currentPokemonId] = pokemon;
        }
        pokemon[key] = value;
        continue;
      }
      if (keptNumericalKeys.includes(key)) {
        const value = parseInt(rawValueString.trim(), 10);
        let pokemon = pokemonJson[currentPokemonId];
        if (!pokemon) {
          pokemon = {};
          pokemonJson[currentPokemonId] = pokemon;
        }
        pokemon[key] = value;
        continue;
      }
    }
  }
  return pokemonJson;
}

function getDataFile(data) {
  return `export interface PokemonData {
    Name: string;
    BattlerPlayerX: number;
    BattlerPlayerY: number;
    BattlerEnemyX: number;
    BattlerEnemyY: number;
    BattlerShadowX: number;
    BattlerShadowSize: number;
    BattlerAltitude?: number;
}
export const pokemonIdToDataMap: Record<string,PokemonData> = ${JSON.stringify(data, null, 2)}
`;
}

async function main() {
  const pokemonText = await fs.readFile(pokemonRawPath, 'utf8');
  const pokemonJson = processPokemonText(pokemonText);
  await fs.writeFile(pokemonDataPath, getDataFile(pokemonJson), 'utf8');
}

main().catch(console.error);
