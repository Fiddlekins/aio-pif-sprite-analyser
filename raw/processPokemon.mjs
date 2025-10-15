import fs from 'node:fs/promises'
import path from 'node:path'
import {dirname} from 'path';
import {fileURLToPath} from 'url';

// Raw data taken from https://github.com/greystorm101/spritebot

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const pokemonRawPath = path.join(projectRoot, 'raw', 'pokemon.txt');
const namesToNumbersRawPath = path.join(projectRoot, 'raw', 'namesToNumbers.json');
const pokemonDataPath = path.join(projectRoot, 'src', 'data', 'pokemonIdToDataMap.ts');

async function download(src, dest) {
  const res = await fetch(src);
  const text = await res.text();
  await fs.writeFile(dest, text, 'utf8');
}

async function updateRawData() {
  await download('https://raw.githubusercontent.com/greystorm101/spritebot/main/src/smeargle-data/pokemon.txt', pokemonRawPath);
  // await download('https://raw.githubusercontent.com/greystorm101/spritebot/main/src/data/NamesToNumbers.json', namesToNumbersRawPath);
  // The following version is more up to date at this time of writing
  await download('https://raw.githubusercontent.com/Doodleboo/bot-fusion-analyzer/refs/heads/develop/data/PokemonNames.json', namesToNumbersRawPath);
}

const keptStringKeys = [
  'Name',
  'FormName',
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

function processPokemonText(pokemonText, namesToNumbersText) {
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
        if (value.length) {
          let pokemon = pokemonJson[currentPokemonId];
          if (!pokemon) {
            pokemon = {};
            pokemonJson[currentPokemonId] = pokemon;
          }
          pokemon[key] = value;
        }
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
  const namesToNumbersJson = JSON.parse(namesToNumbersText);
  for (const {id, display_name} of namesToNumbersJson.pokemon) {
    if (!pokemonJson[id]) {
      pokemonJson[id] = {
        isMissingPositionalData: true,
        BattlerPlayerX: 0,
        BattlerPlayerY: 0,
        BattlerEnemyX: 0,
        BattlerEnemyY: 0,
        BattlerShadowX: 0,
        BattlerShadowSize: 1,
      }
    }
    pokemonJson[id].displayName = display_name;
    if (!pokemonJson[id].Name) {
      pokemonJson[id].Name = display_name;
    }
  }
  return pokemonJson;
}

function getDataFile(data) {
  return `export interface PokemonData {
    displayName?: string;
    Name: string;
    FormName?: string;
    isMissingPositionalData?: boolean;
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
  await updateRawData();
  const pokemonText = await fs.readFile(pokemonRawPath, 'utf8');
  const namesToNumbersText = await fs.readFile(namesToNumbersRawPath, 'utf8');
  const pokemonJson = processPokemonText(pokemonText, namesToNumbersText);
  await fs.writeFile(pokemonDataPath, getDataFile(pokemonJson), 'utf8');
}

main().catch(console.error);
