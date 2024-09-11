import {DoneSharp} from "@mui/icons-material";
import {Autocomplete, Box, BoxProps, Button, styled, TextField} from "@mui/material";
import {SyntheticEvent, useCallback, useContext} from "react";
import {SettingsContext} from "../../contexts/SettingsContext.tsx";
import {pokemonIdToDataMap} from "../../data/pokemonIdToDataMap.ts";
import {PokemonImage} from "../PokemonImage.tsx";
import {StyledModal} from "./StyledModal.tsx";

const pokemonNameToIdMap: Record<string, number> = {};
const pokemonIdToNameMap: Record<string, string> = {};
const basePokemonList = Object.keys(pokemonIdToDataMap)
  .map(idString => {
    const id = parseInt(idString, 10);
    const {displayName, Name} = pokemonIdToDataMap[idString];
    const name = displayName || Name;
    pokemonNameToIdMap[name] = id;
    pokemonIdToNameMap[id] = name;
    return {
      name,
      id,
    }
  })
  .filter(({id, name}) => {
    return id < 9999 && !/MysteryMon/.test(name) && !/Unknown\d+/.test(name);
  })
  .sort((a, b) => {
    return a.id - b.id;
  })
  .map(({name}) => {
    return name;
  });
basePokemonList.unshift('None');

const ImageBox = styled(Box)<BoxProps>(({theme}) => ({
  width: '56px',
  height: '56px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  outlineWidth: '1px',
  outlineStyle: 'solid',
  outlineColor: theme.palette.action.disabled,
}));

export interface PokemonSelectModalProps {
  open: boolean;
  pokemonId: number | null;
  setPokemonId: (pokemonIdNew: number | null) => void;
  handleClose: () => void;
  title?: string;
}

export function PokemonSelectModal(
  {
    open,
    pokemonId,
    setPokemonId,
    handleClose,
    title,
  }: PokemonSelectModalProps
) {
  const {isMobile} = useContext(SettingsContext);

  const onChange = useCallback((_event: SyntheticEvent, newValue: string | null) => {
    if (newValue) {
      setPokemonId(pokemonNameToIdMap[newValue] || null)
    } else {
      setPokemonId(null);
    }
  }, [setPokemonId]);

  return (
    <StyledModal
      title={title || 'Select Pokemon'}
      open={open}
      handleClose={handleClose}
    >
      {isMobile ? (
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={2}
        >
          <Autocomplete
            value={pokemonId ? pokemonIdToDataMap[pokemonId].Name : 'None'}
            onChange={onChange}
            renderInput={(params) => <TextField {...params} label="Pokemon"/>}
            options={basePokemonList}
            sx={{flexGrow: 2}}
          />
          <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            gap={2}
          >
            <ImageBox>
              <PokemonImage
                isFusion={false}
                pokemonId={pokemonId}
              />
            </ImageBox>
            <Button
              variant={'outlined'}
              onClick={handleClose}
              sx={{minWidth: '56px'}}
            >
              <DoneSharp/>
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          display={'flex'}
          flexDirection={'row'}
          gap={2}
        >
          <ImageBox>
            <PokemonImage
              isFusion={false}
              pokemonId={pokemonId}
            />
          </ImageBox>
          <Autocomplete
            value={pokemonId ? pokemonIdToNameMap[pokemonId] : 'None'}
            onChange={onChange}
            renderInput={(params) => <TextField {...params} label="Pokemon"/>}
            options={basePokemonList}
            sx={{flexGrow: 2}}
          />
          <Button
            variant={'outlined'}
            onClick={handleClose}
            sx={{minWidth: '56px'}}
          >
            <DoneSharp/>
          </Button>
        </Box>
      )}
    </StyledModal>
  )
}
