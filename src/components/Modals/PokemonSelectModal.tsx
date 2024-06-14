import {DoneSharp} from "@mui/icons-material";
import {Autocomplete, Box, BoxProps, Button, styled, TextField} from "@mui/material";
import {SyntheticEvent, useCallback} from "react";
import {pokemonIdToDataMap} from "../../data/pokemonIdToDataMap.ts";
import {pokemonNameToIdMap} from "../../data/pokemonNameToIdMap.ts";
import {PokemonImage} from "../PokemonImage.tsx";
import {StyledModal} from "./StyledModal.tsx";

const basePokemonList = Object.keys(pokemonNameToIdMap)
  .map(name => {
    const id = pokemonNameToIdMap[name]
    return {
      name,
      id,
    }
  })
  .filter(({id}) => {
    return id < 9999
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
          value={pokemonId ? pokemonIdToDataMap[pokemonId].Name : 'None'}
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
    </StyledModal>
  )
}
