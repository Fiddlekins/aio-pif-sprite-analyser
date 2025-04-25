import {QuestionMarkSharp} from "@mui/icons-material";

// const assetBaseUrl = 'https://fiddlekins.github.io/aio-pif-sprite-analyser-assets';
const assetBaseUrl = 'https://cdn.jsdelivr.net/gh/Fiddlekins/aio-pif-sprite-analyser-assets@master';

// Manually update to be in sync with the actual autogen spritesheets rather than the latest DEX data
const spriteSheetTotalSpriteCount = 501;
const spriteSheetSpritesPerRow = 10;
const spriteSheetSpritesPerColumn = Math.ceil(spriteSheetTotalSpriteCount / spriteSheetSpritesPerRow);
const spriteSheetSpriteDimensions = 96;

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
    // Kinda scuffed but this beats regenerating all autogen spritesheets with missing pokemon placeholders
    if (headPokemonId > spriteSheetTotalSpriteCount) {
      return (
        <img
          width={'100%'}
          height={'100%'}
          style={imageStyle}
          src={`${assetBaseUrl}/assets/spritesheets_autogen/${headPokemonId}.png`}
        />
      );
    }
    if (bodyPokemonId > spriteSheetTotalSpriteCount) {
      return (
        <img
          width={'100%'}
          height={'100%'}
          style={imageStyle}
          src={`${assetBaseUrl}/assets/spritesheets_autogen/${bodyPokemonId}.png`}
        />
      );
    }

    const backgroundOffsetLeft = (bodyPokemonId % spriteSheetSpritesPerRow) * spriteSheetSpriteDimensions;
    const backgroundOffsetTop = Math.floor(bodyPokemonId / spriteSheetSpritesPerRow) * spriteSheetSpriteDimensions;
    const backgroundWidth = spriteSheetSpritesPerRow * spriteSheetSpriteDimensions;
    const backgroundHeight = spriteSheetSpritesPerColumn * spriteSheetSpriteDimensions;
    return (
      <div
        style={{
          height: '96px',
          width: '96px',
          backgroundImage: `url(${assetBaseUrl}/assets/spritesheets_autogen/${headPokemonId}.png)`,
          backgroundPosition: `-${backgroundOffsetLeft}px -${backgroundOffsetTop}px`,
          backgroundSize: `${backgroundWidth}px ${backgroundHeight}px`,
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
