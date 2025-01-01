import {QuestionMarkSharp} from "@mui/icons-material";

// const assetBaseUrl = 'https://fiddlekins.github.io/aio-pif-sprite-analyser-assets';
const assetBaseUrl = 'https://cdn.jsdelivr.net/gh/Fiddlekins/aio-pif-sprite-analyser-assets@master';

function getUnfusedSrc(pokemonId: number) {
  return `${assetBaseUrl}/assets/basePokemon/${pokemonId}.png`;
}

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
          backgroundImage: `url(${assetBaseUrl}/assets/spritesheets_autogen/${headPokemonId}.png)`,
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
