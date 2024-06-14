import {QuestionMarkSharp} from "@mui/icons-material";

function getUnfusedSrc(pokemonId: number) {
  return `https://gitlab.com/pokemoninfinitefusion/autogen-fusion-sprites/-/raw/master/Battlers/${pokemonId}/${pokemonId}.png`;
}

function getFusedSrc(headPokemonId: number, bodyPokemonId: number) {
  return `https://gitlab.com/pokemoninfinitefusion/autogen-fusion-sprites/-/raw/master/Battlers/${headPokemonId}/${headPokemonId}.${bodyPokemonId}.png`;
}

export interface PokemonImageProps {
  isFusion: boolean;
  pokemonId?: number | null;
  headPokemonId?: number | null;
  bodyPokemonId?: number | null;
}

export function PokemonImage(
  {
    isFusion,
    pokemonId,
    headPokemonId,
    bodyPokemonId,
  }: PokemonImageProps
) {
  if (isFusion && headPokemonId && bodyPokemonId) {
    return (
      <img
        width={'100%'}
        height={'100%'}
        src={getFusedSrc(headPokemonId, bodyPokemonId)}
      />
    );
  } else if (!isFusion && pokemonId) {
    return (
      <img
        width={'100%'}
        height={'100%'}
        src={getUnfusedSrc(pokemonId)}
      />
    );
  } else {
    return (
      <QuestionMarkSharp/>
    );
  }
}
