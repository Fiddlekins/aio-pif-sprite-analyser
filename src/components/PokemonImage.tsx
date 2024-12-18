import {QuestionMarkSharp} from "@mui/icons-material";

function getUnfusedSrc(pokemonId: number) {
  // return `https://gitlab.com/infinitefusion2/autogen-fusion-sprites/-/raw/main/Battlers/${pokemonId}/${pokemonId}.png`;
  return `https://fiddlekins.github.io/aio-pif-sprite-analyser-assets/assets/basePokemon/${pokemonId}.png`;
}

// function getFusedSrc(headPokemonId: number, bodyPokemonId: number) {
//   return `https://gitlab.com/infinitefusion2/autogen-fusion-sprites/-/raw/main/Battlers/${headPokemonId}/${headPokemonId}.${bodyPokemonId}.png`;
// }

const imageStyle: { imageRendering: 'pixelated' } = {imageRendering: 'pixelated'};

export interface PokemonImageProps {
  isFusion: boolean;
  pokemonId?: number;
  headPokemonId?: number;
  bodyPokemonId?: number;
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
      <span>pending</span>
    );
    // return (
    //   <img
    //     width={'100%'}
    //     height={'100%'}
    //     src={getFusedSrc(headPokemonId, bodyPokemonId)}
    //   />
    // );
  } else if (!isFusion && pokemonId) {
    return (
      <img
        width={'100%'}
        height={'100%'}
        style={imageStyle}
        src={getUnfusedSrc(pokemonId)}
      />
    );
  } else {
    return (
      <QuestionMarkSharp/>
    );
  }
}
