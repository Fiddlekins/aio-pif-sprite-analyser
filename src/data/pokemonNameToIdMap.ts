import {pokemonIdToDataMap} from "./pokemonIdToDataMap.ts";

const map: Record<string, number> = {};
for (const pokemonIdKey of Object.keys(pokemonIdToDataMap)) {
  const pokemonId = parseInt(pokemonIdKey, 10);
  const name = pokemonIdToDataMap[pokemonIdKey].Name;
  map[name] = pokemonId;
}

export const pokemonNameToIdMap = map;
