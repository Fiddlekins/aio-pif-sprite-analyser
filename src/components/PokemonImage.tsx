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
      <div
        style={{
          height: '96px',
          width: '96px',
          backgroundImage: `url(https://fiddlekins.github.io/aio-pif-sprite-analyser-assets/assets/spritesheets_autogen/${headPokemonId}.png)`,
          backgroundPosition: `-${(bodyPokemonId % 10) * 96}px -${Math.floor(bodyPokemonId / 10) * 96}px`,
          backgroundSize: `${10 * 96}px ${51 * 96}px`,
        }}
      />
    );
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
