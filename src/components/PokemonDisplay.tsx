import {Box, BoxProps, Link, styled, Typography} from "@mui/material";
import {useMemo} from "react";
import {pokemonIdToDataMap} from "../data/pokemonIdToDataMap.ts";
import {PokemonImage} from "./PokemonImage.tsx";

const UnselectableSpan = styled('span')(() => ({
  userSelect: 'none',
}));

const NonInteractiveImageBox = styled(Box)<BoxProps>(({theme}) => ({
  width: '96px',
  height: '96px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  outlineWidth: '1px',
  outlineStyle: 'solid',
  outlineColor: theme.palette.action.disabled,
}));

interface StyledBoxProps extends BoxProps {
  isDisabled?: boolean;
}

const StyledBox = styled(Box, {
  shouldForwardProp(propName: PropertyKey) {
    return propName !== 'isDisabled';
  }
})<StyledBoxProps>(({isDisabled}) => ({
  opacity: isDisabled ? 0.5 : 1,
  filter: isDisabled ? 'grayscale(1)' : 'none',
}));

const InteractiveImageBox = styled(NonInteractiveImageBox)<BoxProps>(({theme}) => ({
  cursor: 'pointer',
  '&:hover': {
    outlineColor: theme.palette.action.active,
  },
}));

function getUnfusedDexHref(pokemonId: number) {
  return `https://www.fusiondex.org/${pokemonId}`;
}

function getFusedDexHref(headPokemonId: number, bodyPokemonId: number) {
  return `https://www.fusiondex.org/${headPokemonId}.${bodyPokemonId}`;
}

export interface BasePokemonDisplayProps {
  label: string;
  isFusion: boolean;
  pokemonId?: number;
  headPokemonId?: number;
  bodyPokemonId?: number;
  isDisabled?: boolean;
  onClick?: () => void;
}

export function PokemonDisplay(
  {
    label,
    isFusion,
    pokemonId,
    headPokemonId,
    bodyPokemonId,
    isDisabled,
    onClick,
  }: BasePokemonDisplayProps
) {
  const image = useMemo(() => {
    return (
      <PokemonImage
        isFusion={isFusion}
        pokemonId={pokemonId}
        headPokemonId={headPokemonId}
        bodyPokemonId={bodyPokemonId}
      />
    );
  }, [
    isFusion,
    pokemonId,
    headPokemonId,
    bodyPokemonId,
  ]);
  let id: string | null = null;
  let name: string;
  let dexHref: string | null;
  if (isFusion && headPokemonId && bodyPokemonId) {
    id = `${headPokemonId}.${bodyPokemonId}`;
    name = 'Autogen';
    dexHref = getFusedDexHref(headPokemonId, bodyPokemonId);
  } else if (!isFusion && pokemonId) {
    id = `${pokemonId}`;
    name = pokemonIdToDataMap[pokemonId].displayName || pokemonIdToDataMap[pokemonId].Name;
    dexHref = getUnfusedDexHref(pokemonId);
  } else {
    name = '';
    dexHref = null;
  }

  return (
    <StyledBox
      display={'flex'}
      flexDirection={'column'}
      alignItems={'stretch'}
      isDisabled={isDisabled}
    >
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
      >
        <Typography>
          {label}
        </Typography>
        {!isDisabled && dexHref ? (
          <Link
            href={dexHref}
            target="_blank"
            rel="noreferrer"
          >
            #{id}
          </Link>
        ) : (
          <Typography>
            #{id}
          </Typography>
        )}
      </Box>
      {isDisabled || !onClick || isFusion ? (
        <NonInteractiveImageBox>
          {image}
        </NonInteractiveImageBox>
      ) : (
        <InteractiveImageBox
          onClick={onClick}
        >
          {image}
        </InteractiveImageBox>
      )}
      <Typography alignSelf={'start'}>
        {name ? name : <UnselectableSpan>&nbsp;</UnselectableSpan>}
      </Typography>
    </StyledBox>
  );
}
